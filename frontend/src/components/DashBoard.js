import { useContext, useState, useEffect } from "react";
import {Table, Button} from "react-bootstrap";
import {Navigate, Link} from "react-router-dom";
import UserContext from "../UserContext";

import Swal from "sweetalert2";

export default function Dash(){

	
	const {user} = useContext(UserContext);

	
	const [allProducts, setAllProducts] = useState([]);

	
	const archive = (productId, productName) =>{
		console.log(productId);
		console.log(productName);

		fetch(`http://localhost:4000/products/${productId}/archive`,{
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isAvailable: false
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Archive Succesful!",
					icon: "success",
					text: `${productName} is now inactive.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Archive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}

	
	const unarchive = (productId, productName) =>{
		console.log(productId);
		console.log(productName);

		fetch(`http://localhost:4000/products/${productId}/activate`,{
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isAvailable: true
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Unarchive Succesful!",
					icon: "success",
					text: `${productName} is now active.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Unarchive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}

	const fetchData = () =>{
	
		fetch('http://localhost:4000/products/productlist',{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setAllProducts(data)
		})
	};


	
	useEffect(()=>{
		fetchData();
	}, [])
	

	return(
		(user.isAdmin)
		?
		<>
			<div className="mt-5 mb-3 text-center">
				<h1>Admin Dashboard</h1>
				
				<Button as={Link} to="/addProduct" variant="primary" size="lg" className="mx-2">Add Product</Button>
				<Button variant="success" size="lg" className="mx-2" disabled>Show Orders</Button>
			</div>
			<Table striped bordered hover>
		     <thead>
		       <tr>
		         <th>Product ID</th>
		         <th>Product Name</th>
		         <th>Description</th>
		         <th>Price</th>
				 <td>Quantity</td>
		         <th>Status</th>
		         <th>Action</th>
		       </tr>
		     </thead>
		     <tbody>
		       { allProducts.map((product) => <ProductRow product={product} key={product._id} archive={archive} unarchive={unarchive} />) }
		     </tbody>
		   </Table>
		</>
		:
		<Navigate to="/products" />
	)
}

const ProductRow = ({product = {_id: "", productName: "", description: "", price: "", stock: "", isAvailable: "Inactive"}, archive, unarchive}) => {
	return <tr>
		<td>{product._id}</td>
		<td>{product.productName}</td>
		<td>{product.description}</td>
		<td>{product.price}</td>
		<td>{product.stock}</td>
		<td>{product.isAvailable ? "Active" : "Inactive"}</td>
		<td>
			{(product.isAvailable)
				?
				<Button variant="danger" size="sm" onClick={() => archive(product._id, product.productName)}>Archive</Button>
				:
				<>

					<Button variant="success" size="sm" onClick={() => unarchive(product._id, product.productName)}>Unarchive</Button>

					<Button as={Link} to={`/editproduct/${product._id}`} variant="secondary" size="sm" className="m-2">Edit</Button>
				</>}
		</td>
	</tr>;
}
