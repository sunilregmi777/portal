import { useEffect, useState } from 'react';

import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav
} from 'reactstrap';

import { useLocation } from 'react-router-dom'


function Sidebar(props) {
    const { routes, logo } = props;
    const [routeCollapse, setRouteCollapse] = useState([]);
    const location = useLocation();

    let navbarBrandProps;

    useEffect(() => {
        setCollapseState();
    }, [])

    const setCollapseState = () => {

        let initialRoutes = [];
        routes.forEach(route => {
            if (route.collapse) {
                initialRoutes[route.state] = false;
            }
        });
        setRouteCollapse(initialRoutes);
    }

    const toggleCollapse = (stateName) => {
        let collapseArr = Object.assign([], routeCollapse);
        collapseArr[stateName] = !collapseArr[stateName];
        setRouteCollapse(collapseArr);
    }


    const activeRoute = routeName => {
        return location.pathname.indexOf(routeName) > -1
            ? 'active' : '';
    };

    const getCollapseInitialState = (routes) => {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
                return true;
            } else if (window.location.href.indexOf(routes[i].path) !== -1) {
                return true;
            }
        }
        return false;
    }

    const createLinks = routes => {
        return routes.map((route, key) => {
            if (route.redirect) return null;
            if (route.collapse) {
                return (
                    <NavItem key={key}>
                        <NavLink
                            data-toggle="collapse"
                            aria-expanded={routeCollapse[route.state]}
                            className={classnames({
                                active: getCollapseInitialState(route.views)
                            })}
                            onClick={e => {
                                e.preventDefault();
                                toggleCollapse(route.state)
                            }}>
                            {route.icon ? (
                                <>
                                    <i className={route.icon} />
                                    <span className="nav-link-text">{route.name}</span>
                                </>
                            ) : null}
                        </NavLink>
                        <Collapse isOpen={routeCollapse[route.state]}>
                            <Nav className="nav-sm flex-column">
                                {createLinks(route.views)}
                            </Nav>
                        </Collapse>
                    </NavItem>
                )
            }
            return (<NavItem
                key={key}>
                <NavLink to={route.path}
                    className={activeRoute(route.path)}
                    tag={NavLinkRRD}
                >
                    {route.icon ? (
                        <>
                            <i className={route.icon} />
                            <span className="nav-link-text">{route.name}</span>
                        </>
                    ) : route.miniName !== undefined ? (
                        <>
                            <span className="sidenav-mini-icon"> {route.miniName} </span>
                            <span className="sidenav-normal"> {route.name} </span>
                        </>
                    ) : (
                        route.name
                    )}
                </NavLink>
            </NavItem>);
        });
    }

    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank"
        };
    }

    const scrollBarInnder = (
        < div className="scrollbar-inner" >
            <div className="sidenav-header d-flex align-items-center">
                {logo ? (
                    <NavbarBrand {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={logo.imgSrc}
                        />
                    </NavbarBrand>
                ) : null}
                <div className="ml-auto">
                    <div className={classnames("sidenav-toggler d-none d-xl-block", {
                        active: props.sideNavOpen
                    })}
                        onClick={props.toggleSidenav}
                    >
                        <div className="sidenav-toggler-inner">
                            <i className="sidenav-toggler-line" />
                            <i className="sidenav-toggler-line" />
                            <i className="sidenav-toggler-line" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar-inner">
                <Collapse navbar isOpen={true}>
                    <Nav navbar>{createLinks(routes)}</Nav>
                </Collapse>
            </div>
        </div >
    );

    const onMouseEnterSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.add("g-sidenav-show");
        }
    };

    const onMouseLeaveSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-show");
        }
    };

    return (
        <Navbar
            className=
            "sidenav navbar-vertical navbar-expand-xs navbar-white bg-dark fixed-left"
            onMouseEnter={onMouseEnterSidenav}
            onMouseLeave={onMouseLeaveSidenav}
        >
            {
                navigator.platform.indexOf("Win") > -1 ? (
                    <PerfectScrollbar>{scrollBarInnder}</PerfectScrollbar>
                ) : (
                    scrollBarInnder
                )
            }
        </Navbar>
    )
}

export default Sidebar;
