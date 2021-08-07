import axios from 'axios';
import React, { useEffect, useState } from 'react';
import URL from '../../api/url';
import DefaulVariable from '../../variable';
import RenderProduct from './action/renderproduct';

function ProductTivi(props) {
    const { SoPage, getValue } = props;
    const [isDataProduct, setIsDataProduct] = useState();
    const variable = DefaulVariable();


    useEffect(() => {
        axios.get(`${URL.ULRAPI}product/tivi`,{})
        .then(response => {
            if(response.data.data.length > 0) {
                // Lay Tong  Page cho Pagination -> truyen du lieu sang props
                getValue(parseInt(response.data.from) * parseInt(response.data.last_page) * 10);
                axios.get(`${URL.ULRAPI}product/tivi?page=`+ SoPage, {})
                .then(response => {
                    const data = response.data.data;
                    const DefaultRenderProduct = RenderProduct({ data, ...variable });
                    setIsDataProduct(DefaultRenderProduct)
                })
            }else{
                getValue(1)
                const  html = <h3 className="error_data">Hiện Tại Chưa Có Sản Phẩm Nào Phù Hợp</h3>;
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

export default ProductTivi