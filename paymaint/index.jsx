import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Popconfirm, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Label } from 'reactstrap';
import URL from '../api/url';
import { DownQuantity } from '../features/QuantityListCartById';
import DefaulVariable from '../variable';
import './style.scss';


function Paymain() {

    const variable = DefaulVariable();


    const [dataListCart, setDataListCart] = useState();
    const [isUser, setIsUser] = useState();
    const [isTheHtml, setTheHtml] = useState();
    const [form] = Form.useForm();

    //Efect load 1 lan

    useEffect(() => {
        //reder lis cart by api
        fetch(`${URL.ULRAPI}product/getdatacartanduser`, {
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ 'token': variable.token })
        }).then(response => response.json())
            .then(data => {
                if (data[1]) {
                    const result = data[1].filter(x => x.key = 'a' + x.id)
                    setDataListCart(result)
                    setIsUser(data[0]);
                }
            });
    }, [])

    // set the hmtl de xoa item
    const handleClickDeletegetElement = (e) => {
        setTheHtml(e);
    }

    //Xoa San Pham

    const handleClickDelete = (e, id) => {

        const data = new FormData();
        data.append('token', variable.token);

        axios.delete(`${URL.ULRAPI}product/deletecart/` + id, {
            headers: {
                Authorization: 'Bearer ' + variable.token,
            },
            data: data
        })
            .then(response => {
                isTheHtml.target.closest('tr').remove();
                message.success('Xóa sản phẩm thành công !');
                variable.dispatch(DownQuantity());
            })
            .catch(error => message.error(error));
    }

    const Oncancel = () => {
        message.success('Cảm Ơn Lựa Chọn Của Bạn!');
    }

    // setColumnt
    const columns = [
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
            title: 'Giảm Giá',
            dataIndex: 'discount',
            width: '2%',
            render: (text, record) => (
                <p>{record.discount} %</p>
            ),
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            width: '2%',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',

            render: (text, record) => (
                <p>{(record.quantity * ((record.price) - (record.price * record.discount / 100))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            ),
        },
        {
            dataIndex: '',
            key: 'x',

            render: (text, record) =>
                <Popconfirm
                    title="Bạn Có Thực Sự Muốn Xóa?"
                    onConfirm={(e) => handleClickDelete(e, record.id)}
                    onCancel={Oncancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <a onClick={(e) => handleClickDeletegetElement(e)}>Xóa</a>
                </Popconfirm>
        },
    ];

    // xu ly submit form Pay

    const handleClickPayAndClaim = () => {
        form
            .validateFields()
            .then((values) => {
                values.token = variable.token;
                axios.post(`${URL.ULRAPI}sendmail`, values)
                    .then(response => {
                        if (response.status == 200) {
                            message.success('Bạn Vui Lòng Kiểm Tra Email. Chúng Tôi Đã Gửi Chi Tiết Đơn Hàng Đến Địa Chỉ Email Của Bạn!')
                        }
                    });
            })
            .catch((error) => {
                message.error('Bạn Vui Lòng Điền Thông Tin Địa Chỉ');
            });
    }


    return (
        <>
            <div className="paymain-class">
                <h2>BIỂU MẪU THANH TOÁN ĐƠN HÀNG</h2>
                <div className="">
                    <div className="col-sm-12 col-md-12 col-xs-12">
                        <Form
                            initialValues={isUser}
                            form={form}
                        >
                            <Form.Item>
                                <Title>THÔNG TIN ĐỊA CHỈ</Title>
                            </Form.Item>
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                            >
                                <Input
                                />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                            >
                                <Input
                                />
                            </Form.Item>
                            <Form.Item
                                label="Địa Chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}
                            >
                                <Input
                                />
                            </Form.Item>
                            <Form.Item
                                label="Điện Thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
                            >
                                <Input
                                />
                            </Form.Item>
                            <Form.Item
                                hidden={true}
                                name="total"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Title>THANH TOÁN <ShoppingCartOutlined /></Title>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xs-12">
                        <Table
                            columns={columns}
                            dataSource={dataListCart}
                            pagination={false}
                            bordered
                            summary={pageData => {
                                let totalBorrow = 0;
                                pageData.forEach(({ price, discount, quantity }) => {
                                    totalBorrow += quantity * (price - (price * discount / 100));
                                });
                                return (
                                    <>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell colSpan={6}>
                                                Tổng Tiền
                                                    </Table.Summary.Cell>
                                            <Table.Summary.Cell>
                                                <Label type="danger">{totalBorrow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</Label>
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell>
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </>
                                );
                            }}
                        />
                        <Button onClick={handleClickPayAndClaim} type="primary" htmlType="submit">
                            Gửi Đi
                        </Button>

                    </div>
                </div>
            </div>

        </>
    )

}

export default Paymain;