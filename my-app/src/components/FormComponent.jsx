import React from 'react';
import { withFormik, Form, Field } from 'formik';

const FormComponent = props => {
  return (
    <Form>
        <Field type="name" name="name" placeholder="Name" />
        <br />
        <Field type="email" name="email" placeholder="Email" />
        <br />
        <Field type="password" name="password" placeholder="Password" />
        <br />
        <Field component="select" name="favoriteColor">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>
        <br />
        Terms: <Field type="checkbox" name="tos" />
        <br />
        <button type="submit">Submit!</button>
    </Form>
  );
};

const FormikFormComponent = withFormik({
  mapsPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },

  handleSubmit(values) {
    console.log('form submit', values);
  }
})(FormComponent);

export default FormikFormComponent;
