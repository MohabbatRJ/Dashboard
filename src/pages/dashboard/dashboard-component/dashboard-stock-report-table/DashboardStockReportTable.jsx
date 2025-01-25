import PropTypes from 'prop-types';
import DataTable from '../../../../components/common/data-table/DataTable';
import { memo, useCallback, useMemo, useState } from 'react';
import { TableProvider } from '../TableContext';

function DashboardStockReportTable({ tableData, pagination, currencySign }) {
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

    // eslint-disable-next-line no-unused-vars
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
    const headerButton = useMemo(() => ({
        label: 'Generate Report',
        buttonName: 'StockReport',
        type: 'button',
        css: "py-2 px-6 bg-primary-100 text-primary-500 text-xs font-bold rounded-md hover:bg-primary-200 transition duration-1000 ease-in-out",
        handleSelection: generateReport,
        icon: 'fa-regular fa-file-lines',
        use: 'pdfDownload'
    }), [generateReport]);

    const hasCheckbox = false;
    const tableTitle = "Stock Reports";
    const statusColorMap = useMemo(() => ({
        "Low Stock": 'text-yellow-500 bg-yellow-100',
        "In Stock": 'text-green-500 bg-green-100',
        'Out of Stock': 'text-primary-500 bg-primary-100',
    }), []);

    const columns = useMemo(() => [
        {
            key: 'product_id',
            label: 'Product ID',
            isLink: true,
            link: (value, row) => `/products/${row.product_id}`,
        },
        {
            key: 'product',
            label: 'Product Name',
            isLink: true,
            link: (value, row) => `/products/${row.product_id}`,
        },
        {
            key: 'amount',
            label: 'Amount',
            render: (value) => `${currencySign[value.currency]}${value.total_amount}`,
        },
        { key: 'updated_date', label: 'Updated Date', render: (value) => new Date(value).toLocaleDateString(), },
        { key: 'quantity', label: 'Quantity', render: (value, row) => row.quantity },
        {
            key: 'stock_status',
            label: 'Stock Status',
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
                    dropdownProps: false,
                    headerButton: headerButton,
                    tableData: tableData,
                    pagination: pagination,
                    currencySign: currencySign,
                    hasCheckbox: hasCheckbox,
                    tableTitle: tableTitle,
                    columns: columns,
                }}>
                <DataTable />
            </TableProvider>
        </>
    );
}

DashboardStockReportTable.propTypes = {
    tableData: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    currencySign: PropTypes.object.isRequired,
};

export default memo(DashboardStockReportTable);
