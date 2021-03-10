import React, { Fragment } from 'react'

// Components
import TransactionList from '../components/TransactionList'
import PieChart from '../components/Chart/PieChart'

// Material UI
import { Tabs, Tab } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles"
import { Button, ButtonGroup, CircularProgress } from '@material-ui/core'

const Selector = ({ types, selected, setSelected }) => {
  const style = {
    buttonGroup: {
      background: '#65BCBF',
      borderRadius: 0
    },
    button: {
      borderRadius: 0,
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
  };

  const handleSelect = useCallback((type) => (event) => {
    setSelected(type);
  }, [setSelected]);

  return (
    <ThemeProvider theme={whiteTheme}>
      <ButtonGroup
        color='primary'
        style={style.buttonGroup}
        aria-label='selectors'
        fullWidth disableRipple
      >
        {types.map(type => (
          <Button
            key={type}
            variant={selected === type ? 'contained' : null}
            color={selected === type ? 'primary' : 'secondary'}
            onClick={handleSelect(type)}
            style={style.button}
            disableElevation disableFocusRipple disableRipple
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
    </ThemeProvider>
  )
}

const Transactions = () => {
  const { transactions, getTransaction, getTransactions, loading, resetTransaction } = useContext(GlobalContext);
  const timeFilters = ['day', 'week', 'month', 'year']
  const [value, setValue] = useState(0)

  const transFilters = ['all', 'income', 'expense'],
        [selected, setSelected] = useState('all');

  const [sortColumn, setSortColum] = useState('date'),
        [sortLatest, setSortLatest] = useState(true),
        [sortDsc, setSortDsc] = useState(true);

  const amounts = transactions.map(({ amount }) => amount)
  const income = +amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = +(amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  const ratio = income > expense ? ((expense / income) * 100).toFixed(0) : 100;
  const data = [ratio, 100 - ratio];
  const noData = (income === 0.0) & (expense === 0.0);

  const width = 120,
        height = 120;
  const outerRadius = width / 2,
    innerRadius = outerRadius - 6;

  const lists = transactions
    .filter(({ date }) => checkRecent(date))
    .sort((a, b) => sortDateAmount(a, b, sortColumn, sortLatest, sortDsc));

  const transition = useTransition(
    lists,
    list => list._id,
    transitionConfig(86, 100),
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
    getTransaction(timeFilters[value])
    resetTransaction()
  }, [value]);

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
