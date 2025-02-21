// pages/index.js
import NotificationService from '@/app/api/notification/route';
import { socketConfig } from '@/app/lib/genSocket-client';
import { NotificationIcon } from '@/app/lib/icon';
import { Badge, Popover, PopoverContent, PopoverTrigger, ScrollShadow } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Notification = () => {
  const [socket, setSocket] = useState<any>(); // Run this effect only once on component mount
  const { data } = useSession()! as any;
  const [showNotif, setShowNotif] = useState([]);
  const [showNotifcount, setShowNotifcount] = useState<any>();
  // useEffect(()=>{
  //    const getNotifi =async () =>{
  //     const {notifications,notifiIsSeenCount} = await NotificationService.getMessageByUser(data.user?.id);

  //     setShowNotif(notifications);
  //     setShowNotifcount(notifiIsSeenCount);
  //     }

  //    if(data.user?.id){
  //     getNotifi();
  //    }
  //    console.log(showNotif);

  // },[])
  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        // Perform asynchronous operations here
        const socket = await socketConfig(data!.accessToken);
        socket.connect();
        setSocket(socket);
        setTimeout(() => {
          socket.on('message', async () => {
            const { notifications, notifiIsSeenCount } = await NotificationService.getMessageByUser(data!.user?.id);
            setShowNotif(notifications)
            setShowNotifcount(notifiIsSeenCount);
          });
        }, 1000);

      } catch (error) {
        console.error("Error connect websocket:", error);
      }
    };
    connectWebSocket();
    return () => {
      if (socket) socket.disconnect();
    }
  }, []);

  const hanldeUpdateMessageSeen = async () => {
    let newList: number[] = [];
    showNotif.map((item: any) => {
      if (item.isSeen) {
        newList.push(item.id)
      }
    });
    if (newList.length > 0) {
      NotificationService.udpateMessageIsSeen(newList)

    }
    const { notifications } = await NotificationService.getMessageByUser(data.user?.id);
    setShowNotif(notifications ?? [])
    setShowNotifcount(0)
  }
  return (

    <Popover placement="bottom-end" showArrow={true} className='text-black w-[350px]'>
      <PopoverTrigger>
        <div onClick={hanldeUpdateMessageSeen}>
          <Badge content={showNotifcount !== 0 ? showNotifcount : undefined} size="md" color="primary">
            <NotificationIcon className="w-8 h-8 rounded-full border cursor-pointer" />
          </Badge>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 w-full text-center">
          <h3 className="font-semibold text-[16px]">Notifications</h3>
          <ScrollShadow className="w-[350px] h-[400px]">
            {
              showNotif?.map((notifi: any) => (
                <div className='text-left px-2 py-1' key={notifi.id}>
                  <h1 className='font-bold text-[14px]'>{notifi.title}</h1>
                  <div>
                    <span className='text-[12px] ml-2'>{notifi.desc}</span>
                    <p className='text-[8px]'>{notifi.createDate}</p>
                  </div>
                  <hr />
                </div>
              ))

            }
          </ScrollShadow>
          {/* <button onClick={() => alert("You've read all notifications!")}>Mark All as Read</button> */}
        </div>
      </PopoverContent>
    </Popover>

  );
};

export default Notification;
