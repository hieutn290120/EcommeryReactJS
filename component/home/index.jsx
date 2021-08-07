import { Pagination, Row } from 'antd';
import React, { useState } from 'react';
import Banner from '../Banner';
import ProductDiscount from '../Product/productdiscount';
import ProductNew from '../Product/productnew';
import ProductTivi from '../Product/productpc';
import ProductRemote from '../Product/productremote';
import './style.scss';

function Index() {


    const [isSoPage1, setIsSoPage1] = useState();
    const [isSoPage2, setIsSoPage2] = useState();
    const [isSoPage3, setIsSoPage3] = useState();
    const [isSoPage4, setIsSoPage4] = useState();

    const [isTotalPage1, setIsTotalPage1] = useState();
    const [isTotalPage2, setIsTotalPage2] = useState();
    const [isTotalPage3, setIsTotalPage3] = useState();
    const [isTotalPage4, setIsTotalPage4] = useState();

    const [isDisable1, setIsDisable1] = useState(false);
    const [isDisable2, setIsDisable2] = useState(false);
    const [isDisable3, setIsDisable3] = useState(false);
    const [isDisable4, setIsDisable4] = useState(false);

    const onChange = (e) => {
    }
    const changeSoPage1 = (e) => {
        setIsSoPage1(e)
    }
    const changeSoPage2 = (e) => {
        setIsSoPage2(e)
    }
    const changeSoPage3 = (e) => {
        setIsSoPage3(e)
    }
    const changeSoPage4 = (e) => {
        setIsSoPage4(e)
    }

    const getTotalPage1 = (e) => {
        if (e == 1) {
            setIsDisable1(!isDisable1)
        }
        setIsTotalPage1(e);
    }
    const getTotalPage2 = (e) => {
        if (e == 1) {
            setIsDisable2(!isDisable2)
        }
        setIsTotalPage2(e);
    }
    const getTotalPage3 = (e) => {
        if (e == 1) {
            setIsDisable3(!isDisable3)
        }
        setIsTotalPage3(e);
    }
    const getTotalPage4 = (e) => {
        if (e == 1) {
            setIsDisable4(!isDisable4)
        }
        setIsTotalPage4(e);
    }

    return (
        <>
            <Banner />
            <div className="content-index">
                <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12" >
                    <h1>SẢN PHẨM MỚI</h1>
                    <ProductNew getValue={getTotalPage1} SoPage={isSoPage1} />
                    <Pagination disabled={isDisable1} onChange={changeSoPage1} defaultCurrent={1} total={isTotalPage1} />
                </div>
                <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12" >
                    <h1>SẢN PHẨM KHUYẾN MÃI</h1>
                    <ProductDiscount getValue={getTotalPage2} SoPage={isSoPage2} />
                    <Pagination disabled={isDisable2} onChange={changeSoPage2} defaultCurrent={1} total={isTotalPage2} />
                </div>
                <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12">
                    <h1>SẢN PHẨM TIVI</h1>
                        <ProductTivi getValue={getTotalPage3} SoPage={isSoPage3} />
                    <Pagination disabled={isDisable3} onChange={changeSoPage3} defaultCurrent={1} total={isTotalPage3} />
                </div>
                <div className="col-sm-12 col-md-12 col-xs-12 col-lg-12" >
                    <h1>SẢN PHẨM REMOTE</h1>
                        <ProductRemote getValue={getTotalPage4} SoPage={isSoPage4} />
                    <Pagination disabled={isDisable4} onChange={changeSoPage4} defaultCurrent={1} total={isTotalPage4} />
                </div>
            </div>
        </>
    );
}

export default Index