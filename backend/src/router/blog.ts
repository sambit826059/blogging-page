import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from '@sambit123456/blog-common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string;
  }
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.split(' ')[1];
  if (!token) {
    c.status(403);
    return c.json({ message: "Token not found in the Authorization header" });
  }
  const user = await verify(token, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "You are not logged in. Please sign in again"
    })
  }

})


blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId")
  console.log(authorId);

  try {
    const { success } = createBlogInput.safeParse(body);
    console.log(success);
    console.log(body);

    if (!success) {
      c.status(411);
      return c.json({
        message: "wrong inputs"
      })
    }
  } catch (e) {
    console.log(e);

  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: parseInt(authorId),
      }
    })

    return c.json({
      id: blog.id,
    })
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ message: "Error creating blog post" });
  }

})

blogRouter.put('/blog', async (c) => {
  const body = await c.req.json();
  try {
    const { success } = updateBlogInput.safeParse(body);
    console.log(success);
    console.log(body);

    if (!success) {
      c.status(411);
      return c.json({
        message: "wrong inputs"
      })
    }
  } catch (e) {
    console.log(e);

  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })

  return c.json({
    id: blog.id,
  })

})

// add pagination
blogRouter.get('/bulk', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return c.json({
    blogs
  })


})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })

    return c.json({
      blog
    })
  } catch (e) {
    c.status(411);
    console.log(e);

    return c.json({
      message: "Error while fetching blog post"
    })
  }
})

