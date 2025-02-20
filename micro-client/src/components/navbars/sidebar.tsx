'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useProfile } from '@/app/lib/hooks/useProfile';
import { CONSTANTS } from '@/app/lib/constants';

type Props = {};

const Sidebar = (props: Props) => {
  const {data}:any = useSession();
  return (
    <aside className="flex flex-col gap-4 h-full sticky top-20 left-0">
      <Link href="/home">Home</Link>
      <hr className="border-1 w-full"/>
      {data.user.role!== CONSTANTS.ROLE.USER&&<Link href="/dashboard/users">User</Link>}
      <hr className="border-1 w-full"/>
      <Link href="/dashboard/Vessels">Vessel</Link>
      <button className="button" onClick={() => signOut()}>
        Logout
      </button>
    </aside>  
  );
};

export default Sidebar;