import React, { useCallback, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/common/button/Button';
import DatePicker from '../../../../components/common/datepicker/DatePicker';
import DashboardRevenueChart from './DashboardRevenueChart';
import DashboardRevenueTotal from './DashboardRevenueTotal';
import DashboardReachCard from './DashboardReachCard';
import DropdownNew from '../../../../components/common/dropdown/DropdownNew';

const PERIOD_OPTIONS = ['All', '1M', '6M', '1Y'];
const DEFAULT_DATE_RANGE = ['01-Jan-2022', '31-Dec-2022'];

const DashboardRevenue = ({ revenueTrend }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('All');
    const [selectedDateRange, setSelectedDateRange] = useState(DEFAULT_DATE_RANGE);
    const [revenueTotal, setRevenueTotal] = useState([]);


    const filteredDataByPeriod = useCallback((period) => {
        switch (period) {
            case '1M': return revenueTrend.slice(-1);
            case '6M': return revenueTrend.slice(-6);
            case '1Y': return revenueTrend;
            default: return revenueTrend;
        }
    }, [revenueTrend]);

    const filterDataByDate = useCallback((periodData, range) => {
        const [startDate, endDate] = range.map(date => new Date(date));
        return periodData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= endDate;
        });
    }, []);

    const filteredRevenueTrend = useMemo(() => {
        const periodData = filteredDataByPeriod(selectedPeriod);
        const dateFilteredData = filterDataByDate(periodData, selectedDateRange);

        return dateFilteredData;
    }, [selectedPeriod, selectedDateRange, filteredDataByPeriod, filterDataByDate]);

    const calculateTotalRevenueByPeriod = useCallback((key) => {
        const allTotalRevenue = filteredRevenueTrend.reduce((sum, item) => sum + (item[key] || 0), 0);
        return allTotalRevenue;
    }, [filteredRevenueTrend]);

    const calculateRatioByPeriod = useCallback(() => {
        const totalEarnings = calculateTotalRevenueByPeriod('earnings');
        const totalRefunds = calculateTotalRevenueByPeriod('refunds');
        const profit = totalEarnings - totalRefunds;
        const ratioPercentage = totalEarnings ? (profit / totalEarnings) * 100 : 0;
        return ratioPercentage;
    }, [calculateTotalRevenueByPeriod]);

    useEffect(() => {
        const ratioPercentage = calculateRatioByPeriod();
        const totalDetails = [
            { key: 'orders', title: 'Orders', total: calculateTotalRevenueByPeriod('orders'), currency: "" },
            { key: 'earnings', title: 'Earnings', total: calculateTotalRevenueByPeriod('earnings'), currency: "USD" },
            { key: 'refunds', title: 'Refunds', total: calculateTotalRevenueByPeriod('refunds'), currency: "" },
            { key: 'conversionRatio', title: 'Conversion Ratio', total: ratioPercentage, currency: "" },
        ];
        setRevenueTotal(totalDetails);
    }, [calculateTotalRevenueByPeriod, calculateRatioByPeriod]);


    return (
        <section className="dashboard-card">
            <div className="card card-animate">
                <div className="card-header flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700 p-4">
                    <h3 className="capitalized font-medium text-black-400 text-xl fw-bold text-truncate mb-0">
                        Revenue
                    </h3>
                    <div className="button-group flex gap-2">
                        {PERIOD_OPTIONS.map(period => (
                            <Button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                type="button"
                                className={`bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-none rounded px-2 font-base ${selectedPeriod === period ? 'bg-primary-600' : ''}`}
                            >
                                {period}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="card-body p-4">
                    <div className="container-fluid">
                        <DashboardRevenueChart revenueData={filteredRevenueTrend} />
                        <div className="flex items-center gap-4 w-full">
                            <div className="inputDate relative w-full border border-grey-700 dark:border-white rounded">
                                <DatePicker
                                    mode="range"
                                    onChange={setSelectedDateRange}
                                    initialDateRange={selectedDateRange}
                                />
                                <i className="fa-regular fa-calendar-days bg-primary-700 text-white p-3 absolute top-0 right-0 rounded-r"></i>
                            </div>
                            <DropdownNew
                                label={'Report'}
                                dropdownMenuName={'revenueReportDropdownMenu'}
                                items={[
                                    { label: 'Download Report', value: 'Download Report', selected: false },
                                    { label: 'Export', value: 'Export', selected: false },
                                    { label: 'Import', value: 'Import', selected: false },
                                ]}
                                position={'right-0 top-0'}
                                arrowIcon={true}
                            />
                        </div>
                        <DashboardRevenueTotal revenueTotalPeriod={revenueTotal} />
                        <DashboardReachCard />
                    </div>
                </div>
            </div>
        </section>
    );
};

DashboardRevenue.propTypes = {
    revenueTrend: PropTypes.array.isRequired,
};

export default React.memo(DashboardRevenue);