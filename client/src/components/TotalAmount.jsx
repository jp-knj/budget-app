import React, { useRef, useEffect } from 'react'
import CountUp from 'react-countup'

const TotalAmount = ({ amounts, text = 'total balance' }) => {
  const total = +amounts
    .reduce((acc, item) => (acc += item), 0);

  const sign = total === 0 ? '' : total < 0 ? '-' : '+';
  const prevTotalRef = useRef();

  useEffect(() => {
    prevTotalRef.current = Math.abs(total);
  });

  const prevTotal = prevTotalRef.current;

  return (
    <div className="total_amount">
      <p className="budget_title">{text}</p>
      <CountUp
        className='budget_value'
        prefix={`${sign}`}
        suffix={`円`}
        start={prevTotal}
        end={Math.abs(total)}
        separator='.'
        duration={0.5}
      />
    </div>
  )
}
export default TotalAmount
