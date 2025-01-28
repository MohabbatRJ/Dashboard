// import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
// import Button from '../../common/button/Button';
// import { toggleUIState } from '../../../store/actions/uiActions/uiAction';
import PropTypes from 'prop-types';
import Button from '../../common/button/Button';

function DropdownMenu({ item, level, accordionState, menuOpen }) {
    // const uiState = useSelector((state) => state.ui);
    // const isOpen = dropdownMenuName ? uiState[dropdownMenuName] : false;

    // const dispatch = useDispatch();
    // const toggleState = (key) => {
    //     dispatch(toggleUIState(key));
    // };
    return (
        <>
            {
                // dropdownMenuName &&
                <li key={item.id} className={`pl-${level * 4}`}>
                    {item.children ? (
                        <>
                            <Button
                                type='button'
                                buttonFunc={(event) => { event.preventDefault(); menuOpen(item.menuName, level); }}
                                className={`flex items-center justify-between gap-x-3 py-1 px-2 text-sm text-gray-700 rounded-lg hover:bg-primary-100 dark:bg-neutral-800 dark:text-neutral-400 w-full transition-all ease-in-out duration-[600ms] ${accordionState[item.menuName]?.open ? "text-primary-700" : ""}`}
                            >
                                <div className="flex items-center">
                                    <i className={`transition-all ease-in-out duration-[600ms] fa fa-${item.icon}`}></i>
                                    <span className="ml-3 text-left whitespace-nowrap">{item.title}</span>
                                </div>
                                <i className={` ${accordionState[item.menuName]?.open ? 'rotate-0' : '-rotate-90'}  transition-all ease-in-out duration-[600ms] fa fa-${item.dropdownIcon}`}></i>
                            </Button>
                            <div
                                className={`overflow-hidden transition-all ease-in-out duration-[600ms] ${accordionState[item.menuName]?.open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <ul className={`space-y-1 ps-${level + 2}`}>
                                    {item.children && item.children.map(child => (
                                        <DropdownMenu key={child.id} item={child} level={level + 1} accordionState={accordionState} menuOpen={menuOpen} />
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <NavLink
                            to={item.url}
                            className={({ isActive }) =>
                                `flex items-center gap-x-3 py-1 px-2 text-sm text-gray-700 rounded-lg focus:bg-primary-700 focus:text-white hover:bg-gray-100 
                        dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white ${isActive ? "text-primary-700" : ""}`
                            }
                        >
                            <i className={`fa fa-${item.icon}`}></i>
                            <span>{item.title}</span>
                        </NavLink>
                    )}
                </li>

            }
        </>
    )
}

DropdownMenu.propTypes = {
    item: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    accordionState: PropTypes.object.isRequired,
    menuOpen: PropTypes.func.isRequired,
};

export default DropdownMenu
