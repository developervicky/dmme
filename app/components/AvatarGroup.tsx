import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";

interface AvatarGroupProps {
  users?: User[];
  onClick?: () => void;
}

const AvatarGroup: FC<AvatarGroupProps> = ({ users, onClick }) => {
  const slicedUsers = users?.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div
      onClick={onClick}
      className={clsx(`relative h-11 w-11`, onClick && "cursor-pointer")}
    >
      {slicedUsers?.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block h-[21px] w-[21px] overflow-hidden rounded-full ${positionMap[index as keyof typeof positionMap]}`}
        >
          <Image
            src={user?.image || "/images/defaultAvatar2.svg"}
            alt="avatar"
            fill
          />
        </div>
      ))}
      {/* <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3" /> */}
    </div>
  );
};

export default AvatarGroup;
