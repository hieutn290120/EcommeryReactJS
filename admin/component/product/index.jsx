import {
    Button,
    Form,
    Input,
    message, Select,
    Space, Table,
} from 'antd';

import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadSpin from '../../../component/spin';
import URL from '../../../api/url'
import { useSelector } from 'react-redux';


export const AddProduct = (props) => {
    const { Data } = props
    const token = useSelector(state => state.authen)
    const { Option,OptGroup } = Select;
    const [form] = Form.useForm();
    const [isEventUploadImage, setIsEventUploadImage] = useState();


    const handleClickButtonProduct = (idprd) => {
        // set url cho upload image
        var data = new FormData();
        data.append('upload_preset', 'mtdae8pe');
        data.append('file', isEventUploadImage[0]);
        const imgurl = "https://api.cloudinary.com/v1_1/hieu-kun/image/upload";

        // Click add product or update product
        form
            .validateFields()
            .then(async (values) => {

                Axios.post(imgurl, data, {
                    //su kien load hinh anh bang %
                    onUploadProgress: ProgressEvent => {
                        Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) == 100 ? message.success('Upload Succes') : <LoadSpin />;
                    }
                })
                    .then(response => {
                        if (response.status == 200) {
                            values.avatar = response.data.url
                            if (typeof (idprd) !== 'undefined') {
                                values.id_prd = idprd;
                            }
                            fetch(`${URL.ULRAPI}auth/createorupdate/product`, {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                method: "POST",
                                body: JSON.stringify({ 'token': token, values })
                            }).then(response => response.json())
                                .then(data => {
                                    message.success('Succesfully');
                                    if (data.status == 200) {
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1500);
                                    }

                                });
                        } else {
                            message.error('Error Upload');
                        }
                    })

            })

            .catch((error) => {
                message.error('Validate Failed:', error);
            });

        // Upload hinh anh 

    }

    const handleChangeUploadImage = (event) => {
        setIsEventUploadImage(event);
    }

    return (
        <Form
            name="addproduct"
            scrollToFirstError
            initialValues={Data}
            form={form}
            key="product"
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Name Product!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Price!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="categories"
                label="Categories"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Categories!',
                    },
                ]}
            >
                <Select>
                    <Option value="Clother">Clothes</Option>
                    <Option value="Electronic">Electronic</Option>
                    <Option value="Module">Module</Option>
                    <Option value="SOURCE">SOURCE</Option>
                    <Option value="TIVI">TiVi</Option>
                    <Option value="AMPLY">AMPLY</Option>
                    <Option value="Laptop">Laptop</Option>
                    <OptGroup label="REMOTE">
                        <Option value="REMOTE_SONY">
                            SONY
                            </Option>
                        <Option value="REMOTE_TCL">
                            TCL
                            </Option>
                        <Option value="REMOTE_SAMSUNG">
                            SAMSUNG
                            </Option>
                        <Option value="REMOTE_LG">
                            LG
                            </Option>
                    </OptGroup>
                </Select>
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input your Description!', max: 3000 }]}
            >
                <TextArea style={{ height: 100 }} />
            </Form.Item>

            <Form.Item
                name="stock"
                label="Stock Status"
                rules={[{ required: true, message: 'Please input your Status!' }]}
            >
                <Select initialvalues="in">
                    <Option value="In Stock">In Stock</Option>
                    <Option value="Out Stock">Out Stock</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="discount"
                label="Discount"
                rules={[{ required: true, message: 'Please input your Discount!' }]}
            >
                <Select initialvalues="0">
                    <Option value="0" >
                        Disabled
                    </Option>
                    <Option value="10">10</Option>
                    <Option value="20">20</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="made"
                label="Made"
                rules={[{ required: true, message: 'Please input your Made!' }]}
            >
                <Select>
                    <Option value="Viet Nam">VietNam</Option>
                    <Option value="Usa">USA</Option>
                    <Option value="China">China</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Upload Avatar"
            >
                <Input
                    type="file"
                    onChange={(e) => handleChangeUploadImage(e.target.files)}
                />

            </Form.Item>
            <Form.Item >
                <Button onClick={(e) => handleClickButtonProduct(typeof (Data) !== 'undefined' ? Data.id : '')} type="primary" shape="round" htmlType="submit">
                    {typeof (Data) == 'undefined' ? 'Add Product' : 'Edit Product'}
                </Button>
            </Form.Item>
        </Form>
    );
}

export const Product = () => {
    const token = useSelector(state => state.authen)

    const columns_Products = [
        {
            title: 'Hình Ảnh',
            dataIndex: 'avatar',
            render: (text, record) => (
                <img src={record.avatar} style={{ 'width': '60px' }} />
            ),
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            responsive: ['sm'],
        },
        {
            title: 'Miêu Tả',
            dataIndex: 'description',
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',

            render: (text, record) => (
                <p>{record.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            ),
        },
        
        {
            title: 'Categories',
            dataIndex: 'categories',
            key: 'categories',
        },
        {
            title: 'Giảm Giá',
            dataIndex: 'discount',
            width: '2%',
            render: (text, record) => (
                <p>{record.discount} %</p>
            ),
        },
        {
            title: 'Stock_Status',
            dataIndex: 'stock_status',
            key: 'stock_status',
        },
        {
            title: 'Created_at',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="small">
                    <Button onClick={(e) => handleButtonClick(record, e)} type="primary" shape="round" key="edit_user" >Sửa</Button>
                    <Button onClick={(e) => handleButtonClick(record, e)} type="primary" shape="round" key="delete_user">X</Button>
                </Space>
            ),
        },

    ];
    const [DataAPI, setDataAPI] = useState();
    const [isDataPrd, setIsDataPrd] = useState();
    const [isEvent, setIsEvent] = useState();
    const handleButtonClick = (dataPrd, e) => {
        setIsEvent(e.target.outerText);
        setIsDataPrd(dataPrd);

        if (e.target.outerText == 'Delete') {
            const content = e.target.closest('tr');

            fetch(`${URL.ULRAPI}auth/remove/product/` + dataPrd.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    content.remove();
                    message.success('Succesfully');
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                });
        }
    }

    useEffect(() => {
        fetch(`${URL.ULRAPI}auth/show/product`, {
            headers: {
                'Accept': 'Apllication/json',
                Authorization: 'Bearer ' + token,
            },
            method: "GET"
        }).then(response => response.json())
            .then(data => {
                const result = data.filter(x => x.key = 'key' + x.id)
                setDataAPI(result)
                setTimeout(() => {
                    message.success('Succesfully');
                }, 500);
            });
    }, []);


    if (isEvent == 'Edit') {
        return (
            <AddProduct Data={isDataPrd} />
        );
    }
    return (
        <Table columns={columns_Products} dataSource={DataAPI} />
    );

}
