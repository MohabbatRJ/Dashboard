import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';

// Create the context
const TableContext = createContext();

export const useTableContext = () => useContext(TableContext);

export const TableProvider = ({ children, value }) => {
    // console.log('children', children)
    // console.log('value', value)
    return (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
};

TableProvider.propTypes = {
    children: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
}