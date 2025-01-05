import AnimatedCounter from '../../../components/common/animate-number/AnimatedCounter';
import Error from '../../../components/common/error/Error';
import PropTypes from 'prop-types';
import clsx from 'clsx';
function DashboardCard({ summaryMetrics, error }) {
    const colors = [
        { bg1: 'bg-primary-500/50', bg2: 'bg-primary-300/50', icon: 'text-primary-700' },
        { bg1: 'bg-cyan-500/50', bg2: 'bg-cyan-300/50', icon: 'text-cyan-700' },
        { bg1: 'bg-yellow-500/50', bg2: 'bg-yellow-300/50', icon: 'text-yellow-700' },
        { bg1: 'bg-blue-500/50', bg2: 'bg-blue-300/50', icon: 'text-blue-700' },
        // Add more color combinations as needed
    ];
    const iconMapping = {
        'Total Earnings': 'wallet',
        'Orders': 'store',
        'Customers': 'circle-user',
        'Products': 'gem',
        // Add more title-icon pairs as needed
    };
    return (
        <>
            {summaryMetrics && summaryMetrics.map((data, index) => {
                const colorClasses = colors[data.id % colors.length];
                const profitLossColor = data.change.percentage > 0 ? 'green' : 'primary';

                const bgColorClass = profitLossColor === 'green' ? 'bg-green-100' : 'bg-primary-100';
                const textColorClass = profitLossColor === 'green' ? 'text-green-900' : 'text-primary-900';
                const ringColorClass = profitLossColor === 'green' ? 'ring-green-300' : 'ring-primary-300';
                const icon = iconMapping[data.title] || 'question-circle';
                return (
                    <section id={data.id} key={index} className="dashboard-card hover:shadow-lg dark:hover:shadow-primary-100/50 hover:-translate-y-0.5 transition-transform duration-1000 ease-in-out border border-gray-200 dark:border-gray-700 p-4 rounded-md flex justify-center items-center">
                        <div className="card-body w-full">
                            <div className="flex justify-between">
                                <div className='flex'>
                                    <div className={`rounded ${colorClasses.bg1} w-1 h-100 me-3`} />
                                    <div>
                                        <span className="uppercase font-medium text-slate-400 fs-14 text-truncate mb-3 w-fit">{data.title}</span>
                                        <h4 className="text-2xl font-semibold mb-3">
                                            <span className="counter-value">
                                                <AnimatedCounter start={0} end={data.value} usd={data.currency} />
                                            </span></h4>
                                        <div className="flex space-x-2">
                                            <h5 className={clsx(
                                                "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md",
                                                bgColorClass,
                                                textColorClass,
                                                ringColorClass,
                                                "ring-1 ring-inset text-xs"
                                            )}>
                                                <i className={`fa-solid fa-arrow-trend-${data.change.trend} me-1`}></i> {data.change.percentage} %
                                            </h5>
                                            <p className="text-slate-500 font-normal text-base mb-0">than last week</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="shrink-0 ">
                                    <span className={`flex justify-center items-center ${colorClasses.bg2} rounded text-xl min-w-12 min-h-12`}>
                                        <i className={`fa-solid fa-${icon} ${colorClasses.icon} opacity-100`}></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}
            <Error error={error}/>
        </>
    )
}

DashboardCard.propTypes = {
    summaryMetrics: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired
};
export default DashboardCard
