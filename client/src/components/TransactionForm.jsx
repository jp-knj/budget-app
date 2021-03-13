import React, { useRef, useContext, useState, useCallback } from 'react'
// Context
import { GlobalContext } from '../context/GlobalState'
// Material Ui
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
// Validation
import { numberValid, numberCalc, numberEuro } from '../utils/format'
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

const useStyle = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    opacity: 0.8,
    fontSize: '16px',
    textTransform: 'uppercase',
  },
}));

const TopBar = ({ action, minus, handleClose }) => {
  const classes = useStyle();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
        </Typography>
        <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const TransactionForm = ({ open, setOpen, action, data }) => {
  const { addTransaction, updateTransaction } = useContext(GlobalContext);
  const formatEuro = amount => numberEuro(Math.abs(amount)).toString();

  const initialText = data ? data.text : '',
        initialAmount = data ? formatEuro(data.amount) : null,
        initialDate = data ? data.date : moment(),
        initialMinus = data && data.amount > 0 ? false : true;

  const [text, setText] = useState(initialText),
        [errorText, setErrorText] = useState(false);
  const [amount, setAmount] = useState(initialAmount),
        [errorAmount, setErrorAmount] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [minus, setMinus] = useState(initialMinus);

  const [disableBtn, setDisableBtn] = useState(true);
  const color = data && data.amount > 0 ? 'positive' : 'negative';
  const reset = useCallback(() => {
    setOpen(false);
    setErrorText(false);
    setErrorAmount(false);
    setDisableBtn(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setText(initialText);
    setAmount(initialAmount);
    setDate(initialDate);
    setMinus(initialMinus);
    reset();
  }, [initialText, initialAmount, initialDate, initialMinus, reset]);

  const handleSave = useCallback(() => {
    setText(action === 'new' ? '' : text);
    setAmount(action === 'new' ? null : amount);
    setDate(action === 'new' ? moment() : date);
    setMinus(action === 'new' ? true : minus);
    reset();
  }, [text, minus, amount, date, action, reset]);

  const itemValid = (item, errorItem) => {
    if (!item) setDisableBtn(true);
    else errorItem ? setDisableBtn(true) : setDisableBtn(false);
  };

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

  const handleMinus = useCallback(() => {
    setMinus(!minus);
    itemValid(text, errorText);
    itemValid(amount, errorAmount);
  }, [minus, amount, errorAmount, text, errorText]);

  const handleDate = useCallback((date) => {
    setDate(date);
    itemValid(text, errorText);
    itemValid(amount, errorAmount);
  }, [amount, errorAmount, text, errorText]);

  const onSubmit = (e) => {
    e.preventDefault();
    const amountNumber = numberCalc(amount);
    const newTransaction = {
      text,
      amount: minus ? -amountNumber : amountNumber,
      date,
    };
    if (action === 'new') addTransaction(newTransaction);
    if (action === 'edit') updateTransaction(data._id, newTransaction);
    handleSave();
  };

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
          <h1 className={`heading-secondary ${minus ? 'positive' : 'negative'}`}>
            { minus? 'Expense': 'Income' }
          </h1>
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
            className={`button-secondary ${minus ? 'negative-bg' : 'positive-bg'}`}
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
