import React, { useState, useContext, useCallback, Fragment } from 'react'
import { useSpring, config, animated } from 'react-spring'
import { GlobalContext } from '../context/GlobalState'

// Material Ui
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import EditSharpIcon from '@material-ui/icons/EditSharp'

import moment from 'moment'

// Components
import TransactionForm from './TransactionForm'

const ListItem = ({ data }) => {
  const [showMenu, setshowMenu] = useState(false),
        [open, setOpen] = useState(false);
  const formatDate = (date) => moment(date).format('D MMM, YYYY')
  const sign = !data.amount ? null : data.amount > 0 ? '+' : '',
        color = !data.amount ? 'zero' : data.amount > 0 ? 'positive' : 'negative';

  const handleShowForm = useCallback(() => {
    setOpen(true);
  }, [])
  return (
    <Fragment>
      <animated.li className='transaction_list'>
        <div>
          <div>
            <DeleteSharpIcon/>
          </div>
          <div onClick={handleShowForm}>
            <EditSharpIcon/>
          </div>
        </div>
        <div>
          <h3>{data.text}</h3>
          <p>{formatDate(data.createdAt)}</p>
        </div>
        <div className={`${color}`}>
          {sign}{data.amount} 円
        </div>
      </animated.li>
      <TransactionForm data={data} open={open} setOpen={setOpen} action='edit' />
    </Fragment>
  )
}

export default ListItem
