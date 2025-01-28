import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSidebarMenu } from '../../../store/actions/menuAction/sidebarMenuFetch/sidebarMenuFetch';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import { NavLink } from 'react-router-dom';
import Button from '../../common/button/Button';
import DropdownNew from '../../common/dropdown/DropdownNew';
import { setUIState, toggleUIState } from '../../../store/actions/uiActions/uiAction';
import Error from '../../common/error/Error';

const MainSidebar = () => {
    const { mainSidebarOpen } = useSelector((state) => state.ui);
    const [accordionState, setAccordionState] = useState({});
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const menuOpen = (menuName, level) => {
        setAccordionState((prevState) => {
            const newState = { ...prevState };
            Object.keys(newState).forEach((key) => {
                if (key !== menuName && newState[key].level === level) {
                    newState[key].open = false;
                }
            });

            newState[menuName] = { open: !prevState[menuName]?.open, level };
            return newState;
        });
    };

    const addParentId = (menu, parentId = null) => {
        return menu.map(item => {
            const updatedItem = { ...item, parentId: parentId ?? item.menuName };
            if (item.children) {
                updatedItem.children = addParentId(item.children, item.menuName);
            }
            return updatedItem;
        });
    };

    const { sidebarMenus, error } = useSelector(state => state.sidebarMenu);
    const menuItems = addParentId(sidebarMenus);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchSidebarMenu());
        }
    }, [isLoggedIn, dispatch]);

    const handleToggle = useCallback((key) => {
        dispatch((dispatch, getState) => {
            const currentState = getState().ui[key];
            dispatch(setUIState(null, false));
            if (!currentState) {
                dispatch(toggleUIState(key));
            }
        });
    }, [dispatch]);

    return (
        <>
            {isLoggedIn && (
                <aside id="main-sidebar" className="fixed top-0 left-0 z-40">
                    <section
                        className={`${!mainSidebarOpen ? "-translate-x-full xl:translate-x-0 " : ""} 
                    relative w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                        aria-label="Sidebar"
                    >
                        <div className="overflow-y-auto py-5 px-3 pb-20 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <ul className="space-y-2">
                                {menuItems.map(item => (
                                    <DropdownMenu
                                        key={item.id}
                                        item={item}
                                        level={0}
                                        accordionState={accordionState}
                                        menuOpen={menuOpen}
                                    />
                                ))}
                            </ul>
                        </div>
                    <div className="absolute bottom-0 left-0 flex justify-center p-4 space-x-4 w-full xl:flex bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700">
                        <NavLink
                            to="/"
                            className="btn-open-menu"
                        >
                            <i className="fas fa-sliders-h text-xl rotate-90"></i>

                        </NavLink>

                        <NavLink
                            to="/profile"
                            data-tooltip-target="tooltip-settings"
                            className="btn-open-menu "
                        >
                            <i className="fa-solid fa-gear text-xl"></i>
                        </NavLink>

                        <div className="group position-relative btn-open-menu">
                            <Button
                                buttonFunc={() => handleToggle('langDropdownMenu')}
                                type="button"
                                data-dropdown-toggle="language-dropdown"
                                className=""
                            >
                                <img src="https://flagcdn.com/us.svg" alt="english" className='min-w-6 h-5 rounded-full object-cover' />
                            </Button>
                            <DropdownNew
                                dropdownMenuName="langDropdownMenu"
                                items={[
                                    { label: 'English', value: 'English', title: 'English', lang: 'en', icon: 'https://flagcdn.com/us.svg', selected: false },
                                    { label: 'Española', value: 'Española', title: 'Spanish', lang: 'sp', icon: 'https://flagcdn.com/es.svg', selected: false },
                                    { label: 'Deutsche', value: 'Deutsche', title: 'German', lang: 'gr', icon: 'https://flagcdn.com/gr.svg', selected: false },
                                    { label: 'Italiana', value: 'Italiana', title: 'Italian', lang: 'it', icon: 'https://flagcdn.com/it.svg', selected: false },
                                    { label: 'русский', value: 'русский', title: 'Russian', lang: 'ru', icon: 'https://flagcdn.com/ru.svg', selected: false },
                                    { label: '中国人', value: '中国人', title: 'Chinese', lang: 'ch', icon: 'https://flagcdn.com/ch.svg', selected: false },
                                    { label: 'français', value: 'français', title: 'French', lang: 'fr', icon: 'https://flagcdn.com/fr.svg', selected: false },
                                    { label: 'عربى', value: 'عربى', title: 'Arabic', lang: 'sa', icon: 'https://flagcdn.com/sa.svg', selected: false },
                                ]}
                                position={'bottom-0 right-0'}
                                arrowIcon={false}
                            />
                        </div>
                    </div>
                    </section>
                    {error &&
                        <div className="absolute top-2/4 w-full">
                            <Error error={`Error loading menu ${error}`} />
                        </div>
                    }
                </aside>
            )}
        </>
    );
};

export default MainSidebar;
