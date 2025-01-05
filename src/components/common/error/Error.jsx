import React from 'react'

function Error({ error }) {
    return (
        <>
            {error && (
                <div className="p-4 my-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{error }!</span>
                </div>

            )}
        </>
    )
}

export default Error
