import RandomPhoto from '../../component/RandomPhoto/index'
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

RandomPhotoField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
};

RandomPhotoField.defaultProps = {
  label: '',
}

function RandomPhotoField(props) {
  const { field, form, label } = props;
  const { name, value, onBlur } = field;
  const {errors,touched} = form;
  const showError = errors[name] || touched[name];
  const handleImageUrlChange = (newImageUrl) => {
    form.setFieldValue(name, newImageUrl)
  }

  return (
    <FormGroup>
      {label ? <Label for={name}>{label}</Label> : label }

      <RandomPhoto
        name={name}
        imageUrl={value}
        onImageUrlChange={handleImageUrlChange}
        onRandomButtonBlur={onBlur}
      />
        {showError ? <p>{errors[name]}</p> : showError} 
    </FormGroup>
  );
}

export default RandomPhotoField;