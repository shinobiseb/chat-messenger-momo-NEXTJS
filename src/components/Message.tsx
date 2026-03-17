import React from 'react';
import { IMessage } from '@/types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
export default function Message({ content, sender }: IMessage) {
  const baseClasses = "p-3 mb-2 text-md max-w-80 sm:max-w-3/4 sm:w-3/4 w-full break-words h-fit";

  const messageVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  const sessionData = useSession()
  const currentUser = sessionData.data?.user?.email

  return (
    <AnimatePresence>
      {sender === currentUser ? (
        <motion.div
          id='MessageText'
          className={`bg-darkgray ${baseClasses} ml-auto`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={messageVariant}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      ) : (
        <motion.div
          id='MessageText'
          className={`bg-lightorange ${baseClasses}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={messageVariant}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
