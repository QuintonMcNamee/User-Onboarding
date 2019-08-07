import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const FormComponent = ({ errors, touched }) => {
  return (
    <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <div>{errors.name}</div>}
        <br />
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && <div>{errors.email}</div>}
        <br />
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <div>{errors.password}</div>}
        <br />
        <Field component="select" name="favoriteColor">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Field>
        <br />
        Terms: <Field type="checkbox" name="tos" />
        {touched.tos && errors.tos && <p>{errors.tos}</p>}
        <br />
        <button type="submit">Submit!</button>
    </Form>
  );
};

const FormikFormComponent = withFormik({
  mapsPropsToValues({ name, email, password, favoriteColor, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      favoriteColor: favoriteColor || "green",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string("Must be a string.").required("Name is required."),
    email: Yup.string("Must be a string.").required("Email is required.").email("Not a valid email."),
    password: Yup.string("Must be a string.").required("Password is required.").min(6, "Password must be atleast 6 characters."),
    tos: Yup.bool().oneOf([true], "Terms are required.")
  }),

  handleSubmit(values) {
    console.log('form submit', values);
  }
})(FormComponent);

export default FormikFormComponent;
