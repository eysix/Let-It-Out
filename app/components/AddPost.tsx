"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  //const queryClient = useQueryClient();

  //create a post
  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post("/api/posts/addPost", {
        title,
      })
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents refreshing from pressing button
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-600" : "text-gray-800"
          }`}
        >
          {title.length}/300
        </p>
        <button
          disabled={isDisabled}
          className="text-sm bg-violet-700 text-white py-2 px-6 rounded-lg disabled:opacity-25"
          type="submit"
        >
          Create a post
        </button>
      </div>
    </form>
  );
}
