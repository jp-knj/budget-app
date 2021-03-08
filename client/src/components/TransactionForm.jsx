import React, { useRef, useContext, useState, useCallback } from 'react'
import { GlobalContext } from '../context/GlobalState'

// Material Ui
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { TextField, InputAdornment, Switch, Dialog, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';

import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

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
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
      <ThemeProvider >
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <TopBar handleClose={handleClose} />
          <form
            noValidate
            autoComplete='off'
            onSubmit={onSubmit}
          >
            <div>
              <TextField
                id='amount'
                inputRef={ref}
                label='Amount'
                required='true'
                onChange={handleAmount}
              />
              <TransactionSwitch />
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
