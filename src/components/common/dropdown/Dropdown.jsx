import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Dropdown({ dropdownMenuName, buttonFunc, children, title, items, icons, position }) {
    const uiState = useSelector((state) => state.ui);
    const isOpen = dropdownMenuName ? uiState[dropdownMenuName] : false;

    return (
        <div className={`${isOpen ? '' : 'hidden'} max-h-60 overflow-auto group-hover:block z-[100] absolute ${position} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 shadow-2xl`} id={`${dropdownMenuName}-dropdown`}>
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
                            to={item.path}
                            onClick={item.onClick || null}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
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
            {children}
        </div>
    );
}

export default Dropdown;
