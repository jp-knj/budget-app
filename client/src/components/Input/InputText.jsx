import React from 'react'

// Material Ui
import { TextField } from '@material-ui/core'

// Components
import { useStyles } from '../TransactionForm'

const InputText = ({ label, value, error, errorMsg, onChange }) => {
  const classes = useStyles();
  return (
    <TextField
      id={label}
      label={label}
      fullWidth
      value={value}
      error={error}
      required={label !== 'Register Date' && true}
      className='form_input'
      InputLabelProps={{ shrink: true }}
      InputProps={{ className: classes.textColor }}
      helperText={error && errorMsg}
      onChange={onChange}
      disabled={!onChange && true}
    />
  )
}

export default InputText
