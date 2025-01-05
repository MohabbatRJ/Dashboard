
import PropTypes from 'prop-types';
import AnimatedCounter from '../../../../components/common/animate-number/AnimatedCounter';
import clsx from 'clsx';
function DashboardRevenueTotal({ revenueTotalPeriod }) {

    return (
        <>
            <div className="grid md:grid-cols-2 md:grid-rows-2 mt-4">
                {revenueTotalPeriod.map((totalValues) => {
                    const textColorClass = totalValues.total <= 0 ? 'text-primary-300' : 'text-green-300';

                    return (<div key={totalValues.key} className="card border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center">
                        <h4 className="text-xl font-semibold mb-0 text-gray-700">
                            {totalValues.key === 'conversionRatio' ? (
                                <span className={clsx("inline-flex items-center px-2 py-1 font-semibold", textColorClass)}>
                                    {(totalValues.total).toFixed(2)}%
                                </span>
                            ) : (
                                <AnimatedCounter start={0} end={totalValues.total} usd={totalValues.currency} />
                            )}
                        </h4>
                        <p className="text-slate-500 font-normal text- mb-0">{totalValues.title}</p>
                    </div>)
                })}
            </div>
        </>
    )
}

DashboardRevenueTotal.propTypes = {
    revenueTotalPeriod: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string
        })
    ).isRequired,
};
export default DashboardRevenueTotal
