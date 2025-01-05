import { memo } from 'react';
import InputCheckbox from './InputCheckbox'
import { useTableContext } from '../../../../pages/dashboard/dashboard-component/TableContext';

function TableHead() {
    const {hasCheckbox, columns } = useTableContext();
    return (
        <>
            <thead className=" text-gray-600 capitalized bg-primary-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {
                        hasCheckbox && 
                        <th className="px-3 py-3 max-w-60">
                            <InputCheckbox />
                        </th>
                    }
                    {
                        columns.map((head, index) => {
                            return (
                                <th key={index} className="px-3 py-3 max-w-60 text-sm font-semibold">
                                    {head.label}
                                </th>
                            )
                        })
                    }
                </tr>
            </thead>
        </>
    )
}

export default memo(TableHead)
