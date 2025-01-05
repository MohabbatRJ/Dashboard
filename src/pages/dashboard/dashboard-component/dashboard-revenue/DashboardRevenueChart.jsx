
import React from 'react'
import Chart from 'react-apexcharts';

function DashboardRevenueChart({ revenueData }) {

    const orders = revenueData.map(item => item.orders);
    const refunds = revenueData.map(item => item.refunds);
    const earnings = revenueData.map(item => item.earnings);
    const months = revenueData.map(item => item.month);

    const maxOrder = Math.max(...orders);
    const maxRefund = Math.max(...refunds);
    const maxEarning = Math.max(...earnings);
    const maxYaxis = Math.max(maxOrder, maxRefund, maxEarning);
    const maxValue = Math.ceil(maxYaxis / 100) * 100;

    const chartOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: true,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: ['#6f42c1', '#dc3545', '#28a745'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: months,
            labels: {
                style: {
                    colors: '#adb5bd',
                    fontSize: '12px',
                    fontWeight: '600',
                },
            },
        },
        yaxis: {
            min: 0,
            max: maxValue,
            labels: {
                style: {
                    colors: '#adb5bd',
                    fontSize: '12px',
                    fontWeight: '600',
                },
            },
        },
        legend: {
            show: false
        },
        tooltip: {
            enabled: true,
            style: {
                fontSize: '12px',
                color: '#ff0000',
            },
        },
    };

    const chartSeries = [
        {

            name: 'Orders',
            data: orders,
        },
        {
            name: 'Refunds',
            data: refunds,
        },
        {
            name: 'Earnings',
            data: earnings,
        },
    ];

    return (
        <>
            <Chart options={chartOptions} series={chartSeries} type="line" height={420} />
        </>
    )
}

export default DashboardRevenueChart;