import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import { UserContext } from "../Auth/userContext"
import { logout } from "../utils/function"
import { Button } from "antd"


const ProductForm = () => {
    let {id} = useParams()
    let history = useHistory()
    const url = "https://final-project-hadi.vercel.app/api"
    let productObj={
        productName: "", 
        category: "", 
        quantity: 0, 
        image: "", 
        price: 0, 
        color: "", 
        description: "", 
        id: null,
    }
    const [input, setInput] = useState(productObj)
    const [currendId,setCurrentId] = useState(null)
    const {
        userState:[user, setUser]
      } = useContext(UserContext)
    const [confirmLoading, ] = useState(false)

    useEffect(()=>{
        const fecthData = async () => {
            let result = await axios.get(`${url}/product/${id}`)
            let currentProduct = result.data
            setCurrentId(id)
            setInput( 
            {
                id: currentProduct.id,
                productName: currentProduct.productName,
                category: currentProduct.category,
                quantity: currentProduct.quantity,
                image: currentProduct.image,
                price: currentProduct.price,
                color : currentProduct.color ,
                description: currentProduct.description                
            }
        )}
        if (id){
            fecthData()
        }
    },[id])

    const handleSubmit = (event)=>{
        event.preventDefault()
        if (currendId === null) {
            axios.post(`${url}/product`,{
                id: input.id,
                productName: input.productName,
                category: input.category,
                quantity: parseInt(input.quantity),
                image: input.image,
                price: parseInt(input.price),
                color: input.color,
                description: input.description}
                    ,{headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
                let data = res.data
                console.log(data)
                history.push("/product-table")
            }).catch((err) => {
                console.log(err);
                const {status} = err.response.data
                if (status === "Token is Invalid" || status === "Token is Expired") {
                    logout({setUser, status: "expired"})
                }
            } )
            
        } else {
            axios.put(`${url}/product/${currendId}`,{
                id: input.id,
                productName: input.productName,
                category: input.category,
                quantity: input.quantity,
                image: input.image,
                price: input.price,
                color: input.color,
                description: input.description,}, {headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
                let data = res.data 
                console.log(data);
                history.push("/")
            }).catch((err)=>{
                console.log(err.response.data);
                const {status} = err.response.data
                if (status === "Token is Invalid" || status === "Token is Expired") {
                    logout({setUser, status: "expired"})
                }
            })
        }

        setCurrentId(null)
        setInput(productObj)
    }
    const handleChange = (event) => {
        let value = event.target.value
        let title = event.target.name
        console.log(title);
        setInput({
            ...input,
            [title]:value
        })
    }

    const handleBack = ()=>{
        history.push("/") //untuk berpindah ke form
    }
    return(
            <>  
                <div id="form" className="hide-display" style={{ marginTop: 30, padding: 50, backgroundColor: '#001529', textAlign:'center', height: '680px' }}>
                    <h1>{id === undefined ? `Input Product Baru` :`Form Edit ${input.productName}`}</h1>
                    <form onSubmit={handleSubmit}>
                        <table style={{ marginLeft:350 }}>
                            <tr>
                                <td>
                                    <strong style={{ color: "#fff" }}>Name : </strong>
                                </td>
                                <td>
                                    <input style={{ width: 400 }} value={input.productName} onChange={handleChange} name="productName" required /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style={{ color: "#fff" }}>Category :</strong>
                                </td>
                                <td>
                                    <input rows={4} style={{ width: 400 }} value={input.category} onChange={handleChange} name="category" required /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style={{ color: "#fff" }}>Quantity : </strong>
                                </td>
                                <td>
                                    <input type="number" style={{ width: 100 }} value={input.quantity} onChange={handleChange} name="quantity" required /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style={{ color: "#fff" }}>Image : </strong>
                                </td>
                                <td>
                                    <input style={{ width: 400 }} value={input.image} onChange={handleChange} name="image" required /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style={{ color: "#fff" }}>Harga :</strong>
                                </td>
                                <td>
                                     <input type="number" style={{ width: 100 }} value={input.price} onChange={handleChange} name="price" required /><br />                                        
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style={{ color: "#fff" }}>color : </strong>
                                </td>
                                <td>
                                    <input style={{ width: 400 }} value={input.color} onChange={handleChange} name="color" required /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong style={{ color: "#fff" }}>Description : </strong>
                                </td>
                                <td>
                                    <input rows={4} style={{ width: 400 }} value={input.description} onChange={handleChange} name="description" required />
                                </td>
                            </tr>
                        </table>
                        <Button onClick={handleBack} type="danger" block htmlType="submit" style={{ height:50, width:'auto', borderRadius:'7px',marginRight:'50px'}}>
                            Cancel
                        </Button>
                        <Button loading={confirmLoading} type="primary" block htmlType="submit" style={{ background: "#06283D",width:'auto', height:50, borderRadius:'7px', margin:'10px 0'}}>
                            Submit
                        </Button>
                    </form>
                        </div>
            </>

                
    )
}

export default ProductForm