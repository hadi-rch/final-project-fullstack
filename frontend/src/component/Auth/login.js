import React, { useContext } from "react"
import { Button, Form, Input, Modal } from 'antd';
import {UserContext} from "./userContext"
import axios from "axios"
import { Link } from "react-router-dom";
const Login = () => {
    const {
      userState:[, setUser],
      loadingState:[confirmLoading, setConfirmLoading]
    } = useContext(UserContext)

const onFinish = (values) => {
      let {email, password} = values
      setConfirmLoading(true);
      setTimeout(() => {
          setConfirmLoading(false);
          if (confirmLoading === false) {
              axios.post("https://final-project-hadi.vercel.app/api/login", {email, password}).then(
                (res)=>{
                  var user = res.data.user
                  var token = res.data.token
                  var currentUser = {username: user.username, email: user.email, token }
                  setUser(currentUser)
                  console.log(currentUser)
                  localStorage.setItem("user", JSON.stringify(currentUser))
                  if (currentUser) {
                    Modal.success({
                      content: `Welcome, ${user.username} Anda Berhasil Login`,
                    });
                  }
                }
              ).catch((err)=>{
                console.log(err);
                if (err) {
                  Modal.error({
                  title: 'Wrong Pasword and Email',
                  content: 'Please enter your correct Email & Password',
                });
                }
              })
          }
      }, 2000);
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };


    function Login() {
      return (
        <div className="card-login">
            <h1>
                Login
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
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input your Email!',
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
                <Button loading={confirmLoading} type="primary" block htmlType="submit" style={{ background: "#58cedc"}}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Button type="link" block style={{color:"#06283D",fontSize:13}}>
              <Link to="/register">Belum Punya Account?</Link>
            </Button>
        </div>
      )
    }
    

    return (
        <>
        <div className="login-area">
          <Login/>
        </div>
        
        </>
    )
}

export default Login