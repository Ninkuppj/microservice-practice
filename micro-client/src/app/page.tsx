'use client'
import Image from "next/image";
import Link from "next/link";
import { useProfile } from "./lib/hooks/useProfile";
import { CONSTANTS } from "./lib/constants";
import { CircularProgress } from "@nextui-org/react";
// import { User } from "@@user-management-vector-icon.jpg"
export default function Home() {
  const { profile }: any = useProfile();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-black bg-white">
      <div className="w-full items-center justify-between font-mono text-sm lg:flex mb-3">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="flex items-center space-x-3">
            <Image src="/images/User.png" alt="Logo" height={60} width={60} />
            <div>
              <h2 className="mb-1 text-2xl font-semibold ">
                User Name
              </h2>
              <p className=" font-bold">role: user</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center my-5">
        <h2 className="text-left mr-2 text-xl font-bold">Services</h2>
        <hr className="w-[85%] border-1 border-gray-200 " />
      </div>
      {profile!.role?.id === undefined ? <div className="flex items-center space-x-4"><CircularProgress aria-label="Loading..." />Loading...</div> : <div className="grid text-center grid-cols-2 lg:w-full lg:text-left">
        {
          profile.role?.id !== CONSTANTS.ROLE.USER && <Link
            href="/dashboard/users"
            className="group rounded-lg border-2 m-2  border-gray-200 border-transparent px-5 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/30 "
            // target="_blank"
            rel="noopener noreferrer"
          >

            <h2 className={`mb-3 text-2xl font-semibold flex items-center`}>

              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ">
                <Image
                  src="/images/User-icon.png"
                  alt=""
                  width={100}
                  height={24}
                  priority
                />
              </span>
              User{" "}
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              User Management include features and API.
            </p>
          </Link>
        }

        <Link
          href="/dashboard/vessels"
          className="group rounded-lg border-2 border-gray-200 border-transparent m-2 px-5 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/30"
          // target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className='mb-3 text-2xl font-semibold flex items-center'>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <Image
                src="/images/Vessel.png"
                alt=""
                width={100}
                height={24}
                priority
              />
            </span>
            Vessel{" "}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Vessel Management include features and API.
          </p>
        </Link>
      </div>}
    </main>
  );
}
