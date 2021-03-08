import React from 'react'

const TransactionList = () => {
  return (
    <section className='transaction'>
      <div className='transaction_header'>
        <div className='transaction_sort'>today▼</div>
        <div className='transaction_sort'>amount▼</div>
      </div>
      <ul className='transaction_lists'>
        <li className='transaction_list'>
          <div>
            <h3>Travel</h3>
            <p>In 8 hours</p>
          </div>
          <div className="positive">
            + 5000 円
          </div>
        </li>
        <li className='transaction_list'>
          <div>
            <h3>Food</h3>
            <p>In 8 hours</p>
          </div>
          <div className="negative">
            - 5000 円
          </div>
        </li>
        <li className='transaction_list'>
          <div>
            <h3>Travel</h3>
            <p>In 8 hours</p>
          </div>
          <div className="positive">
            + 5000 円
          </div>
        </li>
          <li className='transaction_list'>
          <div>
            <h3>Food</h3>
            <p>In 8 hours</p>
          </div>
          <div className="negative">
            - 5000 円
          </div>
        </li>
      </ul>
    </section>
  )
}

export default TransactionList
