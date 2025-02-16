import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { UserContext } from '../Auth/userContext';
import { logout } from '../utils/function';

const DetailProduct = () => {
    let { slug } = useParams()
    let history = useHistory()
    const [product, setProduct] = useState({})
    const {
        userState:[user, setUser]
      } = useContext(UserContext)
    const url = "https://final-project-hadi.vercel.app/api"
    useEffect(() => {

        if (slug !== undefined) {
    
            axios.get(`${url}/product/${slug}`)
                .then((res) => {
                    let { data } = res
                    setProduct(data)
                    console.log(data)
                    console.log("tes")
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (event)=>{
        event.preventDefault()
            axios.post(`${url}/transaction-item`,{
                quantity: 1,
                products_id: product.id,
            }
                    ,{headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
                let data = res.data
                console.log(data)
                console.log("aaaaaaaaaaaaaaa")
                history.push("/orders") 
            }).catch((err) => {
                console.log(err);
                const {status} = err.response.data
                if (status === "Token is Invalid" || status === "Token is Expired") {
                    logout({setUser, status: "expired"})
                }
            } )
    }
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
      const exist = cartItems.find((x) => x.id === product.id);
      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    };
    const onRemove = (product) => {
      const exist = cartItems.find((x) => x.id === product.id);
      if (exist.quantity === 1) {
        setCartItems(cartItems.filter((x) => x.id !== product.id));
      } else {
        setCartItems(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
          )
        );
      }
    };

    return (
        <>
            <div className='wrap-1'>
            <div className="container-1">
                <div className="image-1">
                    <img src={product.image} alt={product.productName}/>
                </div>
                <div className="text-1">
                  <div className="judul">{product.productName}</div>
                    {/* <p>qq{product.productName}</p> */}
                    <p>Price: {product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Stock: {product.quantity}</p>
                    <p>Color: {product.color}</p>
                    <p>Description: {product.description}</p>

                    <Button onSubmit={handleSubmit} type="primary"><Link to='/orders'>Beli</Link></Button>
                    <Button onSubmit={handleSubmit} type="primary"><Link to='/orders'>add to Cart</Link></Button><br/>
                    {/* <Button type="primary"><Link to='/'>Ke halaman utama</Link></Button> */}
                </div>
            </div>
            </div>
        </>
    )
};

export default DetailProduct;