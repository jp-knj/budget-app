import React, { useRef, useEffect } from 'react'
import CountUp from 'react-countup'

import IncExpAmount from './IncExpAmount'

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
    <section className="budget">
      <div className="budget_inner">
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
        <div className='budget_box'>
          <IncExpAmount amounts={amounts} />
        </div>
      </div>
    </section>
  )
}
export default TotalAmount
