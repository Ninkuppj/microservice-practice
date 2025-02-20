'use client'
import { memo } from 'react';
// import {SearchBar} from "./forms/SearchBar";
import Link from "next/link";
// import {Routes} from "@config";
import { Routes } from '@/app/config/route';
import { useSession } from 'next-auth/react';
import Button from '../buttons/Button';
import Notification from '../notifications/notification';
import PopoverUser from './_components/userPopover';
const Header = memo(() => {
    const {data} = useSession() as any; // get user data from session
    
    return (
        <header
            className={
                "sticky top-0 w-full flex justify-center bg-white px-custom h-16 items-center z-20 bg-popover md:px-[64px] shadow-md"
            }
        >
            {/* <SearchBar/> */}
            <section className="absolute right-0 md:mr-[48px] lg:mr-[50px] hidden md:block">
                {
                    data?.accessToken ? (
                       <div className='space-x-2 flex'>
                       <Notification/>
                       <PopoverUser/>
                       </div>
                    ): (
                        <Button label={<Link href={Routes.Login}>Login</Link>}/>
                        
                    )
                }
            </section>
        </header>
    );
});
Header.displayName = "Header";
export { Header };
