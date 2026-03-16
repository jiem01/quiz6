import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap'
import axios from '../axios'

const SellerDashboard = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState({
    type: 'add',
    id: null,
    service_name: '',
    description: '',
    price: '',
    duration_of_service: '',
    sample_image: '',
  })

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('services/manage/')
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

  const handleAdd = () => {
    setModalData({ type: 'add', id: null, service_name: '', description: '', price: '', duration_of_service: '', sample_image: '' })
    setShowModal(true)
  }

  const handleEdit = (service) => {
    setModalData({ type: 'edit', ...service })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setLoading(true)
        await axios.delete(`services/manage/${id}/`)
        fetchServices()
      } catch (err) {
        setError(err.response?.data?.detail || err.message)
        setLoading(false)
      }
    }
  }

  const submitModal = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('service_name', modalData.service_name)
      formData.append('description', modalData.description)
      formData.append('price', modalData.price)
      formData.append('duration_of_service', modalData.duration_of_service)
      if (modalData.sample_image instanceof File) {
        formData.append('sample_image', modalData.sample_image)
      }

      if (modalData.type === 'add') {
        await axios.post('services/manage/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await axios.put(`services/manage/${modalData.id}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      }

      setShowModal(false)
      fetchServices()
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
      setLoading(false)
    }
  }

  return (
    <Container className="my-4">
      <h2>Seller Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}
      <Button className="mb-2" variant="primary" onClick={handleAdd}>
        Add New Service
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.service_name}</td>
              <td>{service.description}</td>
              <td>${service.price}</td>
              <td>{service.duration_of_service}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(service)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(service.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.type === 'add' ? 'Add Service' : 'Edit Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="my-2">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                value={modalData.service_name}
                onChange={(e) => setModalData({ ...modalData, service_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={modalData.description}
                onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={modalData.price}
                onChange={(e) => setModalData({ ...modalData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={modalData.duration_of_service}
                onChange={(e) => setModalData({ ...modalData, duration_of_service: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Sample Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setModalData({ ...modalData, sample_image: e.target.files[0] })}
              />
            </Form.Group>
            <Button className="mt-2" variant="primary" onClick={submitModal}>
              {modalData.type === 'add' ? 'Add Service' : 'Save Changes'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default SellerDashboard