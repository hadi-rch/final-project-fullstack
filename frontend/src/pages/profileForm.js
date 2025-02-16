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
            let result = await axios.get(`${url}/profile`)
            let currentProduct = result.data
            setCurrentId(id)
            setInput( 
            {
                id: currentProduct.id,
                address: currentProduct.address,
                firstName: currentProduct.firstName,
                lastName: currentProduct.lastName,
                city: currentProduct.city,
                birth_date: currentProduct.birth_date               
            }
        )}
        if (id){
            fecthData()
        }
    },[id])

    const handleSubmit = (event)=>{
        event.preventDefault()

            axios.put(`${url}/profile`,{
                id: input.id,
                address: input.address,
                firstName: input.firstName,
                lastName: input.lastName,
                city: input.city,
                birth_date: input.birth_date           
            }
                    ,{headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
                let data = res.data
                console.log(data)
                history.push("/product")
            }).catch((err) => {
                console.log(err);
                const {status} = err.response.data
                if (status === "Token is Invalid" || status === "Token is Expired") {
                    logout({setUser, status: "expired"})
                }
            } )

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
                        <table>
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