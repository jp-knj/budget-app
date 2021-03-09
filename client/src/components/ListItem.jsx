import React, { useState, useContext, useCallback, Fragment } from 'react'
import { useSpring, config, animated } from 'react-spring'

// Context
import { GlobalContext } from '../context/GlobalState'

// Material Ui
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import EditSharpIcon from '@material-ui/icons/EditSharp'

import moment from 'moment'

// Components
import TransactionForm from './TransactionForm'

const ListItem = ({ data }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [showMenu, setshowMenu] = useState(false),
        [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const formatDate = (date) => moment(date).format('D MMM, YYYY')
  const sign = !data.amount ? null : data.amount > 0 ? '+' : '',
        color = !data.amount ? 'zero' : data.amount > 0 ? 'positive' : 'negative';

  const buttonWidth = 70,
        paddingLeft = 15,
        totalWidth = buttonWidth * 2,
        travelY = paddingLeft + totalWidth;

  const menuBlock = {
    position: 'absolute',
    left: `-${travelY}px`,
    width: totalWidth,
    height: '100%',
  };

  const menuBtn = {
    width: buttonWidth,
    height: '100%',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
  };

  const props = useSpring({
    opacity: deleted ? 0 : 1,
    transform: showMenu
      ? `translate3d(${travelY}px, 0, 0)`
      : deleted
      ? 'translate3d(-2000px,0,0)'
      : 'translate3d(0px,0,0)',
    config: config.stiff,
    cursor: 'pointer',
  });

  const handleShowMenu = useCallback(() => {
    setshowMenu(!showMenu);
  }, [showMenu]);

  const handleDelete = useCallback((id) => (e) => {
    deleteTransaction(id);
    setDeleted(true);
  }, [deleteTransaction]);

  const handleShowForm = useCallback(() => {
    setOpen(true);
  }, [])
  return (
    <Fragment>
      <animated.li
        className='transaction_list'
        style={props}
        onClick={handleShowMenu}
      >
        <div style={menuBlock} >
          <div style={menuBtn} onClick={handleDelete(data._id)}>
            <DeleteSharpIcon className="icon-delete"/>
          </div>
          <div style={menuBtn} onClick={handleShowForm}>
            <EditSharpIcon className="icon-edit"/>
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
