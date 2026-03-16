import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Spinner, Alert, Card } from 'react-bootstrap'
import axios from '../axios'

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const { data: profile } = await axios.get('users/profile/')
      const { data: ordersData } = await axios.get('orders/history/')
      setUserInfo(profile)
      setOrders(ordersData)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!userInfo) return null

  return (
    <Container className="my-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <p><strong>First Name:</strong> {userInfo.first_name}</p>
              <p><strong>Last Name:</strong> {userInfo.last_name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Phone:</strong> {userInfo.phone_number}</p>
              <p><strong>Location:</strong> {userInfo.location}</p>
              <p><strong>Gender:</strong> {userInfo.gender}</p>
              <p><strong>Role:</strong> {userInfo.role}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <h3>My Orders</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
                <th>Date Purchased</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.service?.service_name || 'Unknown'}</td>
                  <td>${order.price_paid}</td>
                  <td>{new Date(order.date_purchased).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile