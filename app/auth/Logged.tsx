"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <li className="flex gap-6 items-center">
      <button
        onClick={() => signOut()}
        className="bg-slate-500 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-700"
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          alt=""
          width={48}
          height={48}
          src={image}
          className="w-12 rounded-full border-2 border-purple-400 hover:border-purple-500"
        />
      </Link>
    </li>
  );
}
