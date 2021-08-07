import { GooglePlusSquareFilled, LockOutlined, PhoneFilled } from '@ant-design/icons';
import { Button, Form, Input, message, notification } from "antd";
import axios from "axios";
import { useParams } from "react-router";
import URL from "../../api/url";

function ResetPassword(){
    const [form] = Form.useForm();
    const {key} = useParams();
    const handleClickLogin = () => {
        form
            .validateFields()
            .then((values) => {
                values.token = key.slice(4);
                axios.post(`${URL.ULRAPI}resestpassword`,values)
                .then(response => {
                    if(response.status == 200){
                        notification.open({
                            message: 'Thông Báo',
                            description:
                              'Chúc mừng, bạn đã cập nhật mật khẩu thành công!',
                            className: 'custom-class',
                            style: {
                              width: 600,
                            },
                          });
                    }
                })
            })
            .catch((error) => {
                message.error('Có lỗi khi thực hiện thao tác, vui lòng kiểm tra đường link ở Email.');
            });
    }
    return (
        <>
            <div className="form-login">
                <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                    <div className="login-wrap">
                        <div className="login-html">
                            <label htmlFor="tab-1" className="tab">TẠO MẬT KHẨU MỚI</label>
                            <Form
                                form={form}
                                size="middle"
                            >
                                <Form.Item>
                                    <label>Vui lòng nhập thông tin để đặt lại mật khẩu mới</label>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Mật Khẩu"
                                    rules={[{ required: true, message: 'Vui Lòng Nhập Mật Khẩu!' }]}
                                    hasFeedback
                                >
                                    <Input.Password style={{ width: "70%" }} prefix={<LockOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    label="Nhập Lại Mật Khẩu"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui Lòng Nhập Lại Mật Khẩu!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Vui lòng nhập chính xác mật khẩu!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password style={{ width: "70%" }} prefix={<LockOutlined className="site-form-item-icon" />} />

                                </Form.Item>
                                <Form.Item >
                                    <Button onClick={handleClickLogin} type="primary" htmlType="submit">
                                       Đổi Mật Khẩu
                                    </Button>
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

export default ResetPassword