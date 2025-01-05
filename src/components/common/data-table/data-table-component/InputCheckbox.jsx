function InputCheckbox() {
    return (
        <>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="checkbox-table-search-1"
                    className="
                    w-4 h-4 
                    text-primary-600
                    bg-gray-100
                    border-primary-300 rounded
                    focus:ring-0 
                    focus:ring-primary-500 dark:focus:ring-primary-600
                    accent-primary-500"
                />
                
                <label
                    htmlFor="checkbox-table-search-1"
                    className="sr-only">
                    checkbox
                </label>
            </div>
        </>
    )
}

export default InputCheckbox
