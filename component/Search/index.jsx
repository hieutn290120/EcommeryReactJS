import { Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchproductbyname } from '../../actionredux/Product/Search/searchbyname';
import URL from '../../api/url';
const { Search } = Input;


function SearchbyName() {

  const [isValueSearch, setIsValueSearch] = useState();
  
  const dispatch = useDispatch();

  const onChangeSearch = (e) => {
    setIsValueSearch(e.target.value);
  }
  
  const onClickSearch = (e) => {
    if(e){
      axios.post(`${URL.ULRAPI}searchbyname`, { 'name': isValueSearch })
      .then(response => {
        if (response.status == 200) {
          const action = searchproductbyname(response.data);
          dispatch(action)
        }
      })
    }else{
      window.location.reload();
    }
  }

  return (
    <>
      <Search
        bordered
        allowClear
        enterButton="Tìm Kiếm"
        size="small"
        style={{ 'marginTop': '14px' }}
        onChange={onChangeSearch}
        onSearch={onClickSearch}
      />
    </>
  );
}

export default SearchbyName