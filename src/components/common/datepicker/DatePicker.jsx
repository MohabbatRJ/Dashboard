import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';

function DatePicker({mode, onChange, initialDateRange}) {
    const [dateRange, setDateRange] = useState(initialDateRange);

  useEffect(() => {
    if (dateRange.length === 2) {
      onChange(dateRange);
    }
  }, [dateRange, onChange]);
  
  return (
    <>
      <Flatpickr
        options={{
          dateFormat: 'd-M-Y',
          mode: mode,
          defaultDate: dateRange,
          enableTime: false,
        }}
        onChange={
            (selectedDates) => setDateRange(selectedDates.map(date => date.toISOString().split('T')[0]))
        }
        className="w-full ps-3 pr-10 py-2 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary-700 cursor-pointer flatpickr-input active"
        readOnly
        data-range-date="true"
        data-deafult-date={dateRange.join(',')}
        data-date-format="d M, Y"
        // defaultValue={dateRange}
      />
    </>
  );
}

DatePicker.propTypes = {
  mode: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  initialDateRange: PropTypes.array.isRequired,
  // defaultValue: PropTypes.array,
};

export default DatePicker;
