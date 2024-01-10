// import Image from 'next/image'
//import styles from './page.module.css'
"use client";
import { Key, useState } from "react";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import axios from "axios";
import { useQuery } from "react-query";
import { thePostType } from "./types/Posts";

// fetch all posts
const allPosts = async () => {
  const response = await axios.get("api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const [isLanding, setIsLanding] = useState(true)

  const { data, error, isLoading } = useQuery<thePostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"], // key allows you to invalidate query and refetch?
  });
  // react-query caches all this data, so that switching pages does not fetch again

  if (error) return error;
  if (isLoading) return "Loading....";
  //console.log(data)

  return (
    <main>
      {isLanding ? (
        <div className="bg-white my-8 p-8 rounded-lg">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-700">Drew Au</h3>
          </div>
          <div className="my-4">
            <p className="break-words">
              Hi there! <br />
              Thanks for checking out Shout em Out. An easy way to spread
              positivity and brighten your day is to appreciate people and all
              the things that make our lives great. <br /><br />
              Try reflecting on something that you're grateful for and give them a shout-out today!
            </p>
          </div>
          <div className="flex gap-4 mt-8 cursor-pointer items-center">
            <button
              onClick={(e) => setIsLanding(false)}
              className="bg-violet-500 text-white px-4 py-2 rounded-md"
            >
              Enter ➡️
            </button>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
