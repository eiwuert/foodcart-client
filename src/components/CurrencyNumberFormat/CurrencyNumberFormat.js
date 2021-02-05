import PropTypes from 'prop-types';

const CurrencyNumberFormat = (props) => {
  const { value, difference } = props;
  const string = (Math.abs(value) / 100).toFixed(2).toString().replace('.', ',');
  const pefix = difference ? (value >= 0 ? '(+' : '(-') : '';
  const suffix = difference ? ' €)' : ' €';
  return value ? pefix + string + suffix : difference ? '' : 'Gratis';
};

CurrencyNumberFormat.propTypes = {
  difference: PropTypes.any,
  value: PropTypes.any
};

export default CurrencyNumberFormat;
