import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Collapse,
    NavbarToggler,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../Redux/AuthActionCreator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ token }) => {
    const { user } = useSelector(({ user }) => ({ user }));
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    return (
        <Navbar expand="lg" className="navbar-container">
            <div className="container">
                <NavbarBrand href="/">
                    <img src={Logo} alt="logo" width="150px" />
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {token === null ? (
                            <NavItem>
                                <NavLink to="/login" className="router-nav-link-login">Login</NavLink>
                            </NavItem>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink to="/home" className="router-nav-link">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/orders" className="router-nav-link">Orders</NavLink>
                                </NavItem>
                                <UncontrolledDropdown>
                                    <DropdownToggle className="dropdown-btn">
                                        <button className="dashboard-link">
                                            <FontAwesomeIcon icon={faUser} />{user ? user.name : (
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            )}
                                        </button>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <button className="dashboard-link" onClick={() => dispatch(Logout())}>
                                                <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                                            </button>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    )
}

export default Header;
