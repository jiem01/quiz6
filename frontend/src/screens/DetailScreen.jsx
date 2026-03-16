import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../axios'

const DetailScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchService = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`services/${id}/`)
      setService(data)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchService()
  }, [id])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!service) return null

  return (
    <Container className="my-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Back
      </Button>
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img 
              src={service.sample_image || 'https://via.placeholder.com/500x300'} 
              alt={service.service_name} 
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{service.service_name}</Card.Title>
              <Card.Text><strong>Description:</strong> {service.description}</Card.Text>
              <Card.Text><strong>Rating:</strong> {service.rating || 'N/A'}</Card.Text>
              <Card.Text><strong>Price:</strong> ${service.price}</Card.Text>
              <Card.Text><strong>Duration:</strong> {service.duration_of_service} mins</Card.Text>
              <Card.Text><strong>Expert:</strong> {service.seller?.username || 'Unknown'}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default DetailScreen