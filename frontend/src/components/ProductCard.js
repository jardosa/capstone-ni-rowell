import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default function ProductCard ({productProp}) {

    let { name, description, price, _id } = productProp;

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
            {description}
            </Card.Text>
            <Card.Text>PHP {price}</Card.Text>
            <Button variant="primary" as={Link} to={`/products/${_id}`}>Details</Button>
        </Card.Body>
        </Card>
    )
}