import CountUp from 'react-countup';
import PropTypes from 'prop-types';

function AnimatedCounter({ start, end, usd }) {
  
  return (
    <>
    <CountUp className='text-black-500 dark:text-white' data-target="98851.35" start={start} end={end} duration={2} decimals={2} decimal="." prefix={usd ? '$':''}/>
    </>
  );
}

AnimatedCounter.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  usd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};

export default AnimatedCounter;
