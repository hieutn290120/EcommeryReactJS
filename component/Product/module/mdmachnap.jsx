import { Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import URL from '../../../api/url';
import DefaulVariable from '../../../variable';
import RenderProduct from '../action/renderproduct';



function ModuleMachNap() {
    const [isDataProduct, setIsDataProduct] = useState();
    const variable = DefaulVariable();


    useEffect(() => {
        axios.get(`${URL.ULRAPI}product/modulemachnap`)
            .then(response => {
                if (response.status == 200) {
                    const data = response.data;
                    const DefaultRenderProduct = RenderProduct({ data, ...variable });
                    setIsDataProduct(DefaultRenderProduct)
                }
            });
    }, [])

    return (
        <>
            <div className="content-index__1" >
                <h1>SẢN PHẨM MODULE MẠCH NẠP</h1>
                <Row>
                    {isDataProduct}
                </Row>
            </div>
        </>
    );
}
export default ModuleMachNap