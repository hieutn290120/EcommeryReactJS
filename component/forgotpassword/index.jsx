import { GooglePlusSquareFilled, PhoneFilled } from '@ant-design/icons';
import { Button, Form, Input, message, notification, Progress, Skeleton } from "antd";
import axios from 'axios';
import { useState } from 'react';
import URL from '../../api/url';

function ForgotPassword() {
    const [form] = Form.useForm();
    const [isProgress, setIsprogress] = useState();
    
    const handleClickLogin = () => {
        form
            .validateFields()
            .then( async (values) => {
               await axios.post(`${URL.ULRAPI}sendmail/checkedresestpass`, values, {
                onUploadProgress: (progressEvent) => {
                    setIsprogress(
                        <Progress
                            strokeColor={{
                                from: '#108ee9',
                                to: '#87d068',
                            }}
                            percent={Math.round((progressEvent.loaded / progressEvent.total) * 100)}
                            />
                            )}
                    })
                    .then(response => {
                        if (response.status == 200) {
                            notification.open({
                                message: 'Thông Báo',
                                description:
                                    'Chúng Tôi Đã Gửi Link Đặt Lại Mật Khẩu Đến Địa Chỉ Email Của Bạn. Bạn Vui Lòng Kiểm Tra Email.',
                                className: 'custom-class',
                                style: {
                                    width: 600,
                                },
                            });
                        } else {
                            notification.open({
                                message: 'Thông Báo',
                                description:
                                    'Đã Xảy Ra Lỗi Vui Lòng Thử Lại',
                                className: 'custom-class',
                                style: {
                                    width: 600,
                                },
                            });
                        }
                    })
            })
            .catch((error) => {
                message.error('Bạn Vui Lòng Điền Đầy Đủ Thông Tin');
            });
    }

    return (
        <>
            <div className="form-login">
                <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                  
                    <div className="login-wrap">
                        <div className="login-html">
                            <label htmlFor="tab-1" className="tab">QUÊN MẬT KHẨU</label>
                            <Form
                                form={form}
                                size="middle"
                            >
                                <Form.Item>
                                    <label>Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu</label>
                                </Form.Item>
                                <Form.Item
                                    name="emailorphone"
                                    rules={[{ required: true, message: 'Vui Lòng Nhập Địa Chỉ Email!' }]}
                                >
                                    <Input placeholder="Nhập Địa Chỉ Email" style={{ width: "70%" }} prefix={<GooglePlusSquareFilled className="site-form-item-icon" />} />
                                </Form.Item>
                                <Form.Item >
                                    <Button onClick={handleClickLogin} type="primary" htmlType="submit">
                                        Gửi Đi
                                        </Button>
                                </Form.Item>
                                <Form.Item>
                                    {isProgress}
                                </Form.Item>
                                <Form.Item>
                                    <a href="tel:0973 564 984"><PhoneFilled />Liên hệ Hotline: (+84) 973564984</a>
                                </Form.Item>
                                <Form.Item>
                                    <a href="mailto:hieutn290120@gmail.com"><GooglePlusSquareFilled style={{ fontSize: '15px' }} />Liên hệ qua Email: hieutn290120@gmail.com</a>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}

export default ForgotPassword