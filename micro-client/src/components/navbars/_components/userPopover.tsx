import React, { useState } from 'react';
import { Popover, Button, PopoverTrigger, PopoverContent, Skeleton } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { UserIcon } from '@/app/lib/icon';
import ProfileUserModal from './profileModal';
const PopoverUser = () => {
  return (
    <Popover placement="bottom" showArrow={true} className='text-black w-[125px]'>
    <PopoverTrigger>
      <p> 
       <UserIcon className="w-8 h-8 rounded-full border cursor-pointer" />
      </p>
    </PopoverTrigger>
    <PopoverContent>
      <div className="px-1 py-2 w-full text-center">
        <ProfileUserModal/>
        <hr />
        <button className="button" onClick={() => signOut()}>
        Logout
      </button>
      </div>
    </PopoverContent>
  </Popover>
  );
};

export default PopoverUser;