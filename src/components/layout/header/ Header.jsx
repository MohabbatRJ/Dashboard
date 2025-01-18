import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../../store/actions/authActions/authActionForm/logoutUserAction";
import MainSidebar from "../main-sidebar/MainSidebar";
import Button from "../../common/button/Button";
import { toggleUIState } from "../../../store/actions/uiActions/uiAction";
import SearchBox from "../../common/search-box/SearchBox";
import DropdownNew from "../../common/dropdown/DropdownNew";

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const toggleState = useCallback((key) => {
        dispatch(toggleUIState(key));
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutUserAction(navigate, isLoggedIn));
    };


    return (
        <>
            <header className="">
                <nav className="fixed top-0 z-50 w-full bg-white px-4 lg:px-6 py-2.5 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-wrap justify-between items-center max-w-screen">
                        <div className="flex">
                            {isLoggedIn && (
                                <Button
                                    buttonFunc={() => toggleState('mainSidebarOpen')}
                                    data-drawer-target="main-sidebar"
                                    data-drawer-toggle="main-sidebar"
                                    aria-controls="main-sidebar"
                                    type="button"
                                    className="xl:hidden btn-open-menu"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <i className="fa-solid fa-bars-staggered text-xl"></i>
                                </Button>
                            )}
                            <NavLink to="/" className="flex items-center">
                                <img
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    className="mr-3 h-6 sm:h-9"
                                    alt="Flowbite Logo"
                                />
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                    RJ
                                </span>
                            </NavLink>
                        </div>


                        <SearchBox />

                        <div className="flex items-center justify-between lg:order-2 gap-4 md:mt-0 mt-4 md:w-auto w-full">
                            {isLoggedIn ? (
                                <>
                                    <Button
                                        data-collapse-toggle="brands"
                                        aria-controls="brands"
                                        aria-expanded="false"
                                        type="button"
                                        className="btn-open-menu"
                                    >
                                        <span className="sr-only">Open brands</span>
                                        <i className="fa-solid fa-grip text-xl"></i>
                                    </Button>
                                    <Button
                                        data-collapse-toggle="notification"
                                        aria-controls="notification"
                                        aria-expanded="false"
                                        type="button"
                                        className="relative btn-open-menu"
                                    >
                                        <span className="sr-only">Open notification</span>
                                        <i className="fa-regular fa-bell text-xl"></i>
                                        <span className="red-dot-circle top-[25%] right-[35%]">
                                        </span>
                                    </Button>
                                    <DropdownNew
                                        dropdownMenuName={'userDropdownMenu'}
                                        title={{ name: 'Bonnie Green', email: 'name@flowbite.com' }}
                                        items={[
                                            { label: 'Dashboard', value: 'Dashboard', path: '/' },
                                            { label: 'Settings', value: 'Settings', path: '/' },
                                            { label: 'Earnings', value: 'Earnings', path: '/' },
                                            { label: 'Sign out', value: 'Sign out', path: '/', onClick: handleLogout }
                                        ]}
                                        position={'right-0 top-8'}
                                        arrowIcon={false}
                                    >
                                        <img
                                            className="min-w-8 h-8 rounded-full"
                                            src="https://i.pravatar.cc/150?img=3"
                                            alt="user photo"
                                        />
                                        <span className="red-dot-circle top-[10%] right-[12%]">
                                        </span>
                                    </DropdownNew>
                                    <Button
                                        buttonFunc={handleLogout}
                                        className="bg-btn-primary-700"
                                        type="button"
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to="/login"
                                        state={{ from: location }}
                                        className="bg-btn-transparent"
                                    >
                                        Log in
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className="bg-btn-primary-700"
                                    >
                                        Sign up
                                    </NavLink>
                                </>
                            )}
                            <Button
                                data-collapse-toggle="mobile-menu-2"
                                aria-controls="mobile-menu-2"
                                aria-expanded="false"
                                type="button"
                                className="xl:hidden btn-open-menu"
                            >
                                <span className="sr-only">Open main menu</span>
                                <i className="fa-solid fa-bars text-xl"></i>
                            </Button>
                        </div>
                    </div>
                </nav>

                {isLoggedIn && <MainSidebar />}
            </header>
        </>
    );
};

export default memo(Header);
