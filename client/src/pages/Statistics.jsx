import React, { useState, useEffect, useContext } from 'react';
import { animated } from 'react-spring';
import moment from 'moment';
import { v4 as id } from 'uuid';
import { GlobalContext } from '../context/GlobalState';
import { sortAmountAsc } from '../utils/calculation';
import DateTabs from '../components/DateTabs'
import List from '../components/List'
import BarChart from '../components/Chart/BarChart'
import { CircularProgress } from '@material-ui/core';

const Statistics = () => {
  const { loading, transactions, getTransactions, resetTransaction } = useContext(GlobalContext);
  const [value, setValue] = useState(0);
  const timeFilters = ['week', 'month', 'year'];
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
    resetTransaction();
    getTransactions();
  }, []);

  return (
    <>
      <div className="header">
      <DateTabs types={timeFilters} value={value} setValue={setValue} />
        <div className="statistics" style={{ height: '230px' }}>
          {combinedLists.length > 0 ? (
            <BarChart
              data={combinedLists}
              keys={allKeys}
              select={value}
              height='180'
              width={window.innerWidth > 320 ? 350 : 288}
              />
          ) : (
            <div className='loading'>
              <p className='loading-white'>
                    No transaction
              </p>
            </div>
          )}
      </div>
      </div>
      <section className='transaction'>
        <div className='transaction_lists'>
        {combinedLists.length > 0 ? (
        <ul className='list'>
          {combinedLists.map((item) => (
          <animated.div>
            <List transaction={item}/>
          </animated.div>
          ))}
        </ul>
        ) : (
        <div className='transaction_circular'>
          {loading
            ? (<CircularProgress/>)
            : (<p>No transaction of the {timeFilters[value]}</p>)
          }
        </div>
        )}
        </div>
      </section>
    </>
  );
};

export default Statistics
