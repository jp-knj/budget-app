import React, { useRef, useContext, useState, useCallback } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { datePickerExpense, defaultMaterialTheme } from '../utils/colorTheme'
// Material Ui
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { TextField, InputAdornment, Switch, Dialog, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';

import moment from 'moment';
// Components
import InputAmount from './Input/InputAmount'
import InputText from './Input/InputText'
import InputDate from './Input/InputDate'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const useStyles = makeStyles((theme) => ({
  textColor: {
    color: '#232C2D',
    opacity: 0.8,
  },
  input: {
    fontSize: '36px',
  },
  inputPlus: {
    color: theme.palette.primary.main,
  },
  inputMinus: {
    color: '#F4B202',
  },
}));

const TopBar = ({ handleClose }) => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
          <CloseIcon onClick={handleClose}　/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

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

const InputDate = ({ date, handleDate }) => {
  const dateFormat = 'd MMM, yyyy';
  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, dateFormat, { locale: this.locale });
    }
  }
  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils}>
      <KeyboardDatePicker
        id='date'
        label='Date'
        value={date}
        format={dateFormat}
        onChange={handleDate}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
        fullWidth
      />
    </MuiPickersUtilsProvider>
  );
};

const TransactionForm = ({ open, setOpen }) => {
  const { addTransaction } = useContext(GlobalContext);

  const initialDate = moment();
  const [text, setText] = useState(''),
        [errorText, setErrorText] = useState(false);
  const [amount, setAmount] = useState(null),
        [errorAmount, setErrorAmount] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [minus, setMinus] = useState(false);

  const classes = useStyles();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleFocus = useCallback(() => {
    ref.current.focus();
  }, [])

  const handleMinus = useCallback(() => {
    setMinus(!minus);
  }, [minus]);

  const handleAmount = useCallback(({ target: input }) => {
    setAmount(input.value);
  }, [text, errorText]);

  const handleText = useCallback(({ target: input }) => {
    setText(input.value);
  }, [amount, errorAmount]);

  const handleDate = useCallback((date) => {
    setDate(date);
  }, [amount, errorAmount, text, errorText]);

  const handleSave = useCallback(() => {
    setText(text);
    setAmount(amount);
    setDate(date);
  }, [text, amount, date]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(text, amount, date);
    const amountNumber = amount;
    const newTransaction = {
      text,
      amount: amountNumber,
      date,
    };
    addTransaction(newTransaction);
    handleSave();
  };

  const ref = useRef();
  return (
    <>
      <ThemeProvider theme={minus ? datePickerExpense : defaultMaterialTheme}>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <p>{minus ? 'Expense' : 'Income'}</p>
          <InputAmount
            minus={minus}
            amount={amount}
            errorAmount={errorAmount}
            handleAmount={handleAmount}
            handleMinus={handleMinus}
          />
          <InputText
            label='Description'
            value={text || ''}
            error={errorText}
            errorMsg='Please describe this transaction'
            onChange={handleText}
          />
          <InputDate date={date} handleDate={handleDate}/>
          <button
            disabled={disableBtn ? true : false}
          >
            <div>
              <TextField
                id='amount'
                inputRef={ref}
                label='Amount'
                required='true'
                onChange={handleAmount}
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
              />
              <TransactionSwitch
                checked={minus}
                tabIndex='-1'
                onChange={handleMinus}
                onClick={handleFocus}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
            <TextField
              id='Description'
              label='Description'
              fullWidth
              required='true'
              onChange={handleText}
            />
            <InputDate />
            <button>Save</button>
          </form>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default TransactionForm
