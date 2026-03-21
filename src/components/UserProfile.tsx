import React from 'react'
import { IAuthSession } from '@/types/types'

interface IUserProfile {
    user: IAuthSession['user']
}

export default function UserProfile({ user }: IUserProfile) {
  return (
    <aside className='flex items-center'>
      <img className='w-16 rounded-full ' src={user.image ? user?.image : undefined} alt=""/>
      <div className='ml-2'>
        <h3 className='text-xl'>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </aside>
  )
}
