import React, { memo } from 'react'

function Button({ type, buttonFunc, className = '', children, ...props }) {
    return (
        <>
            <button type={type} onClick={buttonFunc} {...props} className={`${className}`}>
                {children}
            </button>
        </>
    )
}

export default memo(Button);
