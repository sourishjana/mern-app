import React, {Fragment} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  //NavLink,
  Container
} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import RegisterModal from './auth/registerModal'
import LoginModal from './auth/loginModal'
import Logout from './auth/logout'

class AppNavbar extends React.Component {
    state={
        isOpen:false
    }
    static propTypes={
        auth: PropTypes.object.isRequired
    }
    toggle =()=>{
        this.setState({
            isOpen: ! this.state.isOpen
        })
    }
    render(){
        const {isAuthenticated, user}= this.props.auth
        let name=''
        if(user){
            name=user.name
        }
        const authLinks=(
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong> { name ? `Welcome ${name}`: 'Welcome ' } </strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        )
        const guestLinks=(
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem> 
                <NavItem>
                    <LoginModal />
                </NavItem> 
            </Fragment>
        )
        return (
        <div>
            <Navbar color="light" light expand="sm" className="mb-5" >
                <Container>
                    <NavbarBrand herf="/" >Shopping list</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar >
                        <Nav className="ml-auto" navbar >
                            
                            { isAuthenticated ? authLinks : guestLinks }
                            
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        )
    }
}

const mapStateToProps=(state)=>({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar)
