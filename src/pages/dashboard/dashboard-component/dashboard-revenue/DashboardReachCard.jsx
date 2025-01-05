import Button from "../../../../components/common/button/Button"

function DashboardReachCard() {
    return (
        <>
            <div className="grid md:grid-cols-2 md:grid-rows-1 mt-4">
                <div className="col-span-2 card border rounded-md border-primary-300 bg-primary-400 dark:border-gray-700 dark:bg-gray-700 p-6 text-center">
                    <h4 className="text-gray-900 dark:text-primary-200 font-semibold text-lg text-left">Reached 5k Customers</h4>
                    <p className="text-gray-700 dark:text-primary-400 font-semibold text-sm text-left  my-2">Hey! Awesome products! Can you share the best product name ?</p>
                    <Button
                        className="capitalized font-medium text-sm text-truncate mb-0 flex items-center gap-1 bg-primary-600 text-white dark:text-gray-300 dark:bg-gray-900 p-2 rounded-lg"
                    >
                        See Report
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default DashboardReachCard
