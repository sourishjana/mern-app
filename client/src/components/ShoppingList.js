import React from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'
import {connect} from 'react-redux'
import {getItems,deleteItem} from '../actions/itemActions'
import PropTypes from 'prop-types'
import ItemUpdate from './itemUpdate'

class ShoppingList extends React.Component {
    componentDidMount() {
        this.props.getItems()
    }

    handleClick=()=>{
        const name = prompt('Enter Item')
        if (name){
            this.setState( prevState=>({
                items: [...prevState.items,{ id:uuidv4(), name, completed:false } ]
            }))
        }
    }
    onDeleteClick=(id)=>{
        this.props.deleteItem(id)
    }
    render() {
        const {items} = this.props.item
        const {isAuthenticated}= this.props.auth
        return (
            <Container style={{marginBottom:'3rem'}} >
                <ListGroup>
                    <TransitionGroup className="shopping-list" >
                        { isAuthenticated ? items.map(({_id, name, completed})=>(
                            <CSSTransition style={completed ? {backgroundColor:'#F8F9FA' } : { backgroundColor:'white' }} key={_id} timeout={500} classNames="fade" >
                                <ListGroupItem>
                                <div style={{wordBreak:'break-all'}} >
                                {name}
                                </div>
                                <ItemUpdate
                                id={_id}
                                name={name}
                                completed={completed}
                                />
                                <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this, _id)}>
                                &times;
                                </Button>
                                </ListGroupItem>
                            </CSSTransition>
                        )) : 
                        null
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps =(state)=>({
    item: state.item,
    auth: state.auth
})

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList)
