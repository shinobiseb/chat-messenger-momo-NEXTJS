import React from 'react';
import { MessageReq } from '@/types/types';
import useCookie from '@/lib/useCookie';

export default function Message({ content, sender }: MessageReq) {
    const { getUserNameFromCookies } = useCookie()
    const currentUser = getUserNameFromCookies()

    const baseClasses = "p-3 mb-2 text-md max-w-80 sm:max-w-3/4 sm:w-3/4 rounded-md w-full";

    if( sender=== currentUser){
        return (
            <div id='MessageText' className={`bg-darkgray ${baseClasses} ml-auto`}>
                {content}
            </div>
        );
    } else {
        return (
            <div id='MessageText' className={`bg-lightorange ${baseClasses}`}>
                {content}
            </div>
        );
    }
}