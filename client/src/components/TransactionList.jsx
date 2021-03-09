import React, { useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import { transitionConfig } from '../utils/animation';

import { CircularProgress } from '@material-ui/core'

// Compoentns
import ListItem from './ListItem'

const TransactionList = () => {
  const { transactions, getTransactions, resetTransaction, loading } = useContext(GlobalContext)
  const lists = transactions

  useEffect(() => {
    getTransactions();
    resetTransaction()
  }, []);

  return (
    <section className='transaction'>
      <div className='transaction_header'>
        <div className='transaction_sort'>today▼</div>
        <div className='transaction_sort'>amount▼</div>
      </div>
       {lists.length > 0 ? (
        <ul className='transaction_lists'>
          {lists.map(( list) => (
            <animated.div>
              <ListItem data={list}/>
            </animated.div>
          ))}
        </ul>
        ) : (
          <ul className='transaction_lists'>
            {loading
              ? (<CircularProgress/>)
              : (<p>No recent transaction</p>)}
          </ul>
        )}
    </section>
  )
}

export default TransactionList
