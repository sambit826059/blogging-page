import { Link } from "react-router-dom";


interface BlogCardProps {
  id: Number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps) => {
  return <Link to={`/blog/${id}`}>
    <div className="border-b border-gray-300 pb-3 pt-4 pl-3 p-5 cursor-pointer">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <Avatar name={authorName} />
        </div>
        <div className="pl-3 pr-1 text-slate-600 text-sm"> {authorName} </div>
        <div className="flex justify-center flex-col text-slate-400 text-xs">
          &#9679;
        </div>
        <div className="text-slate-600 pl-2 text-sm">
          {publishedDate}
        </div>

      </div>
      <div className="font-semibold text-xl pt-2">
        {title}
      </div>
      <div className="text-base font-light pt-2">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="text-slate-400 text-xs">
        {`${Math.ceil(content.length / 100)} min read`}
      </div>

    </div>
  </Link>

}

interface AvatarProps {
  name: string,
  
}
export function Avatar({ name }: AvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-12 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span className="font-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
  );
}
