import React, { useRef, useCallback } from 'react'

// Material Ui
import { withStyles } from '@material-ui/core/styles'
import { TextField, InputAdornment, Switch } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

// Components
import { useStyles } from '../TransactionForm'

const InputAmount = ({
  action,
  minus,
  amount,
  errorAmount,
  handleAmount,
  handleMinus,
}) => {
  const classes = useStyles();
  const ref = useRef();

  const handleFocus = useCallback(() => {
    ref.current.focus();
  }, [])

  const TransactionSwitch = withStyles((theme) => ({
    root: {
      marginRight: -12,
    },
    switchBase: {
      color: theme.palette.primary.main,
      '&$checked': {
        color: theme.palette.primary.main,
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    thumb: {
      boxShadow: 'none',
    },
    checked: {},
    track: {
      backgroundColor: theme.palette.primary.main,
    },
  }))(Switch);

  return (
    <div className="form_amount">
      <TextField
        id='amount'
        inputRef={ref}
        label='Amount'
        required
        className='form_input'
        autoFocus={action === 'new' && true}
        value={amount || ''}
        InputProps={{
          className: `${classes.input} ${
            minus ? classes.inputMinus : classes.inputPlus
          }`,
          startAdornment: (
            <InputAdornment position='start' style={{ margin: 0 }}>
              {minus ? <RemoveIcon /> : <AddIcon />}
            </InputAdornment>
          ),
        }}
        error={errorAmount}
        helperText={errorAmount
          ? 'Please enter a valid number'
          : 'Toggle Income / Expense'
        }
        onChange={handleAmount}
      />
      <TransactionSwitch
        checked={minus}
        tabIndex='-1'
        onChange={handleMinus}
        onClick={handleFocus}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  )
}

export default InputAmount
