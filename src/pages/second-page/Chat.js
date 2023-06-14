import { CloseOutlined } from '@mui/icons-material'
import { Button, Card } from '@mui/material'
import React, { useState } from 'react'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import Upload from './Upload'

const Chat = ({ onClose, role }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")


  const sendMessage = async () => {
    // 添加用户的消息到列表
    setMessages([...messages, { sender: 'User', content: input }]);

    // console.log("message" + [...messages]);

    // 发送请求到API
    const res = await fetch(`/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input, role: role }),
    });
    console.log(res);
    const data = await res.json();

    // 添加AI的响应到消息列表
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'AI', content: data.data },
    ]);

    // 清空输入框
    setInput('');
  };

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  return (

    <Card sx={{ bgcolor: "white", height: '100%' }}>
      <Button onClick={() => onClose(false)}><CloseOutlined /></Button>
      <ChatMessages messages={messages} />
      <ChatInput value={input} onChange={handleInputChange} onSubmit={sendMessage} />

    </Card>

  )
}

export default Chat
