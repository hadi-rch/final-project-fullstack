import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useHistory} from "react-router-dom"

const HomePage = () => {
    const url = "https://final-project-hadi.vercel.app/"

    const [product,setProduct] = useState([])
    const [productId,setProductID] = useState([])
    const [fetchTrigger, setFetchTrigger] = useState(true)
    let history = useHistory()
    
    useEffect(()=>{
        const fecthData = async () => {
           
            let resultProduct = await axios.get(`${url}api/product`) 
            let dataProduct = resultProduct.data
            setProduct(dataProduct.map((itemProduct) =>{
                return {
                    id: itemProduct.id,
                    productName: itemProduct.productName,
                    category: itemProduct.category, 
                    quantity: itemProduct.quantity,
                    image: itemProduct.image,
                    price: itemProduct.price,
                    color: itemProduct.color,
                    description: itemProduct.description
                    }}
                ))
                    //Fetch By ID
                    axios.get(`${url}/product`).then((res) => {
                        let { data } = res
                        setProductID(data)
                    })
            }
            setFetchTrigger(false)
        if (fetchTrigger) {
            fecthData()
            
        }
    },[fetchTrigger])

    return (
        <>
        <div className="container">
                <div className="container-card">
                    {product.map((item, index) => {
                        return (
                            <div key={index} className="card">
                            <Link to={`product/${item.id}`} key={index}>
                                <div className="card-img">
                                    <img src={item.image} alt="img-card" />
                                </div>
                                <div className="card-info">
                                    <h3>
                                        {item.productName}
                                    </h3>
                                    <div className="card-price">
                                        <span>{item.price}</span>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
        </>
    )
}


export default HomePage
