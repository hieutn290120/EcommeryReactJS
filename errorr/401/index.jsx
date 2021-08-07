import { Button, Result } from 'antd';
import React from 'react'


function Error401(){
    const handleBackHome = (e) => {
        window.location.reload();
      }
    return (
        <>
        <Result
            status="401"
            title="401"
            subTitle="Sorry, something went wrong."
            extra={<Button onClick={handleBackHome} type="primary">Back Home</Button>}
        />,
        </>
    );
}
export default Error401