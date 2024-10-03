import { Appbar } from "../components/Appbar"
import { TextEditor } from "../components/TextEditor"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-screen-lg p-4 w-full">
          <input onChange={(e) => {
            setTitle(e.target.value)
          }}
            type="text"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none rounded-lg block w-full p-2.5 mb-4"
            placeholder="Title"
          />
          <TextEditor onChange={(e) => {
            setDescription(e.target.value)
          }} />
          <button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
              title,
              content: description
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            });
            navigate(`/blog/${response.data.id}`)
          }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-black rounded-lg ring-2 ring-white ring-inset">
            Publish post
          </button>

        </div>
      </div>
    </div >
  )
}
