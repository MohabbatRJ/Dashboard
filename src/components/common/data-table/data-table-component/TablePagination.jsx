
import Button from '../../button/Button';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Input from '../../input/Input';
import { useTableContext } from '../../../../pages/dashboard/dashboard-component/TableContext';
import { fetchRecentOrders } from '../../../../store/actions/recentOrdersAction/recentOrdersFetch/recentOrdersFetch';
import { showNotification } from '../../../../utils/notificationUtils';
import { useDispatch } from 'react-redux';

function TablePagination() {
    const { pagination } = useTableContext();
    const dispatch = useDispatch();
    const [paginationState, setPaginationState] = useState({
            nextPage: pagination.next,
            prevPage: pagination.prev,
            totalItems: pagination.items,
            totalPages: pagination.pages,
            currentPage: 1,
            goToPage: 1,
            startRecord: 1,
            endRecord: 0,
        }); paginationState
        useEffect(() => {
            if (pagination) {
                setPaginationState((prevState) => ({
                    ...prevState,
                    nextPage: pagination.next || 2,
                    prevPage: pagination.prev || 1,
                    totalPages: pagination.pages || 1,
                    totalItems: pagination.items || 0,
                    startRecord: (prevState.currentPage - 1) * 10 + 1,
                    endRecord: Math.min(prevState.currentPage * 10, pagination.items || 0),
                }));
            }
        }, [pagination]);
    const range = useCallback((from, to) => {
            const length = to - from + 1;
            if (length <= 0) return [];
            return Array.from({ length }, (_, i) => i + from);
        }, []);
    
        const getVisiblePages = useCallback(() => {
            const pageCount = pagination.pages;
            const pageNeighbours = 2;
            const totalNumbers = pageNeighbours * 2 + 3;
            const totalBlocks = totalNumbers + 2;
    
            if (pageCount > totalBlocks) {
                const startPage = Math.max(2, paginationState.currentPage - pageNeighbours);
                const endPage = Math.min(pageCount - 1, paginationState.currentPage + pageNeighbours);
    
                let pagess = range(startPage, endPage);
    
                if (startPage > 2) {
                    pagess = [1, 'jumpBack', ...pagess];
                } else {
                    pagess = [1, ...pagess];
                }
    
                if (endPage < pageCount - 1) {
                    pagess = [...pagess, 'jumpForward', pageCount];
                } else {
                    pagess = [...pagess, pageCount];
                }
    
                return pagess;
            }
    
            return range(1, pageCount);
        }, [paginationState.currentPage, pagination.pages, range]);
    
        const visiblePages = useMemo(getVisiblePages, [getVisiblePages]);
    
        const handlePageChange = useCallback(
            (pageNo) => {
                setPaginationState((prevState) => ({ ...prevState, currentPage: pageNo, goToPage: pageNo }));
                dispatch(fetchRecentOrders(pageNo));
            },
            [dispatch]
        );
    const onGoTo = () => {
            const clampedPage = Math.min(Math.max(paginationState.goToPage, 1), paginationState.totalPages);
            setPaginationState((prevState) => ({ ...prevState, goToPage: clampedPage }));
            if (clampedPage >= 1 && clampedPage <= paginationState.totalPages) {
                handlePageChange(clampedPage);
            } else {
                showNotification(
                    'Error',
                    `Please enter a valid page number between 1 and ${paginationState.totalPages}`,
                    'danger'
                );
            }
        };
    const setGoTo = (value) => {
            setPaginationState((prevState) => ({
                ...prevState,
                goToPage: value
            }));
    };
    return (
        <>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
                <div className='flex items-center'>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto px-1">
                        Showing
                        <span className="font-semibold text-gray-900 dark:text-white px-1">
                            {paginationState.startRecord}-{paginationState.endRecord}
                        </span>
                        of
                        <span className="font-semibold text-gray-900 dark:text-white px-1">
                            {paginationState.totalRecords}
                        </span>
                    </span>
                    <div className="flex items-center gap-2 w-40">
                        <Input id={'gotoPage'} type='number' min="1"
                            max={paginationState.totalPages} placeholder={'Go to page'} value={paginationState.currentPage} onChange={(e) => setGoTo(parseInt(e.target.value, 10) || 1)} />
                        <Button
                            className="bg-btn-primary-700"
                            onClick={onGoTo}
                        >
                            Go
                        </Button>
                    </div>
                </div>

                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <Button
                            className={`flex items-center justify-center px-3 h-8 text-gray-600 border border-gray-300 bg-white-50 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-s`}
                            onClick={() => handlePageChange(paginationState.prevPage)}
                            disabled={paginationState.currentPage === 1}
                        >
                            Previous
                        </Button>
                    </li>
                    {visiblePages.map((pageNo, index) => (
                        <li key={index}>
                            {pageNo === 'jumpBack' ? (
                                <Button
                                    className="px-3 h-8 text-gray-600 border bg-white-50 hover:bg-primary-100 dark:bg-gray-700 dark:text-white"
                                    onClick={() => handlePageChange(Math.max(paginationState.currentPage - 2, 1))}
                                >
                                    <i className="fa-solid fa-angles-left"></i>
                                </Button>
                            ) : pageNo === 'jumpForward' ? (
                                <Button
                                    className="px-3 h-8 text-gray-600 border bg-white-50 hover:bg-primary-100 dark:bg-gray-700 dark:text-white"
                                        onClick={() => handlePageChange(Math.min(paginationState.currentPage + 2, paginationState.totalPagesList))}
                                >
                                    <i className="fa-solid fa-angles-right"></i>
                                </Button>
                            ) : (
                                <Button
                                            className={`px-3 h-8 ${paginationState.currentPage === pageNo ? 'text-primary-600 border bg-primary-50 dark:bg-primary-700' : 'text-gray-600 border bg-white-50 hover:bg-primary-100 dark:bg-gray-700 dark:text-white'}`}
                                            onClick={() => handlePageChange(pageNo)}
                                >
                                    {pageNo}
                                </Button>
                            )}
                        </li>
                    ))}
                    <li>
                        <Button
                            className={`flex items-center justify-center px-3 h-8 text-gray-600 border border-gray-300 bg-white-50 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-e`}
                            onClick={() => handlePageChange(paginationState.nextPage)}
                            disabled={paginationState.currentPage === paginationState.totalPagesList}
                        >
                            Next
                        </Button>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default memo(TablePagination);
