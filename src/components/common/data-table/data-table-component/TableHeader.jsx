import DropdownNew from '../../dropdown/DropdownNew';
import { useTableContext } from '../../../../pages/dashboard/dashboard-component/TableContext';
import Button from '../../button/Button';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import PDFLayout from '../../../PDF/PDFLayout';

function TableHeader() {
    const { tableTitle, dropdownProps, headerButton } = useTableContext();
    return (
        <>
            <div className="flex items-center justify-between w-100 p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                <span className="text-black dark:text-gray-100 font-semibold text-sm">
                    {tableTitle}
                </span>
                <div className='flex items-center justify-between gap-4'>
                    {dropdownProps &&
                        <DropdownNew
                            label={dropdownProps.label}
                            dropdownMenuName={dropdownProps.menuName}
                            items={dropdownProps.items}
                            position={dropdownProps.position}
                            buttonFunc={dropdownProps.handleSelection}
                            arrowIcon={dropdownProps.arrow}
                        />
                    }
                    {
                        headerButton.use === 'pdfDownload' &&
                        // <PDFDownloadLink
                        //     document={<PDFLayout data={tableData} />}
                        //     fileName={`${headerButton.buttonName}.pdf`}
                        // >

                            <Button type={headerButton.type} id={headerButton.buttonName} className={`${headerButton.css}`} buttonFunc={headerButton.handleSelection}>
                                <i className={`${headerButton.icon} me-1`}></i> {headerButton.label}
                            </Button>
                        // </PDFDownloadLink>
                    }
                </div>
            </div>
        </>
    )
}

export default TableHeader
