import { LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import {  Menu } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Logo from '../../constants/logo';
import { authLogout } from '../../features/AuthenLogin';
import { Quantity } from '../../features/QuantityListCartById';
import DefaulVariable from '../../variable';
import CartShoping from '../cartshopping';
import SearchComponent from '../Search';
import './Header.scss';


function ComponentHeader() {

  const variable = DefaulVariable();
  const history = variable.history;


  const handleLogout = () => {
    variable.dispatch(authLogout());
    variable.dispatch(Quantity(''))
    history.push('/login')
  }

  const handleLogin = () => {
    history.push('/login')
  }
  const handleRegister = () => {
    history.push('/register')
  }


  return (
    <>
    <div>
      <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
      <Menu theme="white" mode="horizontal" >
          <Menu.Item key="logo"><a href="/"><img src={Logo.LOGO} width="100px" height="50px" alt="" /></a></Menu.Item>
          <Menu.Item key="1"><a href="/">Trang Chủ</a></Menu.Item>
          <Menu.Item key="2"><a href="/product">Sản Phẩm</a></Menu.Item>
          <Menu.Item key="3"><a href="/contactus">Liên Hệ Chúng Tôi</a></Menu.Item>

          <CartShoping />

          <Menu.Item key={variable.token ? 'logout' : 'login'} onClick={variable.token  ? handleLogout : handleLogin} icon={variable.token  ? <LoginOutlined /> : <UserOutlined />} style={{ 'float': 'right' }} >
             {variable.token  ? 'Đăng Xuất' : 'Đăng Nhập'}
          </Menu.Item>
          <Menu.Item icon={variable.token !== null ? '' : <UserAddOutlined />} style={{ float: 'right' }} onClick={handleRegister}>
            {variable.token  ? '' : 'Đăng Kí'}
          </Menu.Item>
          <Menu.Item style={{ float: 'right' }} >
            <SearchComponent />
          </Menu.Item>
        </Menu>
      </div>
    </div>
      
    </>
  );
}

export default ComponentHeader;