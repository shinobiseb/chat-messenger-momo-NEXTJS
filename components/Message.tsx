import React from 'react';
import { MessageReq } from '@/types/types';
import useCookie from '@/lib/useCookie';
import { motion, AnimatePresence } from 'framer-motion';

export default function Message({ content, sender }: MessageReq) {
  const { getUserNameFromCookies } = useCookie();
  const currentUser = getUserNameFromCookies();

  const baseClasses = "p-3 mb-2 text-md max-w-80 sm:max-w-3/4 sm:w-3/4 rounded-md w-full";

  const messageVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

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
