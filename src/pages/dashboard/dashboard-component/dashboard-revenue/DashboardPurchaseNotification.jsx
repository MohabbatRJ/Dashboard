import Button from "../../../../components/common/button/Button"

function DashboardPurchaseNotification() {
    return (
        <>
            <div className="col-span-2 card p-6 text-center bg-react-bg-texture flex justify-between md:flex-nowrap flex-wrap gap-4 w-full rounded-md">
                <div className="flex items-center justify-start sm:flex-nowrap flex-wrap gap-4">
                    <div className="">
                        <i className="fa-solid fa-store text-3xl"></i>
                    </div>
                    <div>
                        <h4 className="text-gray-900 dark:text-gray-700 font-semibold lg:text-xl text-base text-left">
                            Have you tried new RJ eCommerce Templates ?
                        </h4>
                        <p className="text-gray-700 dark:text-gray-700 font-semibold lg:text-sm text-xs text-left">That allows customers to browse and purchase items from an online store.</p>
                    </div>
                </div>
                <Button
                    className="capitalized font-medium text-sm text-truncate mb-0 flex items-center gap-1 bg-primary-600 group hover:bg-primary-800 transition-all duration-1000 ease-in-out hover:-translate-y-1 text-white dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-full w-fit "
                >
                    <div className="flex items-center justify-center bg-primary-500 group-hover:bg-primary-700 dark:bg-gray-500 dark:group-hover:bg-gray-700 transition-all duration-1000 ease-in-out w-12 h-12 rounded-full">
                        <i className="fa-solid fa-box text-xl"></i>
                    </div>
                    <div className="ps-2 pe-6 text-center">
                        Add New Product
                    </div>
                </Button>
            </div>
        </>
    )
}

export default DashboardPurchaseNotification
