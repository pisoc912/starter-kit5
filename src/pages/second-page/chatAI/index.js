import { Fullscreen } from '@mui/icons-material'
import { Card } from '@mui/material'
import React, { useState } from 'react'
import ChatInput from '../ChatInput'
import ChatMessages from '../ChatMessages'

const ChatAI = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const sendMessage = async () => {
    // 添加用户的消息到列表
    setMessages([...messages, { sender: 'User', content: input }]);
    console.log("message" + [...messages]);

    // 发送请求到API
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    console.log(data);

    // 添加AI的响应到消息列表
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'AI', content: data.data },
    ]);

    // 清空输入框
    setInput('');
  };

  return (
    <Card sx={{ bgcolor: "white", height: '100%' }}>
      <ChatMessages messages={messages} />
      <ChatInput value={input} onChange={handleInputChange} onSubmit={sendMessage} />
    </Card>
  )
}

export default ChatAI
