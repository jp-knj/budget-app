import React, {Fragment} from 'react'

import TransactionList from '../components/TransactionList'

const Dashboard = () => {
  return (
    <Fragment>
      <header className='header'>
        <section className="budget">
          <div className="budget_inner">
              <p className="budget_title">Total Balance</p>
              <span className="budget_value">5000円</span>
            <div className='budget_box'>
              <div className='budget_items'>
                <p className="budget_title">Income</p>
                <span className="budget_value-sub">5000円</span>
              </div>
              <div className='budget_items'>
                <p className="budget_title">Expense</p>
                <span className="budget_value-sub">5000円</span>
              </div>
            </div>
          </div>
        </section>
      </header>
      <TransactionList/>
    </Fragment>
  )
}
export default Dashboard
