// Render tất cả cả component product chung

import { Button, Col } from "antd";
import Addtocart from "./addtocart";
import XemChiTietSanPham from "./xemchitietproduct";

const RenderProduct = (...props) => {

    const { data, history, dispatch, token } = props[0] ;

    var html = [];
    //click xem chi tiet

    const handleClickXemChiTiet = (id_prd) => {
        XemChiTietSanPham(id_prd, history, dispatch)

    }

    //click mua hang
    const handleClickMuaHang = (id_prd) => {
        Addtocart(id_prd, token, dispatch);
    }


    data.filter(key => {
        html.push(
            <Col key={key.id} className="gutter-row col-ls-3 col-md-3 col-sm-6" >
                <img className="content-index__1__hover" src={key.avatar} alt="" width="250" height="200" />
                <span>Tên Sản Phẩm: {key.name}</span>
                <p>Giá:  {key.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</p>
                <p>Giảm giá: {key.discount}%</p>
                <div className="middle">
                    <div className="text">
                        <Button shape="round" type="dashed" className="btn btn-info " onClick={(e) => handleClickMuaHang(key.id)}>Thêm Vào Giỏ Hàng</Button>
                        <Button shape="round" type="dashed" className="btn btn-info" onClick={(e) => handleClickXemChiTiet(key.id)}>Xem Chi Tiết</Button>
                    </div>
                </div>
            </Col>
        )
    })

    return html;
}

export default RenderProduct