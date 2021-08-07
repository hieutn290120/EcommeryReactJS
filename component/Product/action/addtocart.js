import { message } from 'antd';
import URL from '../../../api/url'
import { UpQuantity } from '../../../features/QuantityListCartById'

const Addtocart = (id_prd, token, dispatch) => {

    
    token &&  fetch(`${URL.ULRAPI}product/addtocart`, {
        headers: {
            'Accept': 'Application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ 'token': token, 'id': id_prd })
    })
        .then(response => response.json())
        .then(data => {
            if(data){
                dispatch(UpQuantity());
            }
        }) || message.error('Có Lỗi Khi Thêm Sản Phẩm. Hãy Kiểm Tra Trạng Thái Đăng Nhập');
}

export default Addtocart