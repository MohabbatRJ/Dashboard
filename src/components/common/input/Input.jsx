import React from 'react'

function Input({ id, type, placeholder, value, onChange, required, ...rest }) {
    return (
        <>
            {
                type === 'checkbox' ? (
                    <input type="checkbox" name={id} id={id} defaultChecked={value} onChange={onChange} {...rest} className="bg-gray-50 border border-gray-300 accent-primary-700 rounded  focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 w-4 h-4 " required={required} />
                ) : (
                    <input type={type} name={id} id={id} placeholder={placeholder} value={value} onChange={onChange} required  {...rest} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light placeholder-primary-800 placeholder-opacity-50" />
                )
            }
        </>
    )
}

export default Input
