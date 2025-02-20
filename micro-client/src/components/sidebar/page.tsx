import React from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import SidebarRow from './SidebarRow';
import Button from '../buttons/Button';
import Link from 'next/link';
import { useProfile } from '@/app/lib/hooks/useProfile';
import { CONSTANTS } from '@/app/lib/constants';
function Sidebar() {
  const {data}:any = useSession();
  // const setOpen = useSetRecoilState();
  // const {profile}:any = useProfile();
  return (
    <nav className='z-20 hidden md:flex flex-col md:w-[8%] xl:w-[16%] 3xl:w-[21%] px-3 pt-2 pb-5 fixed top-0 left-0 h-screen border-r border-[#dbdbdb] bg-white text-black'>
      <div className='hidden xl:inline-flex px-3 pt-[25px] pb-4 mt-[4px]'>
        <a href='/'>
          <p className='font-grandista text-2xl opacity-90'>OM-Training</p>
        </a>
      </div>
      <div className='hidden md:inline-flex xl:hidden mb-1 mt-[21px] p-[0.715rem] pb-[23px]'>
        <Image
          src='/next.svg'
          width='24'
          height='24'
          alt='Instakilo'
        />
      </div>

      <div className='pt-1 xl:pt-[9px] flex-grow'>
        <Link href={'/'}>
        <SidebarRow path={<HomeIcon />} title='Home' active={true} />
        </Link>
        <hr className="border-1 w-full"/>
        {data.user.role!== CONSTANTS.ROLE.USER&&<Link href={'/dashboard/users'} >
        <SidebarRow path={<UserIcon />} title='User' />
        <hr className="border-1 w-full"/>
        </Link>
        }
        <Link href={'/dashboard/vessels'}>
        <SidebarRow src={'/images/Vessel.png'} title='Vessel' />
        </Link>
        {/* <SidebarRow path={<NotificationsIcon />} title='Notifications' /> */}
      </div>
      {/* <More /> */}
      {/* <Button
          onClick={() => signOut()}
          label={'Log out'}
        /> */}
    </nav>
  );
}

export default Sidebar;

function HomeIcon() {
  return (
    <path d='M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z'></path>
  );
}

function UserIcon (){
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="88 18 78 200" id="user-circle">
      <circle cx="128" cy="128" r="86" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></circle>
      <circle cx="128" cy="120" r="30" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></circle>
      <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" d="M63.79905,199.37405a72.02812,72.02812,0,0,1,128.40177-.00026"></path></svg>
    </>
  )
}
function NotificationsIcon() {
  return (
    <path d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z'></path>
  );
}
