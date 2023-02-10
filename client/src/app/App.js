import React from "react";
import Login from "./layouts/loginLayouts/login";
import Logout from "./layouts/logoutLayouts/logOut";
import Basket from "./layouts/basketLayouts/basket";
import Order from "./layouts/orderLayouts/orderLayouts";
import Main from "./layouts/mainLayouts/main";
import Сontacts from "./layouts/contactsLayouts/contacts";
import Favourite from "./layouts/favouriteLayouts/favourite";
import Detalies from "./layouts/detailsLayouts/details";
import PersonalPage from "./page/personaPage/personaPage";
import EditPersonalData from "./page/personaPage/editPersonalData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/pageUi/navBar";
import AppLoader from "./components/ui/hoc/appLoader";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { getIsLoggedIn } from "./store/users";
import { useSelector } from "react-redux";
import OrderAdd from "./page/orderPage/orderAdd";
import FooterBar from "./components/pageUi/footerBar";
import useTheme from "./components/hooks/useTheme";
function App() {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const { theme, toggleTheme } = useTheme();
    const routes = (isLoggedIn) =>
        useRoutes([
            {
                path: "/",
                element: <Main />
            },
            {
                path: "logout",
                element: isLoggedIn ? <Logout /> : <Navigate to="/" />
            },
            {
                path: "login",
                element: isLoggedIn ? <Navigate to="/" /> : <Login />
            },
            {
                path: "contacts",
                element: <Сontacts to="/" />
            },
            {
                path: "orders",
                element: isLoggedIn ? <Order /> : <Navigate to="/login" />
            },
            {
                path: "addOrder",
                element: isLoggedIn ? <OrderAdd /> : <Navigate to="/login" />
            },
            {
                path: "basket",
                element: isLoggedIn ? <Basket /> : <Navigate to="/login" />
            },
            {
                path: "favourite",
                element: isLoggedIn ? <Favourite /> : <Navigate to="/login" />
            },
            {
                path: "products",
                element: <Outlet />,
                children: [
                    { index: true, element: <Navigate to="/" /> },
                    { index: true, path: ":productId", element: <Detalies /> }
                ]
            },
            {
                path: "profile",
                element: isLoggedIn ? <Outlet /> : <Navigate to="/login" />,
                children: [
                    { index: true, element: <PersonalPage /> },
                    {
                        path: ":userId",
                        element: <EditPersonalData />
                    },
                    { path: "*", element: <Navigate to="/" /> }
                ]
            },
            { path: "*", element: <Navigate to="/" /> }
        ]);
    return (
        <>
            <div className={theme}>
                <AppLoader>
                    <NavBar onToggle={toggleTheme} />
                    {routes(isLoggedIn)}
                    <FooterBar />
                </AppLoader>

                <ToastContainer />
            </div>
        </>
    );
}

export default App;
