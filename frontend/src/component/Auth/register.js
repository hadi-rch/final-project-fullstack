import React, { useContext, } from "react"
import { Button, Form, Input, Modal } from 'antd';
import {UserContext} from "../Auth/userContext"
import axios from "axios"

const Register = () => {
const {
  userState:[, setUser],
  loadingState:[confirmLoading, setConfirmLoading]
} = useContext(UserContext)

const onFinish = (values) => {
      let {username, email, password} = values
      setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            if (confirmLoading === false) {
              axios.post("https://final-project-hadi.vercel.app/api/register", {username, email, password}).then(
                (res)=>{
                  var user = res.data.user
                  var token = res.data.token
                  var currentUser = {username: user.username, email: user.email, token }
                  setUser(currentUser)
                  localStorage.setItem("user", JSON.stringify(currentUser))
                  if (currentUser) {
                    Modal.success({
                      content: `Welcome, ${user.username} Anda Berhasil Register`,
                    });
                  }
                }
              ).catch((err)=>{
                console.log(err)
                Modal.error({
                  title: 'Cannot Register',
                  content: `Register Gagal, User Mungkin telah terdaftar`,
                });
              })
            }
        }, 2000);
      
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };



    function Login() {
      return (
        <div className="card-register">
            <h1>
                Register
            </h1>
            <Form
              name="basic"
              labelCol={{span: 5,}}
              wrapperCol={{span: 16,}}
              initialValues={{remember: true,}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
                
              <Form.Item
                label="Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item

                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input your Correct Email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                offset:2,
                span: 20,
                }}
              >
                <Button loading={confirmLoading} type="primary" block htmlType="submit" style={{background: "#58cedc"}}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
        </div>
      )
    }
    
    return (
        <>
          <div className="register-area">
            <Login/>
          </div>
        </>
    )
}

export default Register
