import React from 'react';
import { numberEuro, formatAmount } from '../utils/format';
import { getWeekDate } from '../utils/calculation';

const List = ({ transaction }) => {
  const income = formatAmount(transaction.income),
        expense = formatAmount(transaction.expense);

  const listText = { minWidth: '80px' };
  const listSubText = { fontSize: '12px' };

  return (
    <li>
      <div style={listText}>
        <p>{transaction.text}</p>
        {transaction.text.startsWith('Week') && (
          <p className='list-date' style={listSubText}>
            {getWeekDate(transaction.index)}
          </p>
        )}
      </div>

      <div className='list-amount block-amount'>
        <span className='block positive'>
          {transaction.income === 0 ? '-' : '+' + numberEuro(income)}
        </span>
        <span className='block negative expense-amount'>
          {transaction.expense === 0 ? '-' : '-' + numberEuro(expense)}
        </span>
      </div>
    </li>
  );
};

export default List;
