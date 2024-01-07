// import Image from 'next/image'
//import styles from './page.module.css'
"use client";
import { Key } from "react";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import axios from "axios";
import { useQuery } from "react-query";

// fetch all posts
const allPosts = async () => {
  const response = await axios.get("api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
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
      {data?.map((post: { id: number; user: { name: string; image: string; }; title: string; }) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  );
}
