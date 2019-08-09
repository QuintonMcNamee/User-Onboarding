import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const FormComponent = ({ errors, touched, values, handleSubmit, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);

  return (
    <div>
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
        Terms: <Field type="checkbox" name="tos" checked={values.tos} />
        {touched.tos && errors.tos && <p>{errors.tos}</p>}
        <br />
        <button type="submit">Submit!</button>
      </Form>
      <div>
        {user.map(user => (
          <p key={user.id}>{user.createdAt}</p>
        ))}
      </div>
    </div>
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

  handleSubmit(values, { setStatus }) {
    console.log('form submit', values);
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log('form received', res.data);
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(FormComponent);

export default FormikFormComponent;
