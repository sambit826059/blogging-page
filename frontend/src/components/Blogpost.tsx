import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const Blogpost = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="bg-#020617 col-span-8 pt-10">
            <div className="text-4xl font-extrabold">{blog.title}</div>
            <div className="text-slate-600 pt-1">2nd Jan 2024</div>
            <div className="pt-2">{blog.content}</div>
          </div>
          <div className="p-10">
            <div className="flex items-start space-x-4 p-4 bg-white shadow-md rounded-lg w-96">
              <Avatar name={blog.author.name} />
              <div className="flex flex-col flex-grow">
                <span className="text-sm text-gray-500">Author</span>
                <div className="text-lg font-bold text-gray-900">
                  {blog.author.name || "Anonymous"}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Author details, bio, and other information about the author
                  can go here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
