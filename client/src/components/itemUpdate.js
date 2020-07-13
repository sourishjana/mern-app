import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import {connect } from 'react-redux'
import {updateItem} from '../actions/itemActions'

class ItemUpdate extends React.Component {
    constructor(props) {
        super (props)
        this.state ={
            modal: false,
            name: props.name,
            completed: props.completed
        }
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
        const updates={
            name: this.state.name===""? "Nothing assigned" : this.state.name ,
            completed: this.state.completed
        }
        console.log(updates)
        this.props.updateItem(this.props.id,updates)
        this.toggle()
        this.setState({ completed:false })
    }
    render(){
        return (
            <div>
                <Button
                color="dark"
                style={{marginBottom:'1rem',marginTop:'1rem'}}
                onClick={this.toggle}>
                Update Item
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle} >Update this todo</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item" >Item</Label>
                            <Input type="text" value={this.state.name} name="name" id="item" placeholder="Add todo item" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input name="completed" type="checkbox" onChange={this.onChangeCompleted} defaultChecked={this.props.completed} />{' '}
                            Completed
                            </Label>
                        </FormGroup>
                        <Button color="dark">
                            Update Item
                        </Button>
            
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    item:state.item
})


export default connect(mapStateToProps, {updateItem})(ItemUpdate)

