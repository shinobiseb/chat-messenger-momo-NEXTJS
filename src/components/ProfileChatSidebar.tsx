import React from 'react'

interface IProfileChatSidebar {
    open: boolean
}

export default function ProfileChatSidebar( { open }: IProfileChatSidebar) {



    if(open) return (
    <div>ProfileChatSidebar</div>
  )
}
