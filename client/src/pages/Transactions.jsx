import React, { Fragment } from 'react'

// Components
import TransactionList from '../components/TransactionList'
import PieChart from '../components/Chart/PieChart'

// Material UI
import { Tabs, Tab } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles"
import { Button, ButtonGroup } from '@material-ui/core'

const Transaction = () => {
  return (
    <Fragment>
      <div className='header'>
        <section className="budget">
          <NewTabs
            types={timeFilters}
            value={value}
            setValue={setValue}
          />
          {selected === 'all' ? (
          <TotalAmount amounts={amounts} text={`${timeFilters[value]}ly balance`}/>
          ) : (
          <div className='chart'>
            <div className='chart_pie'>
              <div className='chart_box'>
                <p className='chart_percent'>{noData ? 0 : ratio}</p>
                <span>%</span>
              </div>
              <div className='chart_box'>
                <PieChart
                  data={noData ? [0, 100] : data}
                  width={width}
                  height={height}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                />
              </div>
            </div>
            <div className="">
              <IncExpAmount amounts={amounts}/>
            </div>
          </div>
          )}
          <Selector
            types={transFilters}
            selected={selected}
            setSelected={setSelected}
          />
        </section>
      </div>
      <TransactionList />
    </Fragment>
  )
}

export default Transactions
