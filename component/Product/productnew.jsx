import React, { useEffect, useState } from 'react';
import URL from '../../api/url';
import DefaulVariable from '../../variable';
import RenderProduct from './action/renderproduct';

function ProductNew(props) {

    const { SoPage, getValue } = props;
    const [isDataProduct, setIsDataProduct] = useState();
    const variable = DefaulVariable();

    useEffect(() => {

        fetch(`${URL.ULRAPI}product`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",

        })
            .then(response => response.json())
            .then(data1 => {

                // Lay Tong  Page cho Pagination -> truyen du lieu sang props
                getValue(parseInt(data1.from) * parseInt(data1.last_page) * 10);

                fetch(`${URL.ULRAPI}product?page=` + SoPage, {
                    headers: {
                        'Accept': 'Application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "GET",
                })
                    .then(response => response.json())

                    .then(data2 => {
                        const data = data2.data;
                        const DefaultRenderProduct = RenderProduct({ data, ...variable });
                        setIsDataProduct(DefaultRenderProduct)
                    });
            });
    }, [SoPage])

    return (
        <>
            { isDataProduct}
        </>
    )

}

export default ProductNew