'use client'

import Cookies from 'js-cookie'

export default function useCookie() {

    function getUserNameFromCookies(): string {
        const userName = Cookies.get('userName');
        if (!userName) {
            return '';
        }
        return userName;  // Return the username as a string
    }

    function setUserNameFromCookies(userName: string) {
        return Cookies.set('userName', userName, { sameSite: 'Strict', expires: 10000});
    }

    function deleteUserNameFromCookies(userName: string){
        return Cookies.remove(userName)
    }

    return { 
        getUserNameFromCookies, 
        setUserNameFromCookies, 
        deleteUserNameFromCookies 
    };
}
