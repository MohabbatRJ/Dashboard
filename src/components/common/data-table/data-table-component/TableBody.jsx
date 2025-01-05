import PropTypes from 'prop-types';
import InputCheckbox from './InputCheckbox'
import { memo } from 'react';
import { useTableContext } from '../../../../pages/dashboard/dashboard-component/TableContext';

function TableBody({ renderCellContent }) {

    const {hasCheckbox, tableData, columns } = useTableContext();

    return (
        <>
            {
                tableData.map((dataRow, rowIndex) => (
                    <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-gray-600">
                        {hasCheckbox && (
                            <td className="px-3 py-3 max-w-60">
                                <InputCheckbox />
                            </td>
                        )}
                        {columns.map((column) => (
                            <td
                                key={column.key}
                                className="px-3 py-4 max-w-60 break-words text-gray-600 font-semibold text-sm"
                            >
                                {renderCellContent
                                    ? renderCellContent(column, dataRow[column.key] ?? 'N/A', dataRow) // Use 'N/A' as fallback
                                    : dataRow[column.key] ?? 'N/A'}
                            </td>
                        ))}
                    </tr>
                ))
            }
        </>
    )
}

TableBody.propTypes = {
    // columns: PropTypes.array.isRequired,
    // tableData: PropTypes.array.isRequired,
    // hasCheckbox: PropTypes.bool.isRequired,
    renderCellContent: PropTypes.func.isRequired,
};
export default memo(TableBody)
