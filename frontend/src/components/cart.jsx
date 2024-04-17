import React,{useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from './navbar';

const cart = () => {
    const [totalCost,setTotalCost] = useState(0);
    const [count,setCount] = useState(0);
    const [data,setData] = useState([]);
    
    // const [id,setId]= useState('');
    // const cart = useRef([]);
    
    useEffect(()=> {
      const fetchData = async ()=> {
        const token = localStorage.getItem('token');
        let headers = {
          authorization: `Bearer ${token}`
        }
        console.log("cart auth",headers.authorization);
        const response = await axios.get("http://localhost:3000/addcart/usercart",{headers});
        console.log("cart response ",response.data.user_cart_details.items);
        setData(response.data.user_cart_details.items);
        setTotalCost(response.data.user_cart_details.totalCost);
        

      }
        fetchData();
    },[count]);
    
    const handleclick = async (prod_id,quantity)=>{
      setId(prod_id);
      setCount(quantity+1);
      const token = localStorage.getItem('token');
        let headers = {
          authorization: `Bearer ${token}`
        }
      console.log(prod_id,quantity+1);
      let body ={
        productId: prod_id,
        quantity: quantity+1
      }
      let response = await axios.put('http://localhost:3000/addcart/',body,{headers});
      console.log("updated cart", response.data.updated_cart);
    }

    const handleclickrem = async (prod_id) => {
        const token = localStorage.getItem('token');
        let headers = {
          authorization:` Bearer ${token}`
        }
        let response = await axios.put('http://localhost:3000/addcart/remove',{productId: prod_id},{headers});
        console.log("updated cart", response.data.updated_cart);
        location.reload();
    }
    
    const handleclickmin = async (prod_id,quantity)=>{
      setId(prod_id);
      setCount(quantity-1);
      const token = localStorage.getItem('token');
        let headers = {
          authorization:` Bearer ${token}`
        }
      console.log(prod_id,quantity+1);
      let body ={
        productId: prod_id,
        quantity: quantity-1
      }
      let response = await axios.put('http://localhost:3000/addcart/',body,{headers});
      console.log("updated cart", response.data.updated_cart);

    }

  return (
    <>
    <div className="navbar">
        <Navbar/>
    </div>
    
    {/* // <div>
    //   <h1>Cart</h1>
    //   <p>{`Items in cart: ${data.length}`}</p>
    //   {data.map((product)=> <li key={product.productId}> <button onClick={()=>handleclickmin(product.productId,product.quantity)}>-</button>
    //     {product.productName} - {product.quantity} 
    //     <button onClick={()=>handleclick(product.productId,product.quantity)}>+</button>
    //   </li>)}
    //   <p>{`Total Cost of items is ${totalCost}`}</p>
    // </div> */}

<div className="checkCards">
    
<div className="checkoutDetails">
<p>{`Items in cart: ${data.length}`}</p>
</div>
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
            
              {/* {data.map((product) =>
                  <div className="cardDetails">
                      <h2 key={product.productId}></h2>
                      <img src = {product.productImage}/>
                      <h2>Name = {product.productName}</h2>
                      <h2>Cost = {product.productCost}</h2>
                  </div>
              )} */}
              {/* {data.map((product) =>
                  <div className="productList">
                      <div key = {product.productId} className = "productCard">
                          <img src = {product.productImage} alt = "product-img" className='productImage'></img>
                          <FaShoppingCart className={'productCart-cart'}/>
                          <FaRegBookmark className={"productCart_wishlist"}/>
                          <FaFireAlt className = {"productCard_FastSelling"}/>

                          <div className="productCart_content">
                              <h3 className = "productName">{product.productName}</h3>
                              <div className="displaystact_1">
                                  <div className="productPrice">Rs.{product.totalCost}</div>
                              </div>
                              <div className="displayStack_2">

                              </div>
                          </div>
                      
                  </div>
              </div>
              )} */}

          <div className='checkout'>
              {data.map((product)=> 
              <div key={product.productId} className={"check"}>
              {/* <p>Discount {product.productDiscount}%</p> */}
              <div className="stockdetails">
                  {/* <span>{product.productStock} Left in Stock!</span> */}
              </div>
              <h3>{product.productName}. </h3>
              {/* <p>{product.productDescription}</p> */}
              <span>Cost : {product.itemCost}. net qt</span><br/><h1> </h1>
              <div>
                  {/* <button
                      className="snipcart-add-item"
                      data-item-id={product.productId}
                      data-item-image={product.productImage}
                      data-item-name={product.productName}
                      data-item-url="/"
                      data-item-price={product.productCost}
                      onClick={()=> handleAddCart(product.productId,product.productImage,product.productName)}>
                      Add to Cart
                  </button> */}
                  <button className='snipcart-add-item' 
                  data-item-id={product.productId}
                  data-item-image={product.productImage}
                  data-item-name={product.productName}
                  data-item-url="/"
                  data-item-price={totalCost} 
                  onClick={()=>handleclickmin(product.productId,product.quantity)}>-</button>
                    
                  Quantity : {product.quantity} 
                  
                  <button className='snipcart-add-item' 
                  data-item-id={product.productId}
                  data-item-image={product.productImage}
                  data-item-name={product.productName}
                  data-item-url="/"
                  data-item-price={product.totalCost}
                  onClick={()=>handleclick(product.productId,product.quantity)}>+</button>
              </div>
              <button className='snipcart-remove-item' 
                  data-item-id={product.productId}
                  data-item-image={product.productImage}
                  data-item-name={product.productName}
                  data-item-url="/"
                  data-item-price={totalCost} 
                  onClick={()=>handleclickrem(product.productId)}><FontAwesomeIcon icon={faTrash} /></button>
          </div>
              )}
                  
          </div>
          <div className="checkoutDetails">
          <p>{`Total : Rs. ${totalCost}`}</p>
          </div>
</div>
</>
  )
}

export default cart
