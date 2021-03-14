import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import { checkRecent, sortDateAmount } from '../utils/calculation';
import { GlobalContext } from '../context/GlobalState'

import { CircularProgress } from '@material-ui/core'

// Compoentns
import Filter from './Filter'
import ListItem from './ListItem'

import { transitionConfig } from '../utils/animation'

const TransactionList = () => {
  const { transactions, getTransactions, resetTransaction, loading } = useContext(GlobalContext)
  const [sortColumn, setSortColum] = useState('date'),
        [sortLatest, setSortLatest] = useState(true),
        [sortDsc, setSortDsc] = useState(true);

  const lists = transactions
    .filter(({ date }) => checkRecent(date))
    .sort((a, b) => sortDateAmount(a, b, sortColumn, sortLatest, sortDsc));

  const transition = useTransition(
    lists,
    list => list._id,
    transitionConfig(86, 100),
   )

  const handleSortDate = useCallback(() => {
    setSortLatest(!sortLatest);
    setSortColum('date');
  }, [sortLatest]);

  const handleSortAmount = useCallback(() => {
    setSortDsc(!sortDsc);
    setSortColum('amount');
  }, [sortDsc]);

  useEffect(() => {
    getTransactions();
    resetTransaction()
  }, []);

  return (
    <section className='transaction'>
      <Filter
        sortLatest={sortLatest}
        sortDsc={sortDsc}
        handleSortDate={handleSortDate}
        handleSortAmount={handleSortAmount}
        sortText='recent'
      />
       {lists.length > 0 ? (
        <ul className='transaction_lists'>
          {transition.map((list) => (
            <animated.div>
              <ListItem data={list} date/>
            </animated.div>
          ))}
        </ul>
        ) : (
          <ul className='transaction_circular'>
            {loading
              ? (<CircularProgress/>)
              : (<p className="transaction_text">No recent transaction</p>)
            }
          </ul>
        )}
    </section>
  )
}

export default TransactionList
