import {
    Button, Form,
    Input,
    message, Select
} from 'antd';
import 'moment/locale/zh-cn';
import React from 'react';
import { Label } from 'reactstrap';
import URL from '../../api/url/index';
import './style.scss'

function Register() {
    const [form] = Form.useForm();
    const { Option } = Select;

    const handleClickButtonRegister = (e) => {
        form
            .validateFields()
            .then((values) => {
                fetch(`${URL.ULRAPI}registerCustomer`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(values)
                }).then(response => response.json())
                    .then(data => {
                        message.success('Succesfully');
                        setTimeout(() => {

                        }, 1000);
                    });
            })
            .catch((error) => {
                console.log('Validate Failed:', error);
            });
    }

    return (

        <div className="form-register">
            <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                <div className="register-wrap">
                    <div className="register-html">
                        <Form
                            name="register"
                            scrollToFirstError
                            form={form}
                            style={{marginTop: "-100px"}}
                        >
                            <Label style={{fontSize:"25px", fontWeight:"bold"}}>Đăng Kí</Label>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                label="FullName"
                                tooltip="What do you want others to call you?"
                                rules={[{ required: true, message: 'Please input your fullname!', whitespace: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                            >
                                <Button onClick={(e) => handleClickButtonRegister(e)} type="primary" shape="round" htmlType="submit">
                                    Register
                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register