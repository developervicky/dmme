"use client";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}

const UserBox: FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setLoading(false));
  }, [data, router]);

  return (
    <>
      {loading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-slate-100 p-3 transition-all hover:bg-indigo-100"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="mb-1 flex flex-col items-start justify-between">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
              <p className="text-xs font-light text-gray-500">{data.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
