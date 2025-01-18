import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../button/Button';
import { toggleUIState } from '../../../store/actions/uiActions/uiAction';

function DropdownNew({ label, dropdownMenuName, buttonFunc, children, title, items, position, arrowIcon }) {
    const uiState = useSelector((state) => state.ui);
    const isOpen = dropdownMenuName ? uiState[dropdownMenuName] : false;
    const dispatch = useDispatch();
    const toggleState = useCallback((key) => {
        dispatch(toggleUIState(key));
    }, [dispatch]);
    return (
        <>
            <div className="flex items-center gap-2 group relative">
                <span className="text-black dark:text-gray-100 font-semibold text-sm capitalize">
                    {label}
                </span>
                <Button type='button' buttonFunc={() => toggleState(dropdownMenuName)}
                    className='capitalized font-medium text-sm text-slate-400 text-truncate mb-0 flex items-center gap-1'>
                    {items.map((item, index) =>
                        item.selected === true ? <span key={index}>{item.label}</span> : null
                    )}
                    {arrowIcon ? <i className="fa-solid fa-angle-down text-xs"></i> : ''}

                    {children}
                </Button>
                <div className={`${isOpen ? '' : 'hidden'} max-h-96 w-40 overflow-auto group-hover:block z-[100] absolute ${position} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700 dark:divide-gray-600 shadow-2xl`} id={`${dropdownMenuName}-dropdown`}>
                    {title && (
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{title.name}</span>
                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{title.email}</span>
                        </div>
                    )}
                    <ul className="py-2" aria-labelledby={`${dropdownMenuName}-menu-button`}>
                        {items.map((item, index) => (
                            <li key={index} className='flex items-center w-full'>

                                <NavLink
                                    title={item.title}
                                    data-lang={item.lang}
                                    to={item.path ? item.path : '' }
                                    onClick={() => buttonFunc(item.value)}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full ${item.selected === true ? 'bg-red-200 dark:bg-red-700 dark:text-white': ''}` }
                                >
                                    {item.icon &&
                                        <div className='w-4 h-4 rounded-full flex items-center '>
                                            <img key={index} src={item.icon} alt={item.title} className='w-4 h-4 rounded-full object-cover' />
                                        </div>
                                    }
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
DropdownNew.propTypes = {
    label: PropTypes.string,
    dropdownMenuName: PropTypes.string.isRequired, 
    buttonFunc: PropTypes.func, 
    children: PropTypes.node,
    title: PropTypes.shape({ 
        name: PropTypes.string,
        email: PropTypes.string,
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        lang: PropTypes.string,
        path: PropTypes.string,
        value: PropTypes.any, 
        selected: PropTypes.bool,
        icon: PropTypes.string,
        label: PropTypes.string.isRequired,
    })).isRequired,
    icons:PropTypes.string,
    position: PropTypes.string,
    arrowIcon: PropTypes.bool.isRequired
};

export default DropdownNew;
