import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DefaulVariable from '../../variable';
import RenderProduct from './action/renderproduct';


function SearchbyNameComponent() {

    const dataPrdByName = useSelector(state => state.listprdbyname);
    const [isDataProduct, setIsDataProduct] = useState();
    const variable = DefaulVariable();


    useEffect(() => {
        if (dataPrdByName.length > 0) {
            const data = dataPrdByName;
            const DefaultRenderProduct = RenderProduct({ data, ...variable });
            setIsDataProduct(DefaultRenderProduct)
        } else {
            setIsDataProduct(
                <h4 className="error_data">Không Có Sản Phẩm Nào Phù Hợp Với Kết Quả Bạn Tìm Kiếm</h4>
            )
        }

    }, [dataPrdByName])

    return (
        <>
            {isDataProduct}
        </>
    )
}

export default SearchbyNameComponent