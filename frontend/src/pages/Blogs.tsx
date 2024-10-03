
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div className="flex flex-cols justify-center">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  }
  return <div>
    <Appbar />
    <div className="flex justify-center">
      <div className="flex justify-center flex-col max-w-xl">

        {blogs.map(blog => <BlogCard
          id={blog.id}
          authorName={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate={"Jul 2, 2024"}
        />)}
      </div>
    </div>
  </div>
}
