import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../axios'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const PAYPAL_CLIENT_ID = 'Aem-itEKv7siqHdTeFO-6btzQl_n4X5EVjNE2QCzbtNvVwv3-9P4wPSC885IljyzX80MmxINPyICs-X-' // Replace with your sandbox business client ID

const DetailScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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

  useEffect(() => {
    if (!service || !userInfo) return
    if (document.getElementById('paypal-button-container')) {
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`
      script.addEventListener('load', () => {
        window.paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: service.price.toString()
                },
                payee: {
                  email_address: service.seller.merchant_id
                },
                description: service.service_name
              }]
            })
          },
          onApprove: async function (data, actions) {
  const details = await actions.order.capture()
  try {
    console.log({ buyer: userInfo.id, service: service.id, paypal_transaction_id: details.id, price_paid: service.price })
    await axios.post(
  '/orders/create/',
  {
    buyer: userInfo.user.id,        // <--- nested inside user
    service: service.id,
    paypal_transaction_id: details.id,
    price_paid: parseFloat(service.price)
  },
  {
    headers: {
      Authorization: `Bearer ${userInfo.access}`,
      'Content-Type': 'application/json'
    }
  }
)
    setSuccess(true)
  } catch (err) {
    setError(err.response?.data?.detail || err.message)
  }
          },
          onError: function (err) {
            setError(err.toString())
          }
        }).render('#paypal-button-container')
      })
      document.body.appendChild(script)
    }
  }, [service, userInfo])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!service) return null

  return (
    <>
      <Container className="my-4">
        <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
          Back
        </Button>
        {success && <Alert variant="success">Payment Successful!</Alert>}
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
                {userInfo && userInfo.role !== 'Admin' && (
                  <div id="paypal-button-container" className="mt-3"></div>
                )}
                {!userInfo && (
                  <Alert variant="info" className="mt-3">
                    Please login to avail this service.
                  </Alert>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  )
}

export default DetailScreen