import React,{useEffect}  from "react"
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import warnings from './warnings'

const FormExample = ({ handleSubmit, initialize, initialData }) => {

  useEffect(() => {
    initialize(initialData)
  }, [initialize])

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstName">First Name</label>
      <Field name="firstname" component="input" type="text" />
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
