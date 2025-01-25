import PropTypes from 'prop-types';
import { memo, useCallback, useMemo, useState } from 'react';
import { TableProvider } from '../TableContext';
import DataCards from '../../../../components/common/data-cards/DataCards';

function DashboardProductDeliveryTable({ tableData }) {
    const [dropdownItems, setDropdownItems] = useState([
        { label: 'Download Report', value: 'Download Report', selected: false },
        { label: 'Export', value: 'Export', selected: false },
        { label: 'Import', value: 'Import', selected: false },
    ]);

    const handleDropdownSelection = useCallback((value) => {
        setDropdownItems((prevItems) =>
            prevItems.map((item) =>
                item.value === value
                    ? { ...item, selected: true }
                    : { ...item, selected: false }
            )
        );
    }, []);

    // eslint-disable-next-line no-unused-vars
    const dropdownProps = useMemo(() => ({
        label: 'Report',
        menuName: 'productDeliveryDropdownMenu',
        position: "right-0 top-0",
        items: dropdownItems,
        handleSelection: handleDropdownSelection,
        arrow: true
    }), [dropdownItems, handleDropdownSelection]);
    const viewAll = useCallback(() => {
        console.log('generate')
    }, [])
    // eslint-disable-next-line no-unused-vars
    const headerButton = useMemo(() => ({
        label: 'View All',
        buttonName: 'ViewAll',
        type: 'button',
        css: "py-2 px-0 text-primary-700 text-xs font-bold rounded-md hover:text-primary-500 transition duration-1000 ease-in-out",
        handleSelection: viewAll,
        icon: 'fa-solid fa-arrow-right',
        use: 'link'
    }), [viewAll]);

    const tableTitle = "Product Delivery";
    

    return (
        <>
            <TableProvider
                value={{
                    dropdownProps: false,
                    headerButton: headerButton,
                    tableData: tableData,
                    tableTitle: tableTitle,
                }}>
                <DataCards />
            </TableProvider>
        </>
    );
}

DashboardProductDeliveryTable.propTypes = {
    tableData: PropTypes.array.isRequired,
};

export default memo(DashboardProductDeliveryTable);
