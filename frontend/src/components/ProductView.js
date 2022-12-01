import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function ProductView () {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const { productId } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const order = (productId) => {

        fetch('http://localhost:4000/users/userOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: productId
            })
        })
        .then(res=>res.json())
        .then(data=>{
            
            if (data === true) {
                Swal.fire({
                    title: "Purchase Successful!",
                    icon: "success",
                    text: "Thank you for Purchasing!"
                  });

                  navigate("/products")

            } else {

                Swal.fire({
                    title: "Oops!",
                    icon: "error",
                    text: "Please check and validate your credentials!"
                  });

            }
        })
    }

    useEffect(() => {
        console.log(productId);
        fetch(`http://localhost:4000/products/${productId}`)
        .then(res=>res.json())
        .then(data=>{
            setName(data.productName);
			setDescription(data.description);
			setPrice(data.price);
        })
    }, [productId])

    return (
        <Container className="mt-5">
		  <Row>
		     <Col lg={{span:6, offset:3}}>
				<Card>
					<Card.Body>
                    <Card.Img variant="top" src="holder.js/100px180" />
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle>Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price:</Card.Subtitle>
						<Card.Text>PHP {price}</Card.Text>
						{
							(user.id!==null)?
							<Button variant="primary" onClick={()=>order(productId)}>Purchase</Button>
							:
							<Link className="btn btn-danger" to="/login">Log in to Purchase</Link>
						}
						
					</Card.Body>
				</Card>
		     </Col>
		  </Row>
		</Container>
    )
}