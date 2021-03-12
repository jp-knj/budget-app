import React, { useRef, useEffect } from 'react'
import CountUp from 'react-countup'
import { v4 as id } from 'uuid'

const IncExpEachAmount = ({ amounts }) => {
  const income = +amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)

  const expense = +(amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)

  const prevIncomeRef = useRef()
  const prevExpenseRef = useRef()

  useEffect(() => {
    prevIncomeRef.current = income
    prevExpenseRef.current = expense
  })

  const prevIncome = prevIncomeRef.current
  const prevExpense = prevExpenseRef.current

  const lists = [
    { title: 'income', prefix: '+', start: prevIncome, end: income },
    { title: 'expense', prefix: '-', start: prevExpense, end: expense },
  ];

  return (
    <div className='budget_content'>
      {lists.map(({ title, prefix, start, end }) => (
      <div key={id()}>
        <p className="budget_title">{title}</p>
        <CountUp
          className='budget_value-sub'
          prefix={prefix}
          start={start}
          end={end}
          separator='.'
          duration={0.5}
        />
      </div>
      ))}
    </div>
  );
};

export default IncExpEachAmount
