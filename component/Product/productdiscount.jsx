import axios from 'axios';
import React, { useEffect, useState } from 'react';
import URL from '../../api/url';
import DefaulVariable from '../../variable';
import RenderProduct from './action/renderproduct';

function ProductDiscount(props) {

    const { SoPage, getValue } = props;
    const [isDataProduct, setIsDataProduct] = useState();
    const variable = DefaulVariable()

    useEffect(() => {
        axios.get(`${URL.ULRAPI}product/discount`,{})
        .then(reponse => {
            if(reponse.data.data.length > 0){
                getValue(parseInt(reponse.data.from) * parseInt(reponse.data.last_page) * 10);
                axios.get(`${URL.ULRAPI}product/discount?page=` + SoPage, {})
                .then(reponse => {
                    const data = reponse.data.data;
                    const DefaultRenderProduct = RenderProduct({ data, ...variable });
                    setIsDataProduct(DefaultRenderProduct)
                })
            }else{
                getValue(1);
                const html = <h3 className="error_data">Hiện Tại Chưa Có Sản Phẩm Nào Phù Hợp</h3>;
                setIsDataProduct(html)
            }
        })
    }, [SoPage])

    return (
        <>
            { isDataProduct}
        </>
    )

}
export default ProductDiscount