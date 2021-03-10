import React, { useContext, Fragment } from 'react'

// Contexts
import { GlobalContext } from '../context/GlobalState'

// Components
import TransactionList from '../components/TransactionList'
import TotalAmount from '../components/TotalAmount'
import IncExpAmount from '../components/IncExpAmount'

const Dashboard = () => {
  const { transactions } = useContext(GlobalContext)
  const amounts = transactions.map(transaction => transaction.amount)
  return (
    <Fragment>
      <header className='header'>
        <TotalAmount amounts={amounts} />
        <IncExpAmount amounts={amounts} />
      </header>
      <TransactionList/>
    </Fragment>
  )
}
export default Dashboard
