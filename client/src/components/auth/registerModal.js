import React from 'react'
import {Button, Modal, ModalHeader,Alert, ModalBody, Form, FormGroup, Label, Input, NavLink} from 'reactstrap'
import {connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends React.Component {
    state={
        modal: false,
        name:'',
        email:'',
        password: '',
        msg:null
    }

    static propTypes= {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props
        console.log(error, prevProps.error)
        if(error !== prevProps.error){
            //console.log(error.id)
            if(error.id ==='REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg })
                //console.log(this.state.msg, error.msg.msg)
            }else{
                this.setState({ msg:null })
            }
        }
        if (this.state.modal){
            if( isAuthenticated){
                this.toggle()
            }
        }
    }

    toggle=()=>{
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange=(e)=>{
        this.setState({ [e.target.name]:e.target.value })
    }
    onSubmit=(e)=>{
        e.preventDefault()
        const {name, email, password} = this.state
        const newUser = {
            name,
            email,
            password
        }
        this.props.register(newUser)
        //this.toggle()
    }
    
    render(){
        return (
            <div>
                <NavLink onClick={this.toggle} href="#" >
                    Register
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle} >Register</ModalHeader>
                    <ModalBody>

                        { this.state.msg ? <Alert color="danger" >{this.state.msg}</Alert> : null  }

                        <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name" >Name</Label>
                            <Input className="mb-3" type="text" name="name" id="name" placeholder="Name" onChange={this.onChange} />
                            <Label for="email" >Email</Label>
                            <Input className="mb-3" type="text" name="email" id="email" placeholder="Email" onChange={this.onChange} />
                            <Label for="password" >Password</Label>
                            <Input className="mb-3" type="text" name="password" id="password" placeholder="Password" onChange={this.onChange} />
                        </FormGroup>
                        <Button color="dark" style={{ marginTop:"2rem" }} >
                            Register
                        </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})


export default connect(mapStateToProps, {register, clearErrors})(RegisterModal)


