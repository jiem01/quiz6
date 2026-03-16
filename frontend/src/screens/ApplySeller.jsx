import React, { useState } from 'react'
import { Container, Button, Alert, Spinner } from 'react-bootstrap'
import axios from '../axios'

const ApplySeller = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const applyHandler = async () => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')
      const { data } = await axios.post('applications/apply/', {})
      setSuccess('Application submitted successfully! Status: ' + data.status)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
      setLoading(false)
    }
  }

  return (
    <Container className="my-4" style={{ maxWidth: '500px' }}>
      <h2>Apply to Become a Seller</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Button variant="primary" onClick={applyHandler}>
          Submit Application
        </Button>
      )}
    </Container>
  )
}

export default ApplySeller