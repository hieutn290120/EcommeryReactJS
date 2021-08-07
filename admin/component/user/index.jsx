import { UploadOutlined } from '@ant-design/icons';
import {
    Button, DatePicker, Form,
    Input,
    message,
    Select,
    Space, Table,
    Upload
} from 'antd';
import axios from 'axios';
import 'moment/locale/zh-cn';
import React, { useEffect, useState } from 'react';
import LoadSpin from '../../../component/spin';
import URL from '../../../api/url'
import { useSelector } from 'react-redux';

const { Dragger } = Upload;

export const Register = (props) => {

    const [form] = Form.useForm();
    const { data } = props;
    const { Option } = Select;
    const [isEventUploadImage, setIsEventUploadImage] = useState();



    const handleClickButtonRegister = (user_id) => {
        var data = new FormData();
        data.append('upload_preset', 'mtdae8pe');
        data.append('file', isEventUploadImage[0]);
        const imgurl = "https://api.cloudinary.com/v1_1/hieu-kun/image/upload";

        form
            .validateFields()
            .then((values) => {
                axios.post(imgurl, data, {
                    //su kien load hinh anh bang %
                    onUploadProgress: ProgressEvent => {
                        Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) == 100 ? message.success('Upload Succes') : <LoadSpin />;
                    }
                })
                    .then(response => {
                        if (response.status == 200) {
                            values.avatar = response.data.url
                            if (typeof (user_id) !== 'undefined') {
                                values.user_id = user_id;
                                fetch(`${URL.ULRAPI}register`, {
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    method: "POST",
                                    body: JSON.stringify(values)
                                }).then(response => response.json())
                                    .then(data => {
                                        message.success('Succesfully');
                                    });
                            }
                        } else {
                            message.error('Error Upload');
                        }
                    })
                    .catch((error) => {
                        console.log('Validate Failed:', error);
                    });
            });
    }

    const handleChangeUploadImage = (event) => {
        setIsEventUploadImage(event);
    }

    return (
        <Form
            name="register"
            scrollToFirstError
            form={form}
            initialValues={data}
        >
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
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please input your Gender!' }]}
            >
                <Select style={{ width: '100%' }} >
                    <Option key="0">Male</Option>
                    <Option key="1">FaMale</Option>
                    <Option key="2">Other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="dob"
                label="DOB"
                rules={[{ required: true, message: 'Please input your date of birth!' }]}
            >
                {data ? '' : <DatePicker
                    format="YYYY-MM-DD"
                />}


            </Form.Item>

            <Form.Item
                label="Upload Avatar"
            >
                <Input
                    type="file"
                    onChange={(e) => handleChangeUploadImage(e.target.files)}
                />

            </Form.Item>

            <Form.Item
            >
                <Button onClick={(e) => handleClickButtonRegister(typeof (data) !== 'undefined' ? data.id : '')} type="primary" shape="round" htmlType="submit">
                    {typeof (data) === 'undefined' ? 'Register' : 'Edit User'}
                </Button>
            </Form.Item>
        </Form>
    );
}
export const User = () => {
    const token = useSelector(state=>state.authen)
    const [DataAPI, setDataAPI] = useState();
    const [isEvent, setIsEvent] = useState();
    const [isDataUser, setIsDataUser] = useState();

    const handleButtonClick = (record, e) => {
        setIsEvent(e.target.outerText)
        setIsDataUser(record);
        if (e.target.outerText === 'Delete') {
            const content = e.target.closest('tr');
            content.remove();
            fetch(`${URL.ULRAPI}remove/user/` + record.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
            }).then(response => response.json())
                .then(data => {
                    message.success('This is a success ');
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                });
        }
    }

    const columns_User = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => handleButtonClick(record, e)} type="primary" shape="round" key="edit_user" >Edit</Button>
                    <Button onClick={(e) => handleButtonClick(record, e)} type="primary" shape="round" key="delete_user">Delete</Button>
                </Space>
            ),
        },

    ];
    useEffect(() => {
        fetch(`${URL.ULRAPI}auth/users`, {
            headers: {
                'Accept': 'Apllication/json',
                Authorization: 'Bearer ' + token,
            },
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                const result = data.filter(x => x.key = 'a' + x.id)
                setDataAPI(result)
                message.success('Succesfully');

            });
    }, []);
    if (isEvent === 'Edit') {
        return (
            <Register key="register" data={isDataUser} />
        )
    }
    return (
        <Table key="table_user" columns={columns_User} dataSource={DataAPI} />
    );
}
