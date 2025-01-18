import PropTypes from 'prop-types';
import { memo } from 'react'

function Button({ type, buttonFunc, className = '', children, ...props }) {
    return (
        <>
            <button type={type} onClick={buttonFunc} {...props} className={`${className}`}>
                {children}
            </button>
        </>
    )
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    buttonFunc: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default memo(Button);
