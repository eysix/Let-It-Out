"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className="bg-slate-500 text-white text-sm px-6 py-2 rounded-md hover:bg-slate-700"
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          alt=""
          width={64}
          height={64}
          src={image}
          className="w-14 rounded-full"
        />
      </Link>
    </li>
  );
}
