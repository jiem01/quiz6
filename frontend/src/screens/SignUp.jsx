import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap'
import { register } from '../actions/userActions'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    location: '',
    gender: '',
    password: '',
    confirm_password: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) navigate('/')
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match')
    } else {
      dispatch(register(formData))
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Container className="my-4" style={{ maxWidth: '600px' }}>
      <h2>Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner animation="border" />}
      <Form onSubmit={submitHandler}>
        {['email','username','phone_number','first_name','last_name','location','gender','password','confirm_password'].map(field => (
          <Form.Group key={field} controlId={field} className="my-2">
            <Form.Label>{field.replace('_',' ').toUpperCase()}</Form.Label>
            <Form.Control
              type={field.includes('password')?'password':'text'}
              placeholder={`Enter ${field.replace('_',' ')}`}
              name={field}
              value={formData[field]}
              onChange={onChange}
              required
            />
          </Form.Group>
        ))}
        <Button type="submit" variant="primary" className="my-2">
          Register
        </Button>
      </Form>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Container>
  )
}

export default SignUp