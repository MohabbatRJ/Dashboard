import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Button from '../../common/button/Button';
import { toggleUIState } from '../../../store/actions/uiActions/uiAction';

function DropdownMenu({ dropdownMenuName, childrenMenu }) {
    const uiState = useSelector((state) => state.ui);
    const isOpen = dropdownMenuName ? uiState[dropdownMenuName] : false;

    const dispatch = useDispatch();
    const toggleState = (key) => {
        dispatch(toggleUIState(key));
    };
    return (
        <>
            {
                dropdownMenuName &&
                <ul id={`dropdown${dropdownMenuName}`} className={`${isOpen ? '' : 'hidden'} py-2 space-y-2`}>
                    {
                        childrenMenu.map((childMenu, index) => (
                            <li key={index} id={childMenu.childMenu}>
                                {
                                    childMenu.children?.length > 0 ? (
                                        <Button
                                            buttonFunc={() => toggleState(`dropdown` + childMenu.menuName)}
                                            type="button"
                                            aria-controls={`dropdown` + childMenu.menuName}
                                            data-collapse-toggle={`dropdown` + childMenu.menuName}
                                            className={` flex items-center px-4 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group focus:bg-primary-700 focus:text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                                        >
                                            {childMenu.icon && <i className={`fa fa-${childMenu.icon}`}></i>}
                                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                                {childMenu.title}
                                            </span>
                                            {childMenu.dropdownIcon && <i className={`fa fa-${childMenu.dropdownIcon}`}></i>}
                                        </Button>
                                    ) : (

                                        <NavLink to={childMenu.url || "/"} className={`block px-4 py-2 text-sm text-gray-700 rounded-lg focus:bg-primary-700 focus:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}>
                                            {childMenu.icon && <i className={`fa fa-${childMenu.icon}`}></i>}
                                            <span className="ml-3">{childMenu.title}</span>
                                        </NavLink>
                                    )
                                }

                                {
                                    childMenu.children?.length > 0 && (
                                        <DropdownMenu dropdownMenuName={`dropdown${childMenu.menuName}`} childrenMenu={childMenu.children} />
                                    )
                                }

                            </li>
                        ))
                    }
                </ul>
            }
        </>
    )
}

export default DropdownMenu
