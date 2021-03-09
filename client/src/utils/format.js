export function numberEuro(x) {
  return x.toString()
    .replace(/\./, ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function numberValid(x) {
  return /^(\d+|\d{1,3}(\.\d{3})*)(,\d{1,2})?$/.test(x);
}

export function numberCalc(x) {
  return Number(x.replace(/\./g, '').replace(/,/, '.'));
}
