import React, { Component } from "react";
import { Navbar, NavbarBrand, Jumbotron, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isnavopen: true
        }
        this.toggleNav = this.toggleNav.bind(this);
    }
    toggleNav() {
        this.setState({
            isnavopen: !this.state.isnavopen
        });
    }
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" className='navbar'>
                    {/* <div className="container"> */}
                    <NavbarBrand className="mr-auto" href="/">
                        <img src='assets/images/logo.png' height="30" width="41" alt="Ristorante Con Fusion" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isnavopen} navbar>
                        <Nav navbar>

                            <NavItem>
                                <NavLink className="nav-link" to='/staffs'>
                                    <span className="fa fa-users fa-lg"></span> Nhân Viên
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/departments'>
                                    <span className="fa fa-address-card fa-lg"></span> Phòng ban
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='/salaryTable'>
                                    <span className="fa fa-money fa-lg"></span> Bảng Lương
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse >
                    {/* </div> */}
                </Navbar >
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment >
        );
    }

}

export default Header;