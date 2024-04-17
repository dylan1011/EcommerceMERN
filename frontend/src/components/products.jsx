import { useState, useEffect, React } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
// import productModel from '../../../backend/models/product.model';
import "./products.css";
import Navbar from "./navbar"
import {FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt} from 'react-icons/fa'

const Product = () => {

    const [products, setProducts] = useState([]);
    let admin = localStorage.getItem('admin');
    useEffect(() => {
        const fetchData = async () => { //called after real and virtual dom are executed.calls the actions.
            const response = await axios.get('http://localhost:3000/product/all');
            console.log('products ', response.data.productList);
            console.log("response", response.data.productList);
            setProducts(response.data.productList);
            // .then(product => {setProduct(product.data);console.log(product)})
            // .catch(error => console.log(error))

        }
        fetchData();
    }, []);

    const handleAddCart = async (productId,productImage,productName,productCost) =>{
        console.log(productId,productImage,productName,);
        const token = localStorage.getItem('token');
        let headers = {
          authorization: `Bearer ${token}`
        }
        console.log("product-cart ",headers.authorization)
        let body = {
            productId: productId,
            productName: productName,
            productImage: productImage,
            itemCost: productCost
        }
        let response = await axios.put('http://localhost:3000/addcart/add',body,{headers});
        console.log("add cart ",response.data.updated_cart);
    }

    return (
        <>

        <div className="navbar">
            <Navbar/>
        </div>

        
        {admin=== 'true' && <Link to= '/product/admin/add/'><button className="snipcart-add-item" >Update products</button></Link>}
        <div className="productCards">
        
            {/* <table>
                    <thread>
                        <tr>
                            <th>Name</th><br/>
                            <th>Cost</th>
                        </tr>
                    </thread>
                    <tbody>
                        {products.map((product) =>
                            <tr>
                                <td key={product.productId}></td>
                                <td>Name = {product.productName}</td><br/>
                                <td>Cost = {product.productCost}<br/></td>
                            </tr>
                        )}
                    </tbody>
                </table> */}
              
                {/* {products.map((product) =>
                    <div className="cardDetails">
                        <h2 key={product.productId}></h2>
                        <img src = {product.productImage}/>
                        <h2>Name = {product.productName}</h2>
                        <h2>Cost = {product.productCost}</h2>
                    </div>
                )} */}
                {/* {products.map((product) =>
                    <div className="productList">
                        <div key = {product.productId} className = "productCard">
                            <img src = {product.productImage} alt = "product-img" className='productImage'></img>
                            <FaShoppingCart className={'productCart-cart'}/>
                            <FaRegBookmark className={"productCart_wishlist"}/>
                            <FaFireAlt className = {"productCard_FastSelling"}/>

                            <div className="productCart_content">
                                <h3 className = "productName">{product.productName}</h3>
                                <div className="displaystact_1">
                                    <div className="productPrice">Rs.{product.productCost}</div>
                                </div>
                                <div className="displayStack_2">

                                </div>
                            </div>
                        
                    </div>
                </div>
                )} */}

            <div className='card'>
                
                {products.map((product)=> 
                <div
                key={product.productId}
                className={"product"}
            >
                <img
                    src={product.productImage}
                    alt={`Image of ${product.productImage}`}
                    className={"image-product"}
                />
                <p>Discount {product.productDiscount}%</p>
                <div className="stockdetails">
                    <span>{product.productStock} Left in Stock!</span>
                </div>
                <h3>{product.productName}</h3>
                <p>{product.productDescription}</p>
                <span>Rs. {product.productCost}</span><br/><h1> </h1>
                <div>
                    <button
                        className="snipcart-add-item"
                        data-item-id={product.productId}
                        data-item-image={product.productImage}
                        data-item-name={product.productName}
                        data-item-url="/"
                        data-item-price={product.productCost}
                        onClick={()=> handleAddCart(product.productId,product.productImage,product.productName,product.productCost)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
                )}
                    
            </div>
            </div>
                
        </>
    )
}

export default Product;