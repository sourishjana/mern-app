import React from 'react';
import './App.css';
import AppNavbar from './components/Navbar'
import ShoppingList from './components/ShoppingList'
import {Container} from 'reactstrap'
import {Provider} from 'react-redux'
import store from './store'
import ItemCreate from './components/itemCreate'
import {loadUser} from './actions/authActions'


class App extends React.Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }

  render(){
    return (
      <Provider store={store} >
      <div className="App">
        <AppNavbar/>
        <Container>
          <ItemCreate />
          <h1>Hello todo</h1>
          <ShoppingList />
        </Container>
      </div>
      </Provider>
    );
  }
  
}

export default App;
