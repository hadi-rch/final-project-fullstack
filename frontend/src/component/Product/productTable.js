import { Modal ,Layout, Button, Menu} from 'antd';
import {VideoCameraAddOutlined, EditOutlined , DeleteOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { UserContext } from '../Auth/userContext';
const { Sider } = Layout;

const ProductsTable = () => {
    const url = "https://final-project-hadi.vercel.app/api"
    let history = useHistory()
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
    const [product,setProduct] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(true)

    const {
        userState:[user, ],
        loadingState:[confirmLoading, setConfirmLoading]
      } = useContext(UserContext)
      const [open, setOpen] = useState(false);

    useEffect(()=>{
        const fecthData = async () => {
            let resultProduct = await axios.get(`${url}/product`) 
            let dataProduct = resultProduct.data
            console.log(dataProduct);
            setProduct(dataProduct);
            setProduct(dataProduct.map((itemProduct) =>{
                return {
                    id: itemProduct.id,
                    productName: itemProduct.productName,
                    category: itemProduct.category,
                    quantity: itemProduct.quantity,
                    image: itemProduct.image,
                    price: itemProduct.price,
                    color : itemProduct.color ,
                    description: itemProduct.description     
                    }}
                ))
            }
            setFetchTrigger(false)
        if (fetchTrigger) {
            fecthData()
            
        }
    },[fetchTrigger])
    
    const addNewProduct = () => {
        history.push("/product-form")
    }

    const handleEdit = async (id) => {
        let idProduct = Number(id)
        history.push(`/product-form/${idProduct}/edit`)
    }

    const showModal = (event) => {
        setOpen(true);
      };
    
    const handleOk = (id) => {
      let idProduct = (id)
      console.log(`Ini Id ${idProduct}`);
      setConfirmLoading(true);
      setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      if (confirmLoading === false) {
            axios.delete(`${url}/product/${idProduct}`, {headers: {"Authorization" : "Bearer "+ user.token}}).then((res)=>{
            setFetchTrigger(true)
        }).catch((error)=>{
            console.log(error);
        })
        }
    }, 2000);
      };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };
      function Tabel (props) {
        return(
            <tbody>
                    {props.product.map((item, index) => {
                        return (
                           <tr key={index}>
                               <td>{index+1}</td>
                               <td>
                                <div className='preview-list'>
                                    <img src={item.image} alt="preview-image"/>
                                </div>
                               </td>
                               <td>{item.productName}</td>
                               <td>{item.category}</td>
                               <td>{item.quantity}</td>
                               <td>{item.price}</td>
                               <td>{item.color}</td>
                               <td>{item.description}</td>
                               <td>
                               <Button
                                    onClick={()=>{handleEdit(item.id)}}
                                    icon={<EditOutlined />}
                                    style={{background: "#FFCE45",color:"#06283D",marginRight:10,borderRadius:"4px"}}
                                    >
                                      Edit
                                </Button>
                                <Button
                                type="danger"
                                onClick={showModal}
                                value={item.id}
                                icon={<DeleteOutlined />}
                                style={{color:"white", borderRadius:"4px"}}
                                >
                                  Delete
                                </Button>
                                <Modal
                                  title="Delete This Product?"
                                  open={open}
                                  onOk={()=>{handleOk(item.id)}}
                                  confirmLoading={confirmLoading}
                                  onCancel={handleCancel}
                                >
                                  <p>Menghapus Product Dari Data</p>
                                </Modal>
                               </td>
                           </tr>
                        )
                    })
                    }
                </tbody>
        )
      }

    return(
    <div>
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/product-table">Product List</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/change-password">Change Password</Link></Menu.Item>
            </Menu>
        </Sider>
          
        <div className='title-movielist'>
        </div>
        <Button
            type="default"
            icon={<VideoCameraAddOutlined />}
            onClick={addNewProduct}
            style={{
                left:540,
                marginBottom:20,
                background: "#00C897",
                color:"#06283D",
                marginRight:10,
                borderRadius:"4px"}}
            >
              Add Product
        </Button>
        <table className="custom-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Preview</th>
                        <th>Nama Product</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th>Aksi </th>
                        {console.log({product})}
                    </tr>
                </thead>
                <Tabel product={product} />
            </table>
        </div>
    )
}

export default ProductsTable