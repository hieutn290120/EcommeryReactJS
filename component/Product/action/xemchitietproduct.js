import { message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addListProductById } from '../../../actionredux/Product';
import URL from '../../../api/url';



const  XemChiTietSanPham = (id_prd,history,dispatch)  => {
   

    axios.get(`${URL.ULRAPI}product/api/` + id_prd)
        .then(response => {
            if (response.status == 200) {
                const action = addListProductById(response.data[0]);
                dispatch(action)
                history.push('/product/detail/' + id_prd);
            } else {
                message.error('Errors');
            }
    });
}

export default XemChiTietSanPham