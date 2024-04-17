import { useState, useEffect, React } from 'react'
import axios from 'axios';
// import { response } from '../../../backend/app';
// import productModel from '../../../backend/models/product.model';
// import "../App.css";
// import router from '../../../backend/routes/product';
import "./updateproduct.css"
import Navbar from "./navbar"

const UpdateProduct = () => {
    const [data,setData] = useState([]);
    const [productName,setProductName] = useState('');
    const [productCost,setProductCost] = useState(0);
    const [productDescription,setProductDescription] = useState('');
    const [productImage,setProductImage] = useState('');
    const [productDiscount, setProductDiscount] = useState(0);
    const [productStock, setProductStock] = useState(0);
    const [productId, setProductId] = useState(0);
    const [products, setProducts] = useState([]);
    const [editId, setEditId] = useState([]);
    const [updateId, setUpdateId] = useState([]);
    
    const [updateproductName,updatesetProductName] = useState('');
    const [updateproductCost,updatesetProductCost] = useState(0);
    const [updateproductDescription,updatesetProductDescription] = useState('');
    const [updateproductImage,updatesetProductImage] = useState('');
    const [updateproductDiscount, updatesetProductDiscount] = useState(0);
    const [updateproductId, updatesetProductId] = useState(0);
    const [updateproductStock, updatesetProductStock] = useState(0);


    useEffect (() => {
        const fetchData = async () => {
            // const response = await axios.get('http://localhost:3000/product/all')
            const response = await axios.get('http://localhost:3000/product/admin/update');
            console.log('products ', response.data.productList);
            console.log("response", response.data.productList);
            setProducts(response.data.productList);
            // console.log("response", response.data.updatedProducts);
        }
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const productId = data[data.length -1].productId + 1;
        let body = {
            productId : productId, 
            productName : productName, 
            productCost: productCost, 
            productDescription : productDescription, 
            productImage : productImage, 
            productDiscount : productDiscount,
            productStock : productStock
        }
        
        let response = await axios.post('http://localhost:3000/product/admin/update', body)
        console.log(response.data.productList);
        setData(response.data.productList);
        location.reload();
    }

    const handleEdit = async (productId) => {
        await axios.get('http://localhost:3000/product/admin/update')
        .then(response => {
            console.log(response);
            updatesetProductId(response.data.productId)
            updatesetProductName(response.data.productName)
            updatesetProductCost(response.data.productCost)
            updatesetProductImage(response.data.productImage)
            updatesetProductDiscount(response.data.productDiscount)
            updatesetProductDescription(response.data.productDescription)
            updatesetProductStock(response.data.productStock)


        })
        
        setEditId(productId)
    };

    const handleUpdate = async () => {
        let response = await axios.put("http://localhost:3000/product/admin/update/", {productId : editId, productName : updateproductName, productCost : updateproductCost, productDescription : updateproductDescription, productImage : updateproductImage, productDiscount : updateproductDiscount, productStock : productStock} )
        console.log(response);
        location.reload();
        // setEditId();

    }
    // const handleUpdate = async () => {
    //     let body = {
    //         productId : editId, productName, productCost, productDescription, productImage, productDiscount
    //     }
    //     response = await axios.put('http://localhost:3000/product/admin/update', body)
    //     console.log(response);
    //     location.reload();
    //     setEditId(response.editId.updatedProducts);
    // }

    return (
        <>
        <div className="navbar">
            <Navbar/>
        </div>

        <div className='form'><br/>
                <form onSubmit={handleSubmit} className='form'>
                    <input type = "text" placeholder='Enter Product ID' onChange={e => setProductId(e.target.value)}/>
                    <input type = "text" placeholder='Enter Product Name' onChange={e => setProductName(e.target.value)}/>
                    <input type = "number" placeholder='Enter Product Cost' onChange={e => setProductCost(e.target.value)}/>
                    <input type = "text" placeholder='Enter Product Image url' onChange={e => setProductImage(e.target.value)}/>
                    <input type = "text" placeholder='Enter Product Description' onChange={e => setProductDescription(e.target.value)}/>
                    <input type = "number" placeholder='Enter Product Discount' onChange={e => setProductDiscount(e.target.value)}/>
                    <input type = "number" placeholder='Enter Product Stock' onChange={e => setProductStock(e.target.value)}/>
                    {/* <input type = "text" placeholder='Enter Product Name' onChange={e => setProductName(e.target.value)}/> */}
                    <button>ADD</button>
                </form>
            </div>
            
        <div className="App">
            
            <div className='container'>
                <table>
                    {/* <thread>
                        <tr>
                            <th>Name</th><br/>
                            <th>Cost</th>
                        </tr>
                    </thread> */}
                    <tbody>
                        <tr>
                            <td><p>Product List</p></td>
                            <td><p>Product Id</p></td>
                            <td><p>Name</p></td>
                            <td><p>Cost</p></td>
                            <td><p>Discount</p></td>
                            <td><p>Image</p></td>
                            <td><p>Description</p></td>
                            <td><p>Stock</p></td>
                            <td><p>Action</p></td>
                            


                        </tr>
                        {products.map((product) =>(
                            product.productId === editId ?
                            <tr>
                                
                                <td> key={product.productId} </td>
                                <td><input type = "text" placeholder = {product.productId}  value = {updateproductId} onChange={e => updatesetProductId(e.target.value)}/></td>
                                <td><input type = "text" placeholder = {product.productName} value = {updateproductName} onChange={e => updatesetProductName(e.target.value)}/></td>
                                <td><input type = "text" placeholder = {product.productCost} value = {updateproductCost} onChange={e => updatesetProductCost(e.target.value)}/></td>
                                <td><input type = "text" placeholder = {product.productDiscount} value = {updateproductDiscount} onChange={e => updatesetProductDiscount(e.target.value)}/></td>
                                <td><input type = "text" placeholder = {product.productImage} value = {updateproductImage} onChange={e => updatesetProductImage(e.target.value)}/></td>
                                <td><input type = "text" placeholder = {product.productDescription} value = {updateproductDescription} onChange={e => updatesetProductDescription(e.target.value)}/></td>
                                <td><input type = "text" placeholder = {product.productStock} value = {updateproductStock} onChange={e => updatesetProductStock(e.target.value)}/></td>
                                
                                {/* <td><input type = "text" value = {product.productName}></input></td> */}
                                <td><button onClick={handleUpdate}>Update</button></td>
                            </tr>
                            :
                            
                            <tr>
                                <td key={product._id}></td>
                                <td>ID = {product.productId}</td>
                                <td>Name = {product.productName}</td>
                                <td>Cost = {product.productCost}</td>
                                <td>Discount = {product.productDiscount}</td>
                                <td>Image = {product.productName} Image URL </td>
                                <td>Description = {product.productDescription}</td>
                                <td>Stock = {product.productStock}</td>                    

                                <td>
                                    <button onClick={() => handleEdit(product.productId)} >Edit</button>
                                    <button>delete</button>
                                </td>
                                
                            </tr>
                        
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default UpdateProduct