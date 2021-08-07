import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, InputNumber, message, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import URL from '../../api/url';
import ResultErrorData from '../../errorr/errordata';
import { DownQuantity, Quantity } from '../../features/QuantityListCartById';
import DefaulVariable from '../../variable';





function CartShoping() {

  const quantityCart = useSelector(state => state.checkQtyCart);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSanPhamGioHang, setIsSanPhamGioHang] = useState();

  const variable = DefaulVariable();



 

  // xu ly model
  const handleClickButtonCart = () => {
    setIsModalVisible(true);
  }
  const handleClickLink = () => {
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Xu ly lấy data cart chung, không cần gọi nhiều lần

  const RenderHtmlCart = (data) => {
    const html = [];
    if (data.length > 0) {
      data.filter(key => {
        html.push(
          <div className="div-cart" key={key.id} style={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: 'center' }} >
            <div className="image_cart" >
              <img src={key.avatar} alt="" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <div className="wrapper_cart">
              <span className="name_cart">{key.name}</span>
            </div>
            <div className="price_cart">
              <span >{((key.price) - (key.price * key.discount / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <u>đ</u> </span>
            </div>
            <div className="quantity_cart">
              <span><InputNumber style={{ maxWidth: "50px" }} onChange={(e) => onchangeValueQuantity(e, key.prd_id)} size="small" min={1} max={10} defaultValue={key.quantity} />
              </span>
            </div>
            <div className="button_cart">
              <span >
                <Button shape="round" type="primary" className="btn btn-info" onClick={(e) => handleClickDelete(e, key.id)}>X</Button>
              </span>
            </div>
          </div>
        )
      })
      setIsSanPhamGioHang(html);
    } else {
      setIsSanPhamGioHang(<h4>Không Có Sản Phẩm Nào Phù Hợp</h4>);
    }
  }

  //xu ly xem cart discount
  const handleClickShowCartDisCount = () => {
    functionShowListCart(false);
  }

  //Get list cart
  const functionShowListCart = (props) => {
    var urlcon;
    if(props){
      urlcon = 'product/getdatacart';
    }else{
      urlcon = 'product/getdatacart/discount'
    }
    
    if (variable.token) {
      axios.post(`${URL.ULRAPI}`+urlcon , {'token':variable.token})
        .then(response => {
          if (response.status == 200) {
            RenderHtmlCart(response.data)
          } 
        })
        .catch((error) => {
          RenderHtmlCart("");
        });
    } 

  }

  

  //xy ly xem tat ca
  const handleClickXemTatCa = () => {
    functionShowListCart(true);
  }

  //Xu ly render
  useEffect(() => {
    functionShowListCart(true);
  }, [isModalVisible])

  // xu ly xoa san pham
  const handleClickDelete = (e, id) => {
    const html = e.target.closest('.div-cart')
    const data = new FormData();
    data.append('token', variable.token);

    axios.delete(`${URL.ULRAPI}product/deletecart/` + id, {
      headers: {
        Authorization: 'Bearer ' + variable.token,
      },
      data: data
    })
      .then(response => {
        if (response.status == 200) {
          html.remove();
          message.success('Xóa sản phẩm thành công !');
          variable.dispatch(DownQuantity());
        }
      })
      .catch(error => message.error(error));
  }

  //xu ly quantity cart
  const onchangeValueQuantity = (e, prdid) => {

    const data = new FormData();
    data.append('token', variable.token);
    data.append('id', prdid);
    data.append('quantity', e);

    axios.post(`${URL.ULRAPI}product/updatequantity`, data)
      .then(response => {
        if (response.status == 200) {
          message.success('Update Quantity Thành Công!')
        }
      })
      .catch(error => message.error(error));
  }



  const result = isSanPhamGioHang != 'undefined' ? isSanPhamGioHang : <ResultErrorData />

  return (
    <>
      <Button style={{ float: 'right', marginTop: '8px', border: 'none' }} key="5" icon={<ShoppingCartOutlined />} onClick={handleClickButtonCart}>{quantityCart}</Button>

      <Modal
        title={[
          <Button key="b1" style={{ 'textAlign': 'center', 'marginRight': '10px' }} type="primary" shape="round" onClick={handleClickXemTatCa}>Tất Cả</Button>,
          <Button key="b2" style={{ 'textAlign': 'center' }} type="primary" shape="round" onClick={handleClickShowCartDisCount}>Discount</Button>,
        ]}
        footer={
          <Button onClick={handleClickLink} type="primary" shape="round" ><a href="/paymain">Đến Trang Thanh Toán</a></Button>
        }
        visible={isModalVisible}
        width={500}
        onCancel={handleCancel}
      >

        {result}

      </Modal>

    </>
  );
}

export default CartShoping