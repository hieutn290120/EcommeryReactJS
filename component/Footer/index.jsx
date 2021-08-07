import React from 'react';
import Logo from '../../constants/logo';
import './style.scss';
import { FacebookFilled, InstagramFilled, HomeFilled, GooglePlusSquareFilled, PhoneFilled   } from '@ant-design/icons';


function ComponentFooter() {
    return (
        <div className="fotter-div">
            <div className="row">
                <div className="col-md-3 col-sm-12 col-xs-12">
                    <div>
                        <div>
                            <img src={Logo.LOGO} alt="logo" width="100%" />
                        </div>

                    </div>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                    <h5 className="heading">KẾT NỐI VỚI CHÚNG THÔI</h5>
                    <ul className="footer-ul">
                        <li className="followus_social"><a href="https://www.facebook.com/maxkiu.hieuho/"><FacebookFilled spin style={{ fontSize: '40px'}} /></a></li>
                        <li className="followus_social"><a href="https://www.instagram.com/ishieu.kun/"><InstagramFilled spin style={{ fontSize: '40px'}} /></a></li>
                    </ul>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                    <h5 className="heading">HÌNH THỨC THANH TOÁN</h5>
                    <ul className="footer-ul">
                        <li><a>CHUYỂN KHOẢN</a></li>
                        <li><b>Ngân hàng BIDV chi nhánh Đà Nẵng</b></li>
                        <li><b>Chủ tài khoản:</b> TRẦN NHÂN HIẾU</li>
                        <li><b>Số tài khoản: </b>56510000226803</li>
                    </ul>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                    <h5 className="heading">CHÍNH SÁCH BÁN HÀNG</h5>
                    <ul className="footer-ul">
                        <li><a>THANH TOÁN</a></li>
                        <li><a>CHÍNH SÁCH ĐỔI TRẢ</a></li>
                        <li><a>HƯỚNG DẪN MUA HÀNG</a></li>
                    </ul>
                </div>

                <div className="col-md-8 col-sm-12 col-xs-12">
                    <div className="divider mb-4">
                    </div>
                </div>
                
                <div className="col-md-8 col-sm-12 col-xs-12">
                    <h5 className="heading">Thông Tin Liên Hệ</h5>
                    <ul className="footer-ul">
                        <li><a href="tel:0973 564 984"> <PhoneFilled />Phone: (+84) 973564984</a></li>
                        <li><a href="mailto:hieutn290120@gmail.com"><GooglePlusSquareFilled style={{ fontSize: '15px'}}/>Email: hieutn290120@gmail.com</a></li>
                        <li><a><HomeFilled style={{ fontSize: '15px'}}/>Địa chỉ 1: Vinh Hiền, Phú Lộc, Thừa Thiên Huế</a></li> 
                        <li><a><HomeFilled style={{ fontSize: '15px'}}/>Địa chỉ 2: 87 Lê Cảnh Tuân, phường Nại Hiên Đông, quận Sơn Trà, thành phố Đà nẵng</a></li> 
                    </ul>
                </div>
            </div>
            <div className="divider mb-4">

            </div>
            <div className="row" style={{ fontSize: 10 }}>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div>
                        <p><i className="fa fa-copyright" /> 2021 Desgin by Tran Nhan Hieu</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ComponentFooter