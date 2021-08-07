import { Button, Result } from 'antd';
import React from 'react'
import { useHistory, useParams } from 'react-router';


function Error500(){
    const {id} = useParams();
    const history = useHistory();
    const handleBackHome = (e) => {
        id ? history.push('/') :   window.location.reload();
      }
    return (
        <>
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Button onClick={handleBackHome} type="primary">Back Home</Button>}
        />,
        </>
    );
}
export default Error500