import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import {connect } from 'react-redux'
import {addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'
//import { v4 as uuidv4 } from 'uuid'

class ItemCreate extends React.Component {
    state={
        modal: false,
        name:'',
        completed:false
    }
    toggle=()=>{
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange=(e)=>{
        this.setState({ [e.target.name]:e.target.value })
    }
    onChangeCompleted=()=>{
        this.setState({ completed: !this.state.completed })
    }
    onSubmit=(e)=>{
        e.preventDefault()
        const newItem={
            //id:uuidv4(),
            name: this.state.name,
            completed: this.state.completed
        }
        this.props.addItem(newItem)
        this.toggle()
        this.setState({ completed:false })
    }
    
    render(){
        const {isAuthenticated}= this.props.auth
        return (
            <div>
                {
                    isAuthenticated ? 
                    <Button
                    color="dark"
                    style={{marginBottom:'2rem'}}
                    onClick={this.toggle}>
                    Add Item
                    </Button> : null
                }
                
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle} >Add to todo list</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item" >Item</Label>
                            <Input type="text" name="name" id="item" placeholder="Add todo item" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" onChange={this.onChangeCompleted} />{' '}
                            Completed
                            </Label>
                        </FormGroup>
                        <Button color="dark" style={{ marginTop:"2rem" }} >
                            Add Item
                        </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
ItemCreate.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    item:state.item,
    auth: state.auth
})

export default connect(mapStateToProps, {addItem})(ItemCreate)
