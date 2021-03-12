import React, { useCallback } from 'react'

// Material Ui
import { Tabs, Tab } from '@material-ui/core'

const DateTabs = ({ types, value, setValue }) => {
  const handleSwitch = useCallback(
    (index) => (event) => {
      setValue(index);
    },
    [setValue]
  );

  return (

    <Tabs value={value} variant='fullWidth' aria-label='tabs' className='tab-line'>
      {types.map((type, index) => (
      <Tab
        key={type}
        label={type}
        onClick={handleSwitch(index)}
        disableFocusRipple
        disableRipple
      />
      ))}
    </Tabs>
  );
};

export default DateTabs
