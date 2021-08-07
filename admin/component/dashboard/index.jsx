import { FileAddOutlined, LaptopOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Error404 from '../../../errorr/404';
import { authLogout } from '../../../features/AuthenLogin';
import { authorLogout } from '../../../features/Author/index';
import { AddProduct, Product } from '../product';
import { Register, User } from '../user';
import './style.scss';
import {browserHistory} from "react-router";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;


function DashBoard(props) {
    const [isKeyMenu, setIsKeyMenu] = useState();
    const [isContent, setIsContent] = useState();
    const {Authen} = props;
    const history = useHistory();

    const action1 = authorLogout();
    const action2 = authLogout();

    const dispatch = useDispatch();
    const handleMenuClick = (e) => {
        setIsKeyMenu(e.key)
    }

    useEffect( () =>{
        if(Authen == 'Admin'){
            if( isKeyMenu === 'add_user' ){
                setIsContent(<Register  />)
            }
            if(isKeyMenu === 'add_product'){
                setIsContent(<AddProduct />)
            }
            if(isKeyMenu === 'all_user'){
                setIsContent(<User/>)
            }
            if(isKeyMenu === 'all_product'){
                setIsContent(<Product/>)
            }
            if( isKeyMenu === 'logout' ){
                history.go(0)
                browserHistory.push("/login");  
                dispatch(action1);
                dispatch(action2);
            }
        }else{
            setIsContent(<Error404 />)
        }
    },[isKeyMenu])

   
    return (
        <div key="dashboard">
            <Layout >
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="white" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="sub0" icon={<UserOutlined />} key="1">DASHBOARD</Menu.Item>
                        <Menu.Item key="sub1" key={Authen == 'Admin' ? 'logout' : 'login'} onClick={handleMenuClick} icon={ Authen == 'Admin' ? <LoginOutlined /> : <UserOutlined />}  style={{'float':'right'}}>
                         {Authen == 'Admin' ? 'Logout' : 'Login'}
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            // defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="User Info">
                                <Menu.Item onClick={handleMenuClick} key="all_user" icon={<UserOutlined />} >All User</Menu.Item>
                                <Menu.Item onClick={handleMenuClick} key="add_user" icon={<FileAddOutlined />} >Add User</Menu.Item>

                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Product Info">
                                <Menu.Item onClick={handleMenuClick} key="all_product" icon={<LaptopOutlined />}>All Product</Menu.Item>
                                <Menu.Item onClick={handleMenuClick} key="add_product" icon={<FileAddOutlined />}>Add Product</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0' }}>
                        <Content
                            className="site-layout-background"
                            key="content1"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                          {isContent}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>,
        </div>
    )
}

export default DashBoard