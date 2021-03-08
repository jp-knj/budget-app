import React, { useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import { CircularProgress } from '@material-ui/core';

const TransactionList = () => {
  const { transactions, getTransactions, loading } = useContext(GlobalContext);
  const lists = transactions;
  useEffect(() => {
    getTransactions();
  }, []);

  const listItems = lists.map(
    (list) =>
      <li>{list.text}</li>
  );
  console.log(lists);
  return (
    <section className='transaction'>
      <div className='transaction_header'>
        <div className='transaction_sort'>today▼</div>
        <div className='transaction_sort'>amount▼</div>
      </div>
       {lists.length > 0 ? (
        <ul className='transaction_lists'>
          {lists.map((list) => (
          <li className='transaction_list'>
            <div>
              <h3>{list.text}</h3>
              <p>{list.createdAt}</p>
            </div>
            <div className="positive">
              +{list.amount} 円
            </div>
          </li>
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
