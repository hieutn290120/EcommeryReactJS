import { BackTop } from 'antd';
import  { UpCircleOutlined } from '@ant-design/icons';
import React from 'react'

const style = {
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
  };

function BackUp(){
    return (
        <BackTop>
        <div style={style}><UpCircleOutlined /></div>
        </BackTop>
    );
}

export default BackUp