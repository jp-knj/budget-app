import moment from 'moment'

export function checkRecent(d) {
  const date = moment(d);
  if (date) return true;
  return false;
}

export function sortDateDsc(a, b) {
  let dateA = new Date(a.date);
  let dateB = new Date(b.date);

  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
}

export function sortDateAsc(a, b) {
  let dateA = new Date(a.date);
  let dateB = new Date(b.date);

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

export function sortAmountDsc(a, b) {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
}

export function sortAmountAsc(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function sortDateAmount(a, b, sortColumn, sortLatest, sortDsc) {
  if (sortColumn === 'date') {
    return sortLatest
      ? sortDateDsc(a, b)
      : sortDateAsc(a, b);
  }
  return sortDsc
    ? sortAmountDsc(a.amount, b.amount)
    : sortAmountAsc(a.amount, b.amount);
};
