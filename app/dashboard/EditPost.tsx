'use client'
import { useMutation, useQueryClient } from "react-query";
import Image from "next/image"
import {useState} from "react"
import Toggle from "./Toggle"
import axios from "axios"
import toast from "react-hot-toast"

//type alias can be used for other types such as primitives, unions, and tuples(arrays)
// primitive - type Name = string;
// union - type Name = First | Middle;
// tuple - type Data = [number, string]
// interface can be defined multiple times but still be treated as one

type EditProps = {
  id: string
  avatar: string
  name: string
  title: string 
  comments?: {
    id: string
    postId: string
    userId: string
  }[]
}

export default function EditPost({avatar, name, title, comments, id}: EditProps) {
  const [toggle, setToggle] = useState(false);
  let deletePostID: string
  const queryClient = useQueryClient();

  const {mutate} = useMutation(
    async(id: string) => 
      await axios.delete('/api/posts/deletePost', {data: id}),
    {
      onError: (error) => {
        //console.log(error)
        toast.error('Error deleting that post', {id: deletePostID})
      },
      onSuccess: (data) => {
        //console.log(data);
        toast.success("Post has been deleted.", {id: deletePostID})
        queryClient.invalidateQueries(["auth-posts"]); 
      }
    }
  )

  const deletePost = () => {
    deletePostID = toast.loading("Deleting your post...", { id: deletePostID})
    mutate(id)
  }

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
            className="rounded-full"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="py-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            className="text-sm font-bold text-red-500"
            onClick={(e) => {
              setToggle(true)
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}