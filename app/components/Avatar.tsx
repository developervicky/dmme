"use client";
import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User;
  onClick?: () => void;
}

const Avatar: FC<AvatarProps> = ({ user, onClick }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div
      onClick={onClick}
      className={clsx(`relative`, onClick && "cursor-pointer")}
    >
      <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11">
        <Image
          src={user?.image || "/images/defaultAvatar2.svg"}
          alt="avatar"
          fill
        />
      </div>
      {isActive && (
        <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default Avatar;
