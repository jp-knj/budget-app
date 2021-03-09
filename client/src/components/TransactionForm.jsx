import React, { useRef, useContext, useState, useCallback } from 'react'
// Context
import { GlobalContext } from '../context/GlobalState'
// Material Ui
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Dialog, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
// Validation
import { numberValid, numberCalc } from '../utils/format'
// Theme
import { datePickerExpense, defaultMaterialTheme } from '../utils/colorTheme'
// Moment
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

const TransactionForm = ({ open, setOpen, data }) => {
  const { addTransaction } = useContext(GlobalContext)
  const initialDate = moment()
  const initialMinus = data && data.amount > 0 ? false : true

  const [text, setText] = useState(''),
        [errorText, setErrorText] = useState(false)
  const [amount, setAmount] = useState(''),
        [errorAmount, setErrorAmount] = useState(false)
  const [date, setDate] = useState(initialDate)
  const [minus, setMinus] = useState(initialMinus)

  const [disableBtn, setDisableBtn] = useState(true)

  const itemValid = (item, errorItem) => {
    if (!item) setDisableBtn(true);
    else errorItem ? setDisableBtn(true) : setDisableBtn(false);
  };

  const reset = useCallback(() => {
    setOpen(false)
    setErrorText(false)
    setErrorAmount(false)
    setDisableBtn(true)
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
    reset()
  }, [setOpen, reset])

  const handleMinus = useCallback(() => {
    setMinus(!minus);
  }, [minus]);

  const handleAmount = useCallback(({ target: input }) => {
    setAmount(input.value);
    if (numberValid(input.value)) {
      setErrorAmount(false);
      itemValid(text, errorText);
    } else {
      setErrorAmount(true);
      setDisableBtn(true);
    }
  }, [text, errorText]);

  const handleText = useCallback(({ target: input }) => {
    setText(input.value);
    if (input.value) {
      setErrorText(false);
      itemValid(amount, errorAmount);
    } else {
      setErrorText(true);
      setDisableBtn(true);
    }
  }, [amount, errorAmount]);

  const handleDate = useCallback((date) => {
    setDate(date);
    console.log(date);
    itemValid(text, errorText);
    itemValid(amount, errorAmount);
  }, [amount, errorAmount, text, errorText]);

  const handleSave = useCallback(() => {
    setText('')
    setAmount(null)
    setDate(initialDate)
    setMinus(true)
    console.log()
    reset()
  }, [text, amount, date]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(text, amount, date);
    const amountNumber = numberCalc(amount);
    const newTransaction = {
      text,
      amount: minus ? -amountNumber : amountNumber,
      date,
    };
    addTransaction(newTransaction)
    handleSave()
  };

  const ref = useRef();
  return (
    <ThemeProvider theme={minus ? datePickerExpense : defaultMaterialTheme}>
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
            Save
          </button>
        </form>
      </Dialog>
    </ThemeProvider>
  )
}

export default TransactionForm
