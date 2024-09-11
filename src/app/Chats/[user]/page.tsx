import React from 'react';
import ChatWindow from '../../../../components/ChatWindow';
import { Chat, Message } from '@/types/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

interface PageProps {
  messages: Message[];
  currentUserName: string;
}

export default function Page({ messages, currentUserName }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <ChatWindow userName={currentUserName} messages={messages} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    // Retrieve user name from cookies
    const userName = context.req.cookies.userName || '';
    if (!userName) {
      return {
        redirect: {
          destination: '/SignIn',
          permanent: false,
        },
      };
    }

    // Retrieve chat ID from URL params (assuming it's passed in the URL)
    const { chatId } = context.params || {};
    if (!chatId) {
      return {
        notFound: true,
      };
    }

    // Fetch chats data from your API
    const chatResponse = await fetch(`${process.env.API_URL}/chats`);
    if (!chatResponse.ok) throw new Error('Error fetching chats');
    
    const chatsData = await chatResponse.json();
    const targetChat = chatsData.chats.find((chat: Chat) => chat._id === chatId);

    if (!targetChat) {
      return {
        notFound: true,
      };
    }

    // Pass chat messages and user name to the component as props
    return {
      props: {
        messages: targetChat.messages,
        currentUserName: userName,
      },
    };
  } catch (error) {
    console.error(`Error fetching chats: ${error}`);
    return {
      props: {
        messages: [],
        currentUserName: '',
      },
    };
  }
};
