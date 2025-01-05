import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import DropdownMenu from "../dropdown-menu/DropdownMenu";
import Button from "../../common/button/Button";
import { setUIState, toggleUIState } from "../../../store/actions/uiActions/uiAction";
import { fetchSidebarMenu } from "../../../store/actions/menuAction/sidebarMenuFetch/sidebarMenuFetch";
// import Loading from "../../common/loading/Loading";
import Error from "../../common/error/Error";
// import Dropdown from "../../common/dropdown/Dropdown";
import DropdownNew from "../../common/dropdown/DropdownNew";


const MainSidebar = () => {
    // const MainSidebar = React.memo(() => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { mainSidebarOpen } = useSelector((state) => state.ui);
    const { sidebarMenus, loading, error } = useSelector(state => state.sidebarMenu);
    const menuItems = sidebarMenus;
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchSidebarMenu());
        }
    }, [isLoggedIn, dispatch]);

    const handleToggle = useCallback((key) => {
        // dispatch(setUIState(null, false));
        // dispatch(toggleUIState(key));
        dispatch((dispatch, getState) => {
            const currentState = getState().ui[key];

            // Reset all dropdowns to false
            dispatch(setUIState(null, false));

            // Toggle the current dropdown only if it wasn't already open
            if (!currentState) {
                dispatch(toggleUIState(key));
            }
        });
    }, [dispatch]);


    const renderMenuItem = (menuItem) => (
        <li id={menuItem.menuName} key={menuItem.id}>
            {menuItem.children?.length > 0 ? (
                <Button
                    buttonFunc={() => handleToggle(`dropdown${menuItem.menuName}`)}
                    type="button"
                    aria-controls={`dropdown${menuItem.menuName}`}
                    data-collapse-toggle={`dropdown${menuItem.menuName}`}
                    className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group focus:bg-primary-700 focus:text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                    {menuItem.icon && <i className={`fa fa-${menuItem.icon}`}></i>}
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                        {menuItem.title}
                    </span>
                    {menuItem.dropdownIcon && <i className={`fa fa-${menuItem.dropdownIcon}`}></i>}
                </Button>
            ) : (
                <NavLink
                    to={menuItem.url || "/"}
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg focus:bg-primary-700 focus:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                    {menuItem.icon && <i className={`fa fa-${menuItem.icon}`}></i>}
                    <span className="ml-3">{menuItem.title}</span>
                </NavLink>
            )}
            {menuItem.children?.length > 0 && (
                <DropdownMenu dropdownMenuName={`dropdown${menuItem.menuName}`} childrenMenu={menuItem.children} />
            )}
        </li>
    );

    // if (loading) return <div className="mt-20 text-red-500">Loading...</div>;
    // if (error) return <div className="mt-20 text-red-500">Error loading menu</div>;

    return (
        <>
            {/*  */}
            {isLoggedIn && (
                <aside
                    id="main-sidebar" className="fixed top-0 left-0 ">
                    <section className={`${!mainSidebarOpen ? "-translate-x-full xl:translate-x-0 " : ""} z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
                        <div className="overflow-y-auto py-5 px-3 pb-20 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <ul className="space-y-2">
                                {menuItems.map(renderMenuItem)}
                            </ul>

                        </div>
                    </section >
                    <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full xl:flex bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700">
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
                        {/* <div
                                id="tooltip-settings"
                                role="tooltip"
                                className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
                            >
                                Settings page
                                <div className="tooltip-arrow" data-popper-arrow />
                            </div> */}

                        <div className="group position-relative">
                            <Button
                                buttonFunc={() => handleToggle('langDropdownMenu')}
                                type="button"
                                data-dropdown-toggle="language-dropdown"
                                className="btn-open-menu"
                            >
                                <img src="https://flagcdn.com/us.svg" alt="english" className='w-5 h-5 rounded-full object-cover' />
                            </Button>
                            <DropdownNew
                                dropdownMenuName="langDropdownMenu"
                                items={[
                                    { label: 'English', value: 'English', title:'English', lang: 'en', icon:'https://flagcdn.com/us.svg', selected: false },
                                    { label: 'Española', value: 'Española', title:'Spanish', lang: 'sp', icon:'https://flagcdn.com/es.svg', selected: false },
                                    { label: 'Deutsche', value: 'Deutsche', title:'German', lang: 'gr', icon:'https://flagcdn.com/gr.svg', selected: false },
                                    { label: 'Italiana', value: 'Italiana', title:'Italian', lang: 'it', icon:'https://flagcdn.com/it.svg', selected: false },
                                    { label: 'русский', value: 'русский', title:'Russian', lang: 'ru', icon:'https://flagcdn.com/ru.svg', selected: false },
                                    { label: '中国人', value: '中国人', title:'Chinese', lang: 'ch', icon:'https://flagcdn.com/ch.svg', selected: false },
                                    { label: 'français', value: 'français', title:'French', lang: 'fr', icon:'https://flagcdn.com/fr.svg', selected: false },
                                    { label: 'عربى', value: 'عربى', title:'Arabic', lang: 'sa', icon:'https://flagcdn.com/sa.svg', selected: false },
                                ]}
                                position={'bottom-10 right-0'}
                                arrowIcon={false}
                            />


                        </div>
                    </div>
                    {error &&
                        <Error error='Error loading menu' />
                    }
                </aside>
            )}
            {/* <Loading loading={loading} /> */}
        </>
    );
}
// );

export default MainSidebar;