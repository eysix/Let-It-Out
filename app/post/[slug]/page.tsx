"use client";

import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import { useQuery } from "react-query";
import Image from "next/image"
import axios from "axios";
import AddComment from "@/app/components/AddComment"

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType[]>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["detail-post"],
  });

  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <div>
      <Post
        id={data.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data?.Comment}
      />
      <AddComment id={data?.id}/>
      {data?.Comment?.map((comment) => (
        <div key={comment.id} className="my-6 bg-violet-100 px-6 py-4 rounded-md">
          <div className="flex items-center gap-2 py-2">
            <Image width={24} height={24} src={comment.user?.image} alt="avatar" />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-2">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
