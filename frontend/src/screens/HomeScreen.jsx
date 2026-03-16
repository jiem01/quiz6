import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listServices } from '../actions/serviceActions'
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap'
import ServiceCard from '../components/ServiceCard'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const serviceList = useSelector((state) => state.serviceList)
  const { loading, error, services } = serviceList

  useEffect(() => {
    dispatch(listServices())
  }, [dispatch])

  return (
    <Container>
      <h1 className="my-4">Available Services</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {services.map((service) => (
            <Col key={service.id} sm={12} md={6} lg={4} xl={3}>
              <ServiceCard service={service} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default HomeScreen