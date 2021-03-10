import React, { useState, useEffect, useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'
// Utils
import { sortAmountAsc } from '../utils/calculation'
// libs
import { v4 as id } from 'uuid'
import moment from 'moment'
// Components
import NewTabs from '../components/NewTabs'
import BarChart from '../components/Chart/BarChart'

const Statistics = () => {
  const { loading, transactions, getTransactions, resetTransaction } = useContext(GlobalContext);
  const [value, setValue] = useState(0)
  const timeFilters = ['week', 'month', 'year']
  const allKeys = ['income', 'expense'];
  const combinedLists = [];
  const group = [
    { order: 'e', filter: 'dddd' },
    { order: 'w', filter: 'w' },
    { order: 'MM', filter: 'MMMM' },
  ];

  const index = (date) =>
    moment(date).format(group[value]['order']);

  const format = (date) =>
    moment(date).format(group[value]['filter']);

  const filterDate = transactions.filter(({ date }) =>
    moment().isSame(date, timeFilters[value])
  );

  const sumAmount = Object.values(filterDate
    .reduce((result, { date, amount }) => {
      !result[format(date)]
        ? (result[format(date)] = {
            id: id(),
            index: +index(date),
            text: format(date),
            income: amount > 0 ? amount : 0,
            expense: amount < 0 ? amount : 0,
          })
        : amount > 0
        ? (result[format(date)].income += amount)
        : (result[format(date)].expense += amount);

      return result;
    }, {})
  );

  combinedLists.push(...sumAmount
    .sort((a, b) => sortAmountAsc(a.index, b.index)));

  if (value === 1) (combinedLists.forEach(
    list => (list['text'] = 'Week ' + list['text'])
  ));

  useEffect(() => {
    resetTransaction()
    getTransactions()
  }, []);
  return (
    <div className='header'>
      <section className="budget">
        <NewTabs types={timeFilters} value={value} setValue={setValue} />
        {combinedLists.length > 0 ? (
            <BarChart
              data={combinedLists}
              keys={allKeys}
              select={value}
              height='180'
              width={window.innerWidth > 320 ? 350 : 288}
            />
          ) : (
            <p >
              No transaction
            </p>
          )}
      </section>
    </div>
  )
}
export default Statistics
