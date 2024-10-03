
import { Appbar } from "../components/Appbar";
import { Blogpost } from "../components/Blogpost";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  if (loading) {
    return (
      <div>
        <div>
          <Appbar />
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Blogpost blog={blog} />
    </div>
  );
};

