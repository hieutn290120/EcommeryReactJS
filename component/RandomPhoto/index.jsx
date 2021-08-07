import React from 'react'
import {Button} from 'reactstrap'
import PropTypes from 'prop-types'
import './RandomPhoto.scss'
import RandomImages from '../../constants/randomImages'

RandomPhoto.prototype = {
     name: PropTypes.string,
     imageUrl: PropTypes.string,
     onImageUrlChange: PropTypes.func,
     onRanDomButtonBlur: PropTypes.func,
}
RandomPhoto.defaultProps = {
    name:'',
    imageUrl: '',
    onImageUrlChange: null,
    onRanDomButtonBlur: null,
}

function RandomPhoto(props){
    const {name, imageUrl, onImageUrlChange, onRanDomButtonBlur} = props;
    const handleRandomPhotoClick = async() => {
        if(onImageUrlChange) {
            const RandomImgUrl = RandomImages[Math.trunc(1 + Math.random() * 3)];
            onImageUrlChange(RandomImgUrl)
        }
    }
    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button
                    outline
                    // name={name}
                    color="primary"
                    onBlur={onRanDomButtonBlur}
                    onClick={handleRandomPhotoClick}
                >
                    Random A Photo
                </Button>
            </div>

            <div className="random-photo__photo">
                {imageUrl ? <img name={name} src={imageUrl} alt="Ooops ... not found. Please click" /> : imageUrl }
            </div>
        </div>
    );
}

export default RandomPhoto