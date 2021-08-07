import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import DashBoard from './admin/component/dashboard';
import './App.css';
import BackUp from './component/BackUp';
import ContactUs from './component/ContacUs';
import ComponentFooter from './component/Footer';
import ComponentHeader from './component/Header';
import Index from './component/home';
import ComponentLeftSide from './component/LeftSide';
import AMPLY from './component/Product/amply/amply';
import DetailProductById from './component/Product/detail';
import ModuleAmThanh from './component/Product/module/mdamthanh';
import ModuleCamBien from './component/Product/module/mdcambien';
import ModuleMachNap from './component/Product/module/mdmachnap';
import SearchbyNameComponent from './component/Product/productsearchbyname';
import RemoteLG from './component/Product/romote/lg';
import RemoteSAMSUNG from './component/Product/romote/samsung';
import RemoteSONY from './component/Product/romote/sony';
import RemoteTCL from './component/Product/romote/tcl';
import TiviLG from './component/Product/tivi/tivilg';
import TiviSAMSUNG from './component/Product/tivi/tivisamsung';
import TiviSONY from './component/Product/tivi/tivisony';
import TiviTCL from './component/Product/tivi/tivitcl';
import Register from './component/Register';
import Error404 from './errorr/404';
import FormLogin from './component/Login/';
import Paymain from './paymaint';
import ForgotPassword from './component/forgotpassword';
import ResetPassword from './component/forgotpassword/resetpass';
import DefaulVariable from './variable';

function App() {

  const dataSearchByName = useSelector(state => state.listprdbyname);
  const variable = DefaulVariable();

  
  //check 1 giờ thì tự động xóa local và logout
  //Có bắt sự kiện ở Action Login
  const hours = 1; // to clear the localStorage after 1 hour(if someone want to clear after 8hrs simply change hours=8)
  const now = new Date().getTime();
  const setupTime = localStorage.getItem('setupTime');

  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
  };



  if (variable.author == 'Admin') {

    return (
      <div className="App">
        <Layout>
          <BrowserRouter>
            <Route exact path="/admin/dashboard">
              <DashBoard Authen={variable.author} />
            </Route>
          </BrowserRouter>
          <BrowserRouter>
            <Switch>
              <Route exact path="/:slug">
                <Error404 />
              </Route>
            </Switch>
          </BrowserRouter>
        </Layout>
      </div>
    );
  }

  else {
    
    return (
      <>
        <div className="App">
          <div className="main">
            <BrowserRouter>
              <div className="col-sm-12 col-md-12 col-xs-12">
                <div className="header">
                  <ComponentHeader />
                </div>
              </div>
              <div className="col-sm-12 col-md-3 col-xs-12">
                <div className="sidebar">
                  <ComponentLeftSide />
                </div>
              </div>
              <div className="col-sm-12 col-md-9 col-xs-12">
                <Switch>
                  <Route exact path="/">
                    {dataSearchByName ? <SearchbyNameComponent /> : <Index />}
                  </Route>
                  <Route exact path="/product">
                    <Index />
                  </Route>
               
                  <Route exact path="/product/module_amthanh">
                    {dataSearchByName ? <SearchbyNameComponent /> : <ModuleAmThanh />}
                  </Route>
                
                  <Route exact path="/product/module_machnap">
                    {dataSearchByName ? <SearchbyNameComponent /> : <ModuleMachNap />}
                  </Route>
              
                  <Route exact path="/product/module_cambien">
                    {dataSearchByName ? <SearchbyNameComponent /> : <ModuleCamBien />}
                  </Route>
                
                  <Route exact path="/product/tivisony">
                    {dataSearchByName ? <SearchbyNameComponent /> : <TiviSONY />}
                  </Route>
                
                  <Route exact path="/product/tivitcl">
                    {dataSearchByName ? <SearchbyNameComponent /> : <TiviTCL />}
                  </Route>
                
                  <Route exact path="/product/tivisamsung">
                    {dataSearchByName ? <SearchbyNameComponent /> : <TiviSAMSUNG />}
                  </Route>
               
                  <Route exact path="/product/tivilg">
                    {dataSearchByName ? <SearchbyNameComponent /> : <TiviLG />}
                  </Route>
               
                  <Route exact path="/product/remotetcl">
                    {dataSearchByName ? <SearchbyNameComponent /> : <RemoteTCL />}
                  </Route>
                
                  <Route exact path="/product/remotesony">
                    {dataSearchByName ? <SearchbyNameComponent /> : <RemoteSONY />}
                  </Route>
               
                  <Route exact path="/product/remotelg">
                    {dataSearchByName ? <SearchbyNameComponent /> : <RemoteLG />}
                  </Route>
               
                  <Route exact path="/product/remotesamsung">
                    {dataSearchByName ? <SearchbyNameComponent /> : <RemoteSAMSUNG />}
                  </Route>
                
                  <Route exact path="/product/amply">
                    {dataSearchByName ? <SearchbyNameComponent /> : <AMPLY />}
                  </Route>
               
                  <Route exact path="/product/detail/:id">
                    <DetailProductById />
                  </Route>
               
                  <Route exact path="/admin/dashboard">
                    {variable.author == "User" ? <Redirect from="/admin/dashboard" to="/" /> : <Redirect push to="/admin/dashboard"  />}
                  </Route>
               
                  <Route exact path="/contactus">
                    <ContactUs />
                  </Route>
                
                  <Route exact path="/login">
                    <FormLogin />
                  </Route>
               
                  <Route path="/register">
                    <Register />
                  </Route>
                
                  <Route exact path="/paymain">
                    <Paymain />
                  </Route>

                  <Route exact path="/forgot-password">
                    <ForgotPassword />
                  </Route>
                  
                  <Route exact path="/forgot-password/reset/:key">
                    <ResetPassword />
                  </Route>
                  
                </Switch>
                <BackUp />
                </div>
                <div className="col-sm-12 col-md-12 col-xs-12">
                  <div >
                    <ComponentFooter />
                  </div>
                </div>
                </BrowserRouter>
             </div>
          </div>
      </>
    );

  }
}
export default App
