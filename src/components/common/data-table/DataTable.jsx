import TableHeader from './data-table-component/TableHeader';
import TableHead from './data-table-component/TableHead';
import TableBody from './data-table-component/TableBody';
import TablePagination from './data-table-component/TablePagination';
import { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

const DataTable = ({ ...dropdownProps }) => {
    
    const renderCellContent = useCallback((column, value, dataRow) => {
        if (column.render) {
            return column.render(value, dataRow);
        }
        else if (Array.isArray(value)) {
            return (
                <div className="flex flex-col">
                    <div className="flex items-center">
                        {value[0].item_photo && (
                            <img
                                src={value[0].item_photo}
                                alt={`${value[0].item_name}'s Avatar`}
                                className="w-7 h-7 rounded-full mr-2"
                            />
                        )}
                        <NavLink
                            to={column.link(value, dataRow)}
                            className="font-medium text-primary-600 dark:text-primary-500 hover:text-primary-700"
                        >
                            {value[0].item_name}
                        </NavLink>
                    </div>
                </div>
            );
        } else if (typeof value === 'object' && value !== null && column.isLink && column.link) {
            return (
                <div className="flex items-center">
                    {value.profile_photo && (
                        <img
                            src={value.profile_photo}
                            alt={`${value.first_name}'s Avatar`}
                            className="w-7 h-7 rounded-full mr-2"
                        />
                    )}
                    <NavLink
                        to={column.link(value, dataRow)}
                        className="font-medium text-primary-600 dark:text-primary-500 hover:text-primary-700"
                    >
                        {value.first_name + ' ' + value.last_name || value.customer_id}
                    </NavLink>
                </div>
            );
        }
        if (column.isLink && column.link) {
            return (
                <NavLink
                    to={column.link(value, dataRow)}
                    className="font-medium text-primary-600 dark:text-primary-500 hover:text-primary-700"
                >
                    {value}
                </NavLink>
            );
        }

        return value;
    }, []);

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <TableHeader
                {...dropdownProps}
            />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <TableHead/>
                <tbody>
                    <TableBody
                        renderCellContent={renderCellContent}
                    />
                </tbody>
            </table>
            <TablePagination/>
        </div>
    )
}

export default memo(DataTable)
