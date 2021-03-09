import React from 'react'

// Material Ui
import Typography from '@material-ui/core/Typography'
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp'
import ArrowDropUpSharpIcon from '@material-ui/icons/ArrowDropUpSharp'

const Filter = ({ value, sortLatest, sortDsc, handleSortDate, handleSortAmount, text, sortText }) => {
  const textItem = {
    display: 'flex',
    flexDirection: 'row',
    textTransform: 'uppercase',
  };

  const sortItem = {
    display: 'flex',
    flexDirection: 'row',
    textTransform: 'uppercase',
    cursor: 'pointer',
  };

  const alignItem = {
    alignSelf: 'center',
  };

  return (
    <div className='transaction_header'>
      {value === 0 ? (
          <Typography variant='body2'style={textItem} >{text}</Typography>
      ) : (
        <div style={sortItem} onClick={handleSortDate}>
          <Typography variant='body2' style={alignItem}>
            {sortText ? sortText : 'date'}
          </Typography>
          {sortLatest ? <ArrowDropDownSharpIcon /> : <ArrowDropUpSharpIcon />}
        </div>
      )}
      <div style={sortItem} onClick={handleSortAmount}>
        <Typography variant='body2' style={alignItem}>
          Amount
        </Typography>
        {sortDsc ? <ArrowDropDownSharpIcon /> : <ArrowDropUpSharpIcon />}
      </div>
    </div>
  );
};

export default Filter;
