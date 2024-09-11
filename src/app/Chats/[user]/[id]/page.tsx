import React, { useState } from 'react';
import ChatWindow from '../../../../../components/ChatWindow';
import { Chat, Message, User } from '@/types/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import useCookie from '@/lib/useCookie';

interface PageProps {
  chats: Chat[];
  currentUserName: string;
}

export default function Page({ chats, currentUserName }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState('66ce723ee28c7d9e74356e4e');

  // Find the target chat and set the messages
  React.useEffect(() => {
    const targetChat = chats.find((chat) => chat._id === chatId);
    if (targetChat) {
      setMessages(targetChat.messages);
    } else {
      console.error('Target Chat not found');
    }
  }, [chatId, chats]);

  return (
    <div>
      <ChatWindow userName={currentUserName} messages={messages} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    // Get user name from cookies
    const userName = context.req.cookies.userName || '';
    if (!userName) {
      return {
        redirect: {
          destination: '/SignIn',
          permanent: false,
        },
      };
    }

    // Fetch chats data from API
    const chatResponse = await fetch(`${process.env.API_URL}/chats`);
    if (!chatResponse.ok) throw new Error('Error fetching chats');
    const chatsData = await chatResponse.json();

    return {
      props: {
        chats: chatsData.chats,
        currentUserName: userName,
      },
    };
  } catch (error) {
    console.error(`Error fetching chats: ${error}`);
    return {
      props: {
        chats: [],
        currentUserName: '',
      },
    };
  }
};
