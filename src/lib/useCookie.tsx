'use client'

import Cookies from 'js-cookie'

export default function useCookie() {

    function getUserNameFromCookies( userName:string ) {
        Cookies.get('userName')
    }

    function setUserNameFromCookies( userName:string ){
        if(!Cookies.get('userName')){
            Cookies.set('userName', userName)
        } else {
            console.warn('User already entered')
        }
    }

    return { getUserNameFromCookies, setUserNameFromCookies }
}
