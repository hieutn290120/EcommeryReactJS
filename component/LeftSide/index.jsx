import { FundProjectionScreenOutlined, HddOutlined, NotificationOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useHistory } from 'react-router';
import './style.scss';
const { SubMenu } = Menu;

function LeftSide() {
  const history = useHistory();

  //Redirect router 

  const handleClick = (e) => {
    if (e.key == 'module_amthanh') {
      history.push('/product/module_amthanh');
    }
    if (e.key == 'module_cambien') {
      history.push('/product/module_cambien');
    }
    if (e.key == 'module_machnap') {
      history.push('/product/module_machnap');
    }
    if (e.key == 'tivi_tcl') {
      history.push('/product/tivitcl');
    }
    if (e.key == 'tivi_sony') {
      history.push('/product/tivisony');
    }
    if (e.key == 'tivi_lg') {
      history.push('/product/tivilg');
    }
    if (e.key == 'tivi_samsung') {
      history.push('/product/tivisamsung');
    }
    if (e.key == 'remote_sony') {
      history.push('/product/remotesony');
    }
    if (e.key == 'remote_tcl') {
      history.push('/product/remotetcl');
    }
    if (e.key == 'remote_samsung') {
      history.push('/product/remotesamsung');
    }
    if (e.key == 'remote_lg') {
      history.push('/product/remotelg');
    }
    if (e.key == 'amply') {
      history.push('/product/amply');
    }
  }






  return (
    <Menu
      mode="inline"
      theme="white"
      onClick={handleClick}
      style={{ padding: '10px 0px 0px 0px', width: '100%', height: '100%', borderRight: 0 }}
    >
      <SubMenu key="module" icon={<HddOutlined />} title="MODULE - MẠCH ĐIỆN TỬ">
        <Menu.Item key="module_amthanh">MODULE ÂM THANH</Menu.Item>
        <Menu.Item key="module_cambien">CẢM BIẾN</Menu.Item>
        <Menu.Item key="module_machnap">MẠCH NẠP</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<FundProjectionScreenOutlined />} title="TV - CŨ">
        <Menu.Item key="tivi_sony">SONY</Menu.Item>
        <Menu.Item key="tivi_lg">LG</Menu.Item>
        <Menu.Item key="tivi_samsung">SAMSUNG</Menu.Item>
        <Menu.Item key="tivi_tcl">TCL</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<HddOutlined />} title="ACCESSORIES - PHỤ KIỆN">
        <Menu.ItemGroup key="remote_sony" title="Sony">
          <Menu.Item key="remote_sony">REMOTE TIVI SONY</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="remote_tcl" title="TCL">
          <Menu.Item key="remote_tcl">REMOTE TIVI TCL</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="remote_samsung" title="SAMSUNG">
          <Menu.Item key="remote_samsung">REMOTE TIVI SamSung</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="remote_lg" title="LG">
          <Menu.Item key="remote_lg">REMOTE TIVE LG</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="sub4" icon={<NotificationOutlined />} title="AMPLY - ÂM LY">
        <Menu.Item key="amply">AMPLY KARAOKE</Menu.Item>
      </SubMenu>
    </Menu>


  );
}

export default LeftSide