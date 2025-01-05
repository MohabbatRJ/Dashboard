import React from 'react'

function DashboardTopSaleHeader({salePeriod, totalSales}) {
    return (
        <>
            <div className="p-4 h-fit">
                <h4 className="mb-1 text-2xl font-bold">{totalSales} <small className="font-normal text-base">Total Sales</small></h4>
                <p className="text-slate-500 font-semibold">Sales from {salePeriod.start} - {salePeriod.end}</p>
            </div>
        </>
    )
}

export default DashboardTopSaleHeader;