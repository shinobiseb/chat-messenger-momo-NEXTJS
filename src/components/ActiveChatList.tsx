import { Chat, IUser } from '@/types/types'
import { BlinkBlur } from 'react-loading-indicators'
import ActiveChat from './ActiveChat'

interface IActiveChatList {
    loading: boolean,
    chats: Chat[],
    currentUser: string,
    user: {
        id?: string | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        emailVerified?: boolean | null | undefined;
    },
    fetchSidebarChats: () => Promise<void>
}

export default function ActiveChatList( { loading, chats, currentUser, user, fetchSidebarChats
 } : IActiveChatList ) {

  return (
    <section className='w-full h-4/5 overflow-y-auto'>
        { 
        loading ? 
        <div className='px-4'>
            <BlinkBlur
              color={"#F15025"}
              size='small'
            />  
        </div> :
         null
       }
      {
        chats.map((chat: Chat) => (
          <ActiveChat
            key={chat._id?.toString()} 
            currentUser={currentUser}
            lastMessage={
              chat.messages.length > 0 
                ? chat.messages[chat.messages.length - 1].content 
                : "Get Chatting"
            }
            targetUserName={
              chat.participants[0] !== user.email 
                ? chat.participants[0] 
                : chat.participants[1]
            }
            fetchSidebarChats={fetchSidebarChats}
            chatId={chat._id?.toString()} 
          />
        ))
      }
      </section>
  )
}
