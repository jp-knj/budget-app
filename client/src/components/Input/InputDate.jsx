
import React from 'react'

// Material Ui
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

// Data
import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'

const InputDate = ({ date, handleDate }) => {
  const dateFormat = 'd MMM, yyyy'
  class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
      return format(date, dateFormat, { locale: this.locale })
    }
  }
  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils}>
      <KeyboardDatePicker
        id='date'
        label='Date'
        value={date}
        format={dateFormat}
        className='form_input'
        onChange={handleDate}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
        fullWidth
      />
    </MuiPickersUtilsProvider>
  )
}

export default InputDate
