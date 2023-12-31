import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.scss'
import { loginApi } from '../../api/user';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


interface loginParam {
    username: string,
    password: string,
    token: any,
}
const Login: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values: loginParam) => {
        try {
            const loginrp = await loginApi({ username: values.username, password: values.password });

            if (loginrp && loginrp.token) {
                console.log('Login successful');
                localStorage.setItem('token', loginrp.token)
                console.log('Token:', loginrp.token);
                toast.success('登录成功');
                navigate('/')
            } else {
                console.log('Login failed');
                toast.error('密码或账户错误')
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };


    return (

        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                        Log in
                    </Button>
                    {/* <NavLink to={'/register'} /><span>注册</span>  */}
                    <NavLink to={'/register'}>注册</NavLink>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;