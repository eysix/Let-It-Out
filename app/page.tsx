// import Image from 'next/image'
//import styles from './page.module.css'
"use client";
import { Key } from "react";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import axios from "axios";
import { useQuery } from "react-query";
import { PostType } from "./types/Posts"

// fetch all posts
const allPosts = async () => {
  const response = await axios.get("api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"], // key allows you to invalidate query and refetch?
  });
  // react-query caches all this data, so that switching pages does not fetch again

  if (error) return error;
  if (isLoading) return "Loading....";
  //console.log(data)

  return (
    <main>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
          comments={post.Comment}
        />
      ))}
    </main>
  );
}
