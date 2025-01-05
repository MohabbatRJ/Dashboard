import DropdownNew from '../../dropdown/DropdownNew';
import { useTableContext } from '../../../../pages/dashboard/dashboard-component/TableContext';

function TableHeader() {
    const { tableTitle, dropdownProps } = useTableContext();
    const { label, menuName, position, items, handleSelection, arrow } = dropdownProps;
    return (
        <>
            <div className="flex items-center justify-between w-100 p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                <span className="text-black dark:text-gray-100 font-semibold text-sm">
                    {tableTitle}
                </span>
                <DropdownNew
                    label={label}
                    dropdownMenuName={menuName}
                    items={items}
                    position={position}
                    buttonFunc={handleSelection}
                    arrowIcon={arrow}
                />
            </div>
        </>
    )
}

export default TableHeader
