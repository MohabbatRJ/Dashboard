import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import DashboardCard from './dashboard-component/DashboardCard'
import DashboardTopSalesMap from './dashboard-component/dashboard-top-sale/DashboardTopSalesMap'
import DashboardTopSaleHeader from './dashboard-component/dashboard-top-sale/DashboardTopSaleHeader';
import DashboardTopSaleTable from './dashboard-component/dashboard-top-sale/DashboardTopSaleTable';

import { fetchCurrencySymbols } from '../../utils/currencyUtils'
import { fetchCountryDetailsAndFlags } from '../../utils/countryUtils';

import { showNotification } from '../../utils/notificationUtils';
import { fetchDashboardMetrics } from '../../store/actions/dashboardActions/dashbaordFetch/dashboardMetricsFetch';
import Loading from '../../components/common/loading/Loading';
import DashboardRevenue from './dashboard-component/dashboard-revenue/DashboardRevenue';
import DashboardPurchaseNotification from './dashboard-component/dashboard-revenue/DashboardPurchaseNotification';
import DashboardRecentOrderTable from './dashboard-component/dashboard-recent-order-table/DashboardRecentOrderTable';
import { fetchRecentOrders } from '../../store/actions/recentOrdersAction/recentOrdersFetch/recentOrdersFetch';

function Dashboard() {
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState([]);
  const [countrySale, setCountrySale] = useState([]);
  const [currencySign, setCurrencySign] = useState({});

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { metrics, loading: dashboardLoading, error: dashboardError } = useSelector(state => state.dashboard);
  const { recentOrders, pagination, loading: recentOrdersLoading, error: recentOrdersError } = useSelector(state => state.recentOrders);
  const isLoading = dashboardLoading || recentOrdersLoading;
  const isError = dashboardError || recentOrdersError;


  const { summaryMetrics, salesByCountry, topSellingProducts, monthlyRevenue, topSalesMetrics } = metrics;
  const { period = 0, value = 0 } = topSalesMetrics;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchRecentOrders(1));
    }
  }, [isLoggedIn, dispatch]);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchDashboardMetrics());
      dispatch(fetchRecentOrders(1));
    }
  }, [isLoggedIn, dispatch]);



  useEffect(() => {
    const fetchData = async () => {

      if (salesByCountry.length === 0) return;

      const primaryCountryObj = salesByCountry.find(country => country.isPrimaryDestination === true);
      if (!primaryCountryObj) return;

      const countries = salesByCountry.map((country) => country.country);

      try {
        const { countryData, countryFlagMap } = await fetchCountryDetailsAndFlags(countries);
        // Update sales data with flags
        const updatedSalesData = salesByCountry.map((country) => ({
          ...country,
          flag: countryFlagMap[country.country] || '',
        }));
        const primaryCountry = primaryCountryObj.country;
        const updatedCountryData = countryData.map((country) => ({
          ...country,
          isPrimaryDestination: country.name.common === primaryCountry,
        }));

        setCountryData(updatedCountryData);
        setCountrySale(updatedSalesData)
      } catch (error) {
        showNotification("Error", "Error fetching country data!", "danger");
      }
    };

    fetchData();
  }, [topSellingProducts, salesByCountry]);

  useEffect(() => {
    const fetchCurrency = async () => {
      const vendors = recentOrders.map((vendor) => vendor.fulfilled_by.vendor_country);
      try {
        const vendorCurrency = await fetchCurrencySymbols(vendors);
        setCurrencySign(vendorCurrency);
      } catch (error) {
        console.error("Error fetching vendor currencies:", error);
      }
    };
    if (recentOrders.length) fetchCurrency();
  }, [recentOrders]);
 
  sessionStorage.clear();
  return (
    <>
      <section className="dashboard min-h-screen px-4 py-8 dark:bg-gray-800 ">
        <div className="container-fluid">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-auto grid-rows-auto gap-4">
            <div className="grid lg:grid-cols-1 grid-cols-auto gap-4">
              <DashboardCard summaryMetrics={summaryMetrics} error={isError} />
            </div>
            <div className="grid grid-cols-auto grid-rows-auto border border-gray-200 dark:border-gray-700 rounded-md">
              <DashboardTopSalesMap countryData={countryData} />
              <DashboardTopSaleHeader salePeriod={period} totalSales={value} />
              <DashboardTopSaleTable countrySale={countrySale} />
            </div>
            <div className='lg:col-span-2 grid lg:grid-cols-auto grid-rows-auto border border-gray-200 dark:border-gray-700 rounded-md'>
              <DashboardRevenue revenueTrend={monthlyRevenue} />
            </div>
            <div className="lg:col-span-2 grid lg:grid-cols-auto grid-rows-auto border border-gray-200 dark:border-gray-700 rounded-md">
              <DashboardPurchaseNotification />
            </div>
            <div className="lg:col-span-2 grid lg:grid-cols-auto grid-rows-auto border border-gray-200 dark:border-gray-700 rounded-md">
              <DashboardRecentOrderTable tableData={recentOrders} pagination={pagination} currencySign={currencySign} loading={isLoading} />
            </div>
          </div>
        </div>
      </section>
      <Loading loading={isLoading} />
    </>
  )
}

export default memo(Dashboard);
