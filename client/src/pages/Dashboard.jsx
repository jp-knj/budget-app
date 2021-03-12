import React, { useState, useContext, useEffect, Fragment, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
// Contexts
import { GlobalContext } from '../context/GlobalState'

// Utils
import { checkRecent, sortDateAmount } from '../utils/calculation'
import { transitionConfig } from '../utils/animation'

// Components
import TotalAmount from '../components/TotalAmount'
import IncExpAmount from '../components/IncExpAmount'
import Filter from '../components/Filter'
import ListItem from '../components/ListItem'

// Material Ui
import { CircularProgress } from '@material-ui/core'

const Dashboard = () => {
  const { loading, transactions, getTransactions, resetTransaction } = useContext(GlobalContext);
  const [sortColumn, setSortColum] = useState('date'),
        [sortLatest, setSortLatest] = useState(true),
        [sortDsc, setSortDsc] = useState(true);
  const amounts = transactions.map(transaction => transaction.amount);

  const lists = transactions
    .filter(({ date }) => checkRecent(date))
    .sort((a, b) => sortDateAmount(a, b, sortColumn, sortLatest, sortDsc));

  const transition = useTransition(
    lists,
    list => list._id,
    transitionConfig(86, 200),
  );

  const handleSortDate = useCallback(() => {
    setSortLatest(!sortLatest);
    setSortColum('date');
  }, [sortLatest]);

  const handleSortAmount = useCallback(() => {
    setSortDsc(!sortDsc);
    setSortColum('amount');
  }, [sortDsc]);


  useEffect(() => {
    resetTransaction();
    getTransactions();
  }, []);

  return (
    <Fragment>

      <header className='header'>
        <div className='budget_inner'>
          <TotalAmount amounts={amounts} />
          <IncExpAmount amounts={amounts} />
        </div>
      </header>

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
          {lists.map((item) => (
            <animated.div>
              <ListItem data={item} date='relative'/>
            </animated.div>
          ))}
          </ul>
          ) : (
          <div className='list-status'>
            {loading
            ? (<CircularProgress color='primary' />)
            : (<p>No recent transaction</p>)}
          </div>
        )}
      </section>
    </Fragment>
  )
}
export default Dashboard
