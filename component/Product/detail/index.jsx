import { Badge, Button, Carousel, Col, Descriptions, message, Rate, Row } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import URL from '../../../api/url/index';
import './style.scss';

function DetailProductById() {

    const data = useSelector(state => state.listprd.list);
    const sumprice = (data.price) - (data.price * data.discount / 100);
    const formatGiaTien = sumprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const [isCountRate, setIsCountRate] = useState();
    const [IsDefaultValueRate, setIsDefaultValueRate] = useState(false);
    const user = useSelector(state => state.authen);


    const onChangeCountRate = (e) => {
        setIsCountRate(e);
    }

    const handleSubmitRate = () => {

        const data2 = new FormData();
        data2.append('token', user);
        data2.append('prd_id', data.id);
        data2.append('count_rate', isCountRate);


        axios.post(`${URL.ULRAPI}product/rate/vote`, data2)
            .then(response => {
                setIsDefaultValueRate(!IsDefaultValueRate);
                message.success('Succesfully');
            })
            .catch(function (error) {
                message.error('Vui Long Đăng Nhập Tài Khoản');
            })
    }

    return (
        <>
            <Row>
                <Col className="gutter-row col-ls-12 col-md-12 col-sm-12" >
                    <Carousel >
                        <div>
                            <img src={data.avatar} width="100%" alt="" />
                        </div>
                    </Carousel>
                </Col>
                <Col className="gutter-row col-ls-12 col-md-12 col-sm-6" >
                    <Descriptions size="middle" title="Chi Tiết Sản Phẩm" bordered>
                        <Descriptions.Item span={3} label="Sản Phẩm">{data.name}</Descriptions.Item>

                        <Descriptions.Item label="Trạng Thái" span={3}>
                            <Badge status="processing" text={data.stock_status} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Số Tiền">{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</Descriptions.Item>
                        <Descriptions.Item label="Giảm Giá">{data.discount} %</Descriptions.Item>
                        <Descriptions.Item label="Tổng Số Tiền ">{formatGiaTien} VND</Descriptions.Item>
                        <Descriptions.Item label="Made" span={3}>
                            <h3>Made in {data.made}</h3><br />
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <Rate style={{ 'display': 'block' }} onChange={onChangeCountRate} disabled={IsDefaultValueRate} />
                            <Button type="primary" shape="round" onClick={handleSubmitRate}>Đánh Giá</Button>
                        </Descriptions.Item>
                    </Descriptions>,
                    <Button type="primary" shape="round"><Link to="/">Trang Chủ</Link></Button>
                    <Button type="primary" shape="round"><Link to="/paymain">Đến Trang Thanh Toán</Link></Button>
                </Col>
            </Row>
        </>
    )
}

export default DetailProductById