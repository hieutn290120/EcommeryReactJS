import { FastField, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router';
import { Button, Form, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import { PHOTO_CATEGORY_OPTIONS } from '../../../../constants/global';
import InputField from '../../../../custom-fields/InputField';
import RanDomPhotoField from '../../../../custom-fields/RandomPhoto';
import SelectField from '../../../../custom-fields/Selectfield';
import './style.scss';

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
}

function PhotoForm(props) {
  const { id } = useParams();
 
  const { initialValues } = props;

  const validateSchema = Yup.object().shape({
    title: Yup.string().required('Khong duoc de trong'),
    categoryId: Yup.number().required(),
    photo: Yup.string().required('Khong duoc de trong'),

  })

  const { getValue } = props;

  const HandleClick = (e) => {

    const name = e.target.form.name.value;
    const category = e.target.form.categoryId.value;
    const avatar = e.target.form.avatar.src;

    const obj = {
      name: name,
      description: category,
      avatar: avatar
    }
    getValue(obj)

  }
  
  const actionNam = id ? 'Edit Photo' : 'Add Photo'

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
    >
      {formikProps => {
        const { values, touched, status } = formikProps;
        return (
          <Form>
            <FastField
              name="name"
              component={InputField}

              label='Title'
              placeholder="Ex: Tran Nhan Hieu"
            />
            <FastField
              name="categoryId"
              component={SelectField}

              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />
            <FastField
              name="avatar"
              component={RanDomPhotoField}

              label="Photo"
            />
            <FormGroup>
              <Button onClick={HandleClick}>
                {actionNam}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  )
}
export default PhotoForm;