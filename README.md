# MauChat

### Created by Ney Sebastian Patin

MauChat is a simple chat application designed to provide an aesthetically pleasing and smooth user experience. The application allows for real-time chatting via WebSockets and offers basic user authentication and authorization.

## Demo

[MauChat](https://mauchat.vercel.app/)

## Features

- Minimalist User Interface
- User Creation
- User Authorization and Authentication (Basic)
- Realtime Chatting via WebSockets (ws)

### Uses
MauChat connects users securely using their Google accounts, allowing for text messages to be sent and contacts to be saved. Google is leveraged for authentication, enhancing security.

The primary purpose of MauChat is to provide the general public with a more visually appealing and enjoyable chat experience.

## Tech Stack

**Client:** React, Next.js, TypeScript, TailwindCSS  
**Server:** Node.js, Express, WebSockets (ws), MongoDB

## User Stories

- [Figma Prototype](https://www.figma.com/design/jG3oYXDV9mtIA69u72ORWv/Chat-UI-Mockup?node-id=0-1&t=7RYocUvqcU3u22Qm-1)

## Known Issues
**Messages not sending/Send Button not working**  
The servers for MauChat often take some time to start up. If messages are not sending directly after opening a chat, try waiting a few seconds or check console for the **"WebSocket connection established"** message.



## Acknowledgements

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
