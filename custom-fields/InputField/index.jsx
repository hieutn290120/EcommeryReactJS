import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';


InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    // 
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disable: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',

}


function InputField(props) {
    // console.log(props);
    const {
        field, form,
        type, label, placeholder, 
    } = props;
    
    const { name } = field;
    const {errors,touched} = form;
    const showError = errors[name] || touched[name];
   
    return (
        <FormGroup>
           {label ? <Label for={name}>{label}</Label> : label}
            <Input
                id={name}
                {...field}

                type={type}
                
                placeholder={placeholder}
            >
            </Input>
            {showError ? <p>{errors[name]}</p> : showError} 
        </FormGroup>
    )
}
export default InputField