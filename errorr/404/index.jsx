import { Button, Result } from 'antd';
import React from 'react'
import { useHistory } from 'react-router';


function Error404(){
    const history = useHistory();
    const handleBackHome = (e) => {
      window.location.reload();
    }
    return (
        <>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, something went wrong."
            extra={<Button onClick={handleBackHome} type="primary">Back Home</Button>}
        />,
        </>
    );
}
export default Error404