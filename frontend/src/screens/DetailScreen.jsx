import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../axios'
import { Container, Row, Col, Image, Spinner, Alert } from 'react-bootstrap'

const DetailScreen = () => {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
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
    fetchService()
  }, [id])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!service) return null

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Image src={service.sample_image} alt={service.service_name} fluid />
        </Col>
        <Col md={6}>
          <h2>{service.service_name}</h2>
          <p>{service.description}</p>
          <p>Rating: {service.rating || 'N/A'}</p>
          <p>Price: ${service.price}</p>
          <p>Duration: {service.duration_of_service}</p>
          <p>Expert: {service.seller?.username || 'Unknown'}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailScreen