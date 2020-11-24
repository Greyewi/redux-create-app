import React  from "react"
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import warnings from './warnings'

const FormExample = ({ handleSubmit }) => {

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstName">First Name</label>
      <Field name="firstName" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="age">Age</label>
      <Field name="age" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <Field name="email" component="input" type="email" />
    </div>
    <button type="submit">Submit</button>
  </form>
}

export default reduxForm({
  form: 'example',
  validate,
  warnings
})(FormExample)
