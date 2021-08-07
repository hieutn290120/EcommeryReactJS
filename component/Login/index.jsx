import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import URL from '../../api/url';
import { authLogin } from '../../features/AuthenLogin';
import { authorUser } from '../../features/Author';
import { Quantity } from '../../features/QuantityListCartById';
import DefaulVariable from '../../variable';
import './style.scss';

var isDefaultRememberUser = [];


function Login() {

    const [form] = Form.useForm();
    const variable = DefaulVariable();
    const history = variable.history;

    const handleClickLogin = () => {
        form
            .validateFields()
            .then((values) => {
                axios.post(`${URL.ULRAPI}login`, values)
                    .then(response => {
                        variable.dispatch(authLogin(response.data.token));
                        // Lấy dữ liệu cart để gửi số lượng cart vào action Redux
                        axios.post(`${URL.ULRAPI}product/getdatacart`, { 'token': response.data.token })
                            .then(response => {
                                if (response.data.length > 0) {
                                    variable.dispatch(Quantity(response.data.length));
                                }
                            })
                            .catch((error) => {
                                variable.dispatch(Quantity(""));
                            });
                        if (response.status == 200) {
                            axios.post(`${URL.ULRAPI}roles`, { 'token': response.data.token })
                                .then(response => {
                                    if (response.data == 'Admin') {
                                        variable.dispatch(authorUser(btoa(response.data)));
                                        history.push('/admin/dashboard')
                                    } else {
                                        variable.dispatch(authorUser(btoa(response.data)));
                                        history.push('/')
                                    }
                                })
                        }
                    })
                    .catch((error) => {
                        message.error("Tài Khoản Hoặc Mật Khẩu Sai");
                    });
            })
            .catch((error) => {
                message.error('Bạn Vui Lòng Điền Đầy Đủ Thông Tin');
            });
    }

    const onFinish = (values) => {
        if (values.remember) {
            isDefaultRememberUser = values;
        }
    };

    return (
        <>
            <div className="form-login">
                <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                    <div className="login-wrap">
                        <div className="login-html">
                            <label htmlFor="tab-1" className="tab">Đăng Nhập</label>
                            <Form
                                form={form}
                                size="middle"
                                initialValues={isDefaultRememberUser}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Vui Lòng Nhập Email!' }]}
                                >
                                    <Input style={{ width: "70%" }} prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Vui Lòng Nhập Password!' }]}
                                >
                                    <Input.Password style={{ width: "70%" }} prefix={<LockOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                    <a className="login-form-forgot" href="/forgot-password">
                                        Forgot password
                                    </a>
                                </Form.Item>

                                <Form.Item >
                                    <Button onClick={handleClickLogin} type="primary" htmlType="submit">
                                        Gửi Đi
                                            </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login

