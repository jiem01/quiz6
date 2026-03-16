import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Modal, Form, Spinner, Alert, Tabs, Tab } from 'react-bootstrap'
import axios from '../axios'

const UserScreen = () => {
  const [users, setUsers] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState({ type: '', id: '', input: '' })

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: usersData } = await axios.get('users/admin/users/')
      const { data: appsData } = await axios.get('applications/list/')
      setUsers(usersData)
      setApplications(appsData)
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleApprove = (id) => {
    setModalData({ type: 'approve', id, input: '' })
    setShowModal(true)
  }

  const handleDecline = (id) => {
    setModalData({ type: 'decline', id, input: '' })
    setShowModal(true)
  }

  const submitModal = async () => {
    try {
      setLoading(true)
      if (modalData.type === 'approve') {
        await axios.post(`applications/${modalData.id}/approve/`, { merchant_id: modalData.input })
      } else {
        await axios.post(`applications/${modalData.id}/decline/`, { decline_reason: modalData.input })
      }
      setShowModal(false)
      fetchData()
    } catch (err) {
      setError(err.response?.data?.detail || err.message)
      setLoading(false)
    }
  }

  return (
    <Container className="my-4">
      <h2>Admin Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}

      <Tabs defaultActiveKey="users" className="mb-3">
        <Tab eventKey="users" title="All Users">
          <Table striped bordered hover responsive className="mt-2">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="applications" title="Seller Applications">
          <Table striped bordered hover responsive className="mt-2">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.user?.username || 'Unknown'}</td>
                  <td>{app.status}</td>
                  <td>
                    <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(app.id)}>
                      Approve
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDecline(app.id)}>
                      Decline
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.type === 'approve' ? 'Approve Application' : 'Decline Application'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{modalData.type === 'approve' ? 'Merchant ID' : 'Decline Reason'}</Form.Label>
            <Form.Control
              type="text"
              value={modalData.input}
              onChange={(e) => setModalData({ ...modalData, input: e.target.value })}
              required
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" onClick={submitModal}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default UserScreen