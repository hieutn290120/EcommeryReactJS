import { Carousel } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import URL from '../../api/url';
import Images from '../../constants/images';

function Banner() {

    const [isDataBanner, setIsDataBanner] = useState();

    const onChange = (e) => {
    }

    useEffect(() => {
        fetch(`${URL.ULRAPI}product/banner`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",

        })
            .then(response => response.json())
            .then(data => {
                const html = [];
                data.filter(key => {
                    html.push(
                        <div key={key.id} className="carousel">
                            <img src={key.avatar} alt="" width="100%" height="500px"  />
                            <h4>Tên Sản Phẩm: {key.name}</h4>
                            <h5>CHUNG TAY ĐẨY LÙI DỊCH COVID-19</h5>
                        </div>
                    )
                })
                setIsDataBanner(html);
            });
    }, [])


    return (
        <Carousel autoplay={true} afterChange={onChange}>
           {isDataBanner}
        </Carousel>
    );
}

export default Banner