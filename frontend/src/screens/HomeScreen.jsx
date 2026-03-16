import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'

const HomeScreen = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('services/list/')
      setServices(data)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const goToDetail = (id) => {
    navigate(`/service/${id}`)
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Available Pool & Spa Services</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {services.map((service) => (
          <Col key={service.id}>
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={service.sample_image || 'https://via.placeholder.com/300x200'} 
                alt={service.service_name} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{service.service_name}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Card.Text>Rating: {service.rating || 'N/A'}</Card.Text>
                <Button variant="primary" onClick={() => goToDetail(service.id)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default HomeScreen