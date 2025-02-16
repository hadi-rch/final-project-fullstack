import React, { useContext } from "react"
import { Button, Form, Input, Menu, Modal } from 'antd';
import {UserContext} from "./userContext"
import axios from "axios"
import Sider from "antd/lib/layout/Sider";
import { Link } from "react-router-dom";

const ChangePassword = () => {
    const {
        userState:[user],
        loadingState:[confirmLoading, setConfirmLoading]
    } = useContext(UserContext)

    const onFinish = (values) => {
        let {old_password, new_password, confirm_password} = values
        setConfirmLoading(true);

      setTimeout(() => {
          setConfirmLoading(false);
          if (confirmLoading === false) {
            axios.post("https://final-project-hadi.vercel.app/api/change-password", {old_password, new_password, confirm_password}, {headers: {
                "Authorization" : `Bearer ${user.token}`
              }}).then(
                (res)=>{
                    Modal.success({
                        title: 'Success',
                        content: "Change Password Success", 
                    });                    
                    setInterval(() => {window.location = '/dashboard'}, 1000)
                }
              ).catch((err)=>{
                console.log(err.response.data.message);
                if (err) {
                    Modal.error({
                        title: 'Wrong Pasword and Email',
                        content: err.response.data.message
                    });
                }
              })
          }
      }, 2000);
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    

    return (
        <>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['3']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                    <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/product-table">Product List</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/change-password">Change Password</Link></Menu.Item>
                    </Menu>
                </Sider>
        <div className="login-area">
            <div className="card-login">
                <h1>
                    Change Password
                </h1>

                <Form
                    name="basic"
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 20,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">

                    <Form.Item
                        label="Old Password"
                        name="old_password"
                        rules={[
                            {
                                type: 'password',
                                required: true,
                                message: 'Please input your Old Password!',
                            }
                        ]} >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="New Password :"
                        name="new_password"
                        rules={[
                            {
                                type: 'password',
                                required: true,
                                message: 'Please input your New Password!',
                            },
                        ]} >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password : "
                        name="confirm_password"
                        rules={[
                            {
                                type: 'password',
                                required: true,
                                message: 'Please input your Confirm Password!',
                            },
                        ]} >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                        offset:0,
                        span: 24,
                        }}
                    >
                        <Button loading={confirmLoading} type="primary" block htmlType="submit" style={{ background: "#58cedc"}}>
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        
        </>
    )
}

export default ChangePassword