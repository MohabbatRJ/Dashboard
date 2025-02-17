import PropTypes from 'prop-types';
import DataTable from '../../../../components/common/data-table/DataTable';
import { memo, useCallback, useMemo, useState } from 'react';
import { TableProvider } from '../TableContext';

function DashboardRecentOrderTable({ tableData, pagination, currencySign }) {
    const [dropdownItems, setDropdownItems] = useState([
        { label: 'Today', value: 'Today', selected: true },
        { label: 'Yesterday', value: 'Yesterday', selected: false },
        { label: 'Last 7 Days', value: 'Last 7 Days', selected: false },
        { label: 'Last 30 Days', value: 'Last 30 Days', selected: false },
        { label: 'This Month', value: 'This Month', selected: false },
        { label: 'Last Month', value: 'Last Month', selected: false },
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
    const dropdownProps = useMemo(() => ({
        label: 'sort by',
        menuName: 'recentOrderDropdownMenu',
        position: "right-0 top-0",
        items: dropdownItems,
        handleSelection: handleDropdownSelection,
        arrow: true
    }), [dropdownItems, handleDropdownSelection]);

    const generateReport = useCallback(() => {
        console.log('generate')
    }, [])
    // eslint-disable-next-line no-unused-vars
    const headerButton = useMemo(() => ({
        label: 'Generate Report',
        buttonName: 'generateReport',
        type: 'button',
        css: "py-2 px-6 bg-primary-100 text-primary-500 text-xs font-bold rounded-md hover:bg-primary-200 transition duration-1000 ease-in-out",
        handleSelection: generateReport,
        icon: 'fa-regular fa-file-lines'
    }), [generateReport]);

    const hasCheckbox = false;
    const tableTitle = "Recent Orders";
    const statusColorMap = useMemo(() => ({
        Pending: 'text-yellow-500 bg-yellow-100',
        completed: 'text-green-500 bg-green-100',
        'Out Of Delivery': 'text-primary-500 bg-primary-100',
        New: 'text-blue-500 bg-blue-100',
    }), []);

    const columns = useMemo(() => [
        {
            key: 'order_id',
            label: 'Order ID',
            isLink: true,
            link: (value, row) => `/orders/${row.order_id}`,
        },
        {
            key: 'items',
            label: 'Product Name',
            isLink: true,
            link: (value, row) => `/products/${row.items[0].item_id}`,
        },
        {
            key: 'customer',
            label: 'Customer Name',
            isLink: true,
            link: (value, row) => `/customers/${row.customer.customer_id}`,
        },
        {
            key: 'payment',
            label: 'Amount',
            render: (value) => `${currencySign[value.currency]}${value.total_amount_paid}`,
        },
        { key: 'created_at', label: 'Order Date', render: (value) => new Date(value).toLocaleDateString(), },
        { key: 'shipping', label: 'Delivery Date', render: (value) => new Date(value.estimated_delivery).toLocaleDateString(), },
        { key: 'fulfilled_by', label: 'Vendor', render: (value) => value.vendor_country, },
        { key: 'ratings', label: 'Ratings', render: (value, row) => row.items[0].ratings, },
        {
            key: 'status',
            label: 'Status',
            render: (value) => (
                <span
                    className={`${statusColorMap[value] || 'text-gray-700 bg-gray-200'
                        } rounded px-2 py-1 text-[11px] font-bold leading-loose capitalize`}
                >
                    {value}
                </span>
            ),
        },
    ], [currencySign, statusColorMap]);

    return (
        <>
            <TableProvider
                value={{
                    dropdownProps: dropdownProps,
                    headerButton: false,
                    tableData: tableData,
                    pagination: pagination,
                    currencySign: currencySign,
                    hasCheckbox:hasCheckbox,
                    tableTitle: tableTitle,
                    columns: columns,
                }}>
                <DataTable/>
            </TableProvider>
        </>
    );
}

DashboardRecentOrderTable.propTypes = {
    tableData: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    currencySign: PropTypes.object.isRequired,
};

export default memo(DashboardRecentOrderTable);
