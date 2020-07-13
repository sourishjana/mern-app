import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING} from './types'
import axios from 'axios'
import { tokenConfig} from './authActions'
import {returnErrors} from './errorActions'

export const getItems = ()=> dispatch =>{
    dispatch(setItemsLoading())
    axios.get('/api/items').then(res => dispatch({
        type:GET_ITEMS,
        payload:res.data
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
    /* return {
        type: GET_ITEMS
    } */
}
export const updateItem = (id,updates)=>(dispatch,getState) =>{

    axios.post(`/api/items/update/${id}`, updates, tokenConfig(getState)).then(res=>dispatch({
        type: UPDATE_ITEM,
        id,
        updates:res.data
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
    /* return {
        type: UPDATE_ITEM,
        id,
        updates
    } */
}
export const deleteItem = (id)=> (dispatch,getState) =>{
    axios.delete(`/api/items/${id}`, tokenConfig(getState)).then(res=>dispatch({
        type: DELETE_ITEM,
        payload:id
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
    /* return {
        type: DELETE_ITEM,
        id
    } */
}
export const addItem = (item)=> (dispatch,getState) =>{
    axios.post('/api/items', item, tokenConfig(getState)).then(res =>dispatch({
        type: ADD_ITEM,
        payload:item
    })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
    /* return {
        type: ADD_ITEM,
        item
    } */
}
export const setItemsLoading =()=>{
    return {
        type: ITEMS_LOADING
    }
}