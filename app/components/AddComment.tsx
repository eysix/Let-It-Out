"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";
import { Post } from "@prisma/client";

type PostProps = {
  id?: string
}

type Comment = {
  postId?: string
  comment: string
}

export default function AddComment({ id }: PostProps) {
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let commentToastID: string

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    mutate({comment, postId: id})
    commentToastID = toast.loading('Adding your comment...', {id: commentToastID})
  }

  const { mutate } = useMutation(
    async(data: Comment) => 
    await axios.post('/api/posts/addComment', { data }),
    {
      onSuccess: (data) => {
        setComment("")
        setIsDisabled(false)
        queryClient.invalidateQueries(['detail-post'])
        toast.success("Yay, your comment has been made. 😊", {id: commentToastID});
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, {id: commentToastID});
        }
        setIsDisabled(false)
      }
    }
  )

  return (
    <form className="my-8" onSubmit={handleSubmit}>
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2 mx-1 bg-white"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-violet-700 text-white py-2 px-6 mx-1 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p className={`font-bold ${comment.length > 300 ? "text-red-700" : "text-gray-700"}`}>
          {`${comment.length}/300`}
        </p>
      </div>
    </form>
  );
}
