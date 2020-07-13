import React, {Fragment} from 'react'
import {NavLink} from 'reactstrap'
import {connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/authActions'
//import { clearErrors } from '../../actions/errorActions'

class Logout extends React.Component {
    static propTypes= {
        logout: PropTypes.func.isRequired
    }
    render(){
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href="#" >
                    Logout
                </NavLink>
            </Fragment>
        )
    }
}

const mapStateToProps=(state)=>({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, {logout})(Logout)


