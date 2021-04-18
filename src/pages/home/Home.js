
import { useState, useRef, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import PageNavbar from "../../components/navbar/PageNavbar";
import Sidebar from '../../components/sidebar/Sidebar';
import routes from '../../routes';
import logo from "../../assets/img/brand/argon-react.png";
import Driver from "../driver/Driver";
import Rider from "../rider/Rider";
import RiderList from "../rider/RiderList";



function Home(props) {
    const [sideNavOpen, setSideNavOpen] = useState(true);

    const mainContent = useRef();
    const history = useHistory();

    useEffect(() => {
        // if (!props.isAuthenticated) {
        //     history.push("/login");
        // }
    }, [])

    const toggleSidenav = e => {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }
        setSideNavOpen(!sideNavOpen)
    };

    const getRoutes = routes => {
        return routes.map((route, key) => {
            if (route.collapse) {
                return getRoutes(route.views);
            }
            return (
                <Route
                    path={route.path}
                    component={route.component}
                    key={key}
                />

            );
        });
    };
    return (
        <>
            <Sidebar
                sideNavOpen={sideNavOpen}
                toggleSidenav={toggleSidenav}
                routes={routes}
                logo={{
                    innerLink: "/",
                    imgSrc: logo,
                    imgAlt: "..."
                }} />
            <div
                className="main-content"
                ref={mainContent}>
                <PageNavbar
                    toggleSidenav={toggleSidenav}
                    sidenavOpen={sideNavOpen} />
                <Switch>
                    {getRoutes(routes)}
                    <Route from="/driver/:id" component={Driver}/>
                    <Route from="/rider/:id" component={Rider}/>
                </Switch>
            </div>
            {sideNavOpen ? (
                <div className="backdrop d-xl-none" onClick={toggleSidenav} />
            ) : null}
        </>
    );
}

const mapStateToProps = (state) => {
    return { isAuthenticated: state.login.isAuthenticated };
};

export default connect(mapStateToProps)(Home);

