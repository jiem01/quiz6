import React, { useState } from 'react'
import { Container, Form, Button, ListGroup, Alert, Spinner } from 'react-bootstrap'
import axios from '../axios'

const ChatBot = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMessage = { sender: 'user', text: input }
    setMessages([...messages, userMessage])
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.post('chat/ask/', { question: input })
      const botMessage = { sender: 'bot', text: data.answer }
      setMessages((prev) => [...prev, botMessage])
      setInput('')
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
      setLoading(false)
    }
  }

  return (
    <Container className="my-4" style={{ maxWidth: '600px' }}>
      <h2>Pool & Spa Services Chatbot</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup style={{ height: '400px', overflowY: 'scroll', marginBottom: '1rem' }}>
        {messages.map((msg, index) => (
          <ListGroup.Item key={index} variant={msg.sender === 'bot' ? 'secondary' : 'primary'}>
            <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}:</strong> {msg.text}
          </ListGroup.Item>
        ))}
        {loading && <ListGroup.Item>Bot is typing...</ListGroup.Item>}
      </ListGroup>
      <Form onSubmit={sendMessage}>
        <Form.Group className="d-flex">
          <Form.Control
            type="text"
            placeholder="Ask me about Pool & Spa Services..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="primary" className="ms-2">
            Send
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default ChatBot