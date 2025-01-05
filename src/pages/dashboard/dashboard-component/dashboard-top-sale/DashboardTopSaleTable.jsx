
import React from 'react'

function DashboardTopSaleTable({countrySale}) {
    return (
        <>
            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        {
                           countrySale && countrySale.filter(data => data.isPrimaryDestination !== true)
                           .map((data, index) => (
                                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className='flex items-center justify-start gap-2'>
                                            <img src={data.flag} alt="" className='w-5 h-5 rounded-full' />
                                            <span className="">{data.country}</span>
                                        </div>
                                    </th>
                                    <td className="px-6 py-2 text-black dark:text-gray-700 font-normal">
                                        {data.sales}
                                    </td>
                                </tr>
                           ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DashboardTopSaleTable;