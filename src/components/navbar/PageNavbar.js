import React from 'react';

import classnames from "classnames";
import {
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    ListGroupItem,
    ListGroup,
    Media,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col
} from 'reactstrap';
import team1 from "../../assets/img/theme/team-1.jpg"
import team2 from "../../assets/img/theme/team-2.jpg"
import team3 from "../../assets/img/theme/team-3.jpg"
import team4 from "../../assets/img/theme/team-4.jpg"
import team5 from "../../assets/img/theme/team-5.jpg"
import { connect } from 'react-redux';
import { logout } from '../../store/actions';
import { useHistory } from 'react-router';

function PageNavbar(props) {

    const history = useHistory();

    const openSearch = () => {
        document.body.classList.add("g-navbar-search-showing");
        setTimeout(function () {
            document.body.classList.remove("g-navbar-search-showing");
            document.body.classList.add("g-navbar-search-show");
        }, 150);
        setTimeout(function () {
            document.body.classList.add("g-navbar-search-shown");
        }, 300);
    };

    const closeSearch = () => {
        document.body.classList.remove("g-navbar-search-shown");
        setTimeout(function () {
            document.body.classList.remove("g-navbar-search-show");
            document.body.classList.add("g-navbar-search-hiding");
        }, 150);
        setTimeout(function () {
            document.body.classList.remove("g-navbar-search-hiding");
            document.body.classList.add("g-navbar-search-hidden");
        }, 300);
        setTimeout(function () {
            document.body.classList.remove("g-navbar-search-hidden");
        }, 500);
    };


    return (
        <>
            <Navbar
                className="navbar-top navbar-expand border-bottom navbar-dark bg-info">
                <Container fluid>
                    <Collapse navbar isOpen={true}>
                        <Form
                            className="navbar-search form-inline mr-sm-3 navbar-search-light">
                            <FormGroup className="mb-0">
                                <InputGroup className="input-group-alternative input-group-merge">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fas fa-search" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Search" type="text" />
                                </InputGroup>
                            </FormGroup>
                            <button
                                aria-label="Close"
                                className="close"
                                type="button"
                                onClick={closeSearch}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </Form>

                        <Nav className="align-items-center ml-md-auto" navbar>
                            <NavItem className="d-xl-none">
                                <div
                                    className={classnames(
                                        "pr-3 sidenav-toggler sidenav-toggler-dark",
                                        { active: props.sidenavOpen }
                                    )}
                                    onClick={props.toggleSidenav}
                                >
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line" />
                                        <i className="sidenav-toggler-line" />
                                        <i className="sidenav-toggler-line" />
                                    </div>
                                </div>
                            </NavItem>
                            <NavItem className="d-sm-none">
                                <NavLink onClick={openSearch}>
                                    <i className="ni ni-zoom-split-in" />
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="nav-link" color="" tag="a">
                                    <i className="ni ni-bell-55" />
                                </DropdownToggle>
                                <DropdownMenu
                                    className="dropdown-menu-xl py-0 overflow-hidden"
                                    right
                                >
                                    <div className="px-3 py-3">
                                        <h6 className="text-sm text-muted m-0">
                                            You have <strong className="text-info">13</strong>{" "}
                        notifications.
                      </h6>
                                    </div>

                                    <ListGroup flush>
                                        <ListGroupItem
                                            className="list-group-item-action"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            tag="a"
                                        >
                                            <Row className="align-items-center">
                                                <Col className="col-auto">
                                                    <img
                                                        alt="..."
                                                        className="avatar rounded-circle"
                                                        src={team1}
                                                    />
                                                </Col>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>2 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">
                                                        Let's meet at Starbucks at 11:30. Wdyt?
                            </p>
                                                </div>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            className="list-group-item-action"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            tag="a"
                                        >
                                            <Row className="align-items-center">
                                                <Col className="col-auto">
                                                    <img
                                                        alt="..."
                                                        className="avatar rounded-circle"
                                                        src={team2}
                                                    />
                                                </Col>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>3 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">
                                                        A new issue has been reported for Argon.
                            </p>
                                                </div>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            className="list-group-item-action"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            tag="a"
                                        >
                                            <Row className="align-items-center">
                                                <Col className="col-auto">
                                                    <img
                                                        alt="..."
                                                        className="avatar rounded-circle"
                                                        src={team3}
                                                    />
                                                </Col>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>5 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">
                                                        Your posts have been liked a lot.
                            </p>
                                                </div>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            className="list-group-item-action"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            tag="a"
                                        >
                                            <Row className="align-items-center">
                                                <Col className="col-auto">
                                                    <img
                                                        alt="..."
                                                        className="avatar rounded-circle"
                                                        src={team4}
                                                    />
                                                </Col>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>2 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">
                                                        Let's meet at Starbucks at 11:30. Wdyt?
                            </p>
                                                </div>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            className="list-group-item-action"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            tag="a"
                                        >
                                            <Row className="align-items-center">
                                                <Col className="col-auto">
                                                    <img
                                                        alt="..."
                                                        className="avatar rounded-circle"
                                                        src={team5}
                                                    />
                                                </Col>
                                                <div className="col ml--2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h4 className="mb-0 text-sm">John Snow</h4>
                                                        </div>
                                                        <div className="text-right text-muted">
                                                            <small>3 hrs ago</small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm mb-0">
                                                        A new issue has been reported for Argon.
                            </p>
                                                </div>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>

                                    <DropdownItem
                                        className="text-center text-info font-weight-bold py-3"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        View all
                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="nav-link" color="" tag="a">
                                    <i className="ni ni-ungroup" />
                                </DropdownToggle>
                                <DropdownMenu
                                    className="dropdown-menu-lg dropdown-menu-dark bg-default"
                                    right
                                >
                                    <Row className="shortcuts px-4">
                                        <Col
                                            className="shortcut-item"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            xs="4"
                                            tag="a"
                                        >
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                                                <i className="ni ni-calendar-grid-58" />
                                            </span>
                                            <small>Calendar</small>
                                        </Col>
                                        <Col
                                            className="shortcut-item"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            xs="4"
                                            tag="a"
                                        >
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                                                <i className="ni ni-email-83" />
                                            </span>
                                            <small>Email</small>
                                        </Col>
                                        <Col
                                            className="shortcut-item"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            xs="4"
                                            tag="a"
                                        >
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                                                <i className="ni ni-credit-card" />
                                            </span>
                                            <small>Payments</small>
                                        </Col>
                                        <Col
                                            className="shortcut-item"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            xs="4"
                                            tag="a"
                                        >
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                                                <i className="ni ni-books" />
                                            </span>
                                            <small>Reports</small>
                                        </Col>
                                        <Col
                                            className="shortcut-item"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            xs="4"
                                            tag="a"
                                        >
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                                                <i className="ni ni-pin-3" />
                                            </span>
                                            <small>Maps</small>
                                        </Col>
                                        <Col
                                            className="shortcut-item"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            xs="4"
                                            tag="a"
                                        >
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                                                <i className="ni ni-basket" />
                                            </span>
                                            <small>Shop</small>
                                        </Col>
                                    </Row>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <Nav className="align-items-center ml-auto ml-md-0" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                    <Media className="align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img
                                                alt="..."
                                                src={team4}
                                            />
                                        </span>
                                        <Media className="ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm font-weight-bold">
                                                John Snow
                        </span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem className="noti-title" header tag="div">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <i className="ni ni-single-02" />
                                        <span>My profile</span>
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <i className="ni ni-settings-gear-65" />
                                        <span>Settings</span>
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <i className="ni ni-calendar-grid-58" />
                                        <span>Activity</span>
                                    </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <i className="ni ni-support-16" />
                                        <span>Support</span>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem
                                        onClick={e => {
                                            e.preventDefault();
                                            props.logout(history);
                                        }}
                                    >
                                        <i className="ni ni-user-run" />
                                        <span>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>

                    </Collapse>
                </Container>
            </Navbar>
        </>
    )
}


export default connect(null, { logout })(PageNavbar);