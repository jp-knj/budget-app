import React, { useRef, useCallback } from 'react'

// Material Ui
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { TextField, InputAdornment, Switch, Dialog, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';

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

  const handleClose = useCallback(() => {
    console.log("aaa");
    setOpen(false);
  }, [setOpen]);

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
          <form>
            <div>
              <TextField
                id='amount'
                inputRef={ref}
                label='Amount'
                required
              />
              <TransactionSwitch />
            </div>
            <TextField
              id='Description'
              label='Description'
              fullWidth
              value=''
              required='true'
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
