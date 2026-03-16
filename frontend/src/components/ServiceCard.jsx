import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ServiceCard = ({ service }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img variant="top" src={service.sample_image} />
      <Card.Body>
        <Card.Title>{service.service_name}</Card.Title>
        <Card.Text>{service.description}</Card.Text>
        <Card.Text>Rating: {service.rating || 'N/A'}</Card.Text>
        <Link to={`/service/${service.id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default ServiceCard