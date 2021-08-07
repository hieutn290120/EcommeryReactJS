import { Button, Form, Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import URL from '../../api/url';
import './style.css';


function ContactUs() {
    const [form] = Form.useForm();
    const user = useSelector(state => state.authen);

    const handleClickFeedback = () => {
        form
            .validateFields()
            .then((values) => {
                if (user) {

                    values.token = user;

                    axios.post(`${URL.ULRAPI}contactus`, values)
                        .then(response => {
                            if (response.status == 200) {
                                message.success('Cảm ơn bạn đã đóng góp ý kiến cho chúng tôi.')
                            }
                        });
                } else {
                    message.error('Bạn Vui Lòng Đăng Nhập')
                }

            })
            .catch((error) => {
                message.error('Bạn Vui Lòng Điền Đầy Đủ Thông Tin');
            });
    }

    return (
        <>
            <div>
                <div className="">
                    <div className="col-sm-12 col-md-12">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.3164554244927!2d108.2281132143857!3d16.093704043057517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142181ba2a30bf1%3A0xc90187da035090c1!2zODcgTMOqIEPhuqNuaCBUdcOibiwgTuG6oWkgSGnDqm4gxJDDtG5nLCBTxqFuIFRyw6AsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmlldG5hbQ!5e1!3m2!1sen!2s!4v1617780727702!5m2!1sen!2s" width="100%" height="400px" style={{ border: 0 }} allowFullScreen loading="lazy" />
                    </div>

                    <div className="text-form">
                        <h2 className="text-uppercase mt-3 font-weight-bold">Đóng Góp Ý Kiến Với Chúng Tôi</h2>
                        <Form
                            form={form}
                            width="100%"
                        >
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
                                label="Ý Kiến Của Bạn"
                                name="description"
                                rules={[{ required: true, message: 'Vui lòng nhập những đóng góp của bạn!' }]}
                            >
                                <TextArea
                                    rows={7}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={handleClickFeedback} type="primary" htmlType="submit">
                                    Gửi Đi
                            </Button>
                            </Form.Item>

                        </Form>
                    </div>


                </div>
            </div>
        </>
    );
}
export default ContactUs;
