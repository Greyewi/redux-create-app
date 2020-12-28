import React, { useEffect } from "react"
import './App.css';
import { connect } from 'react-redux'
import FormExample from './components/FormExample'
import {Route, Switch, Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import {
  currencyListSelector,
  initCurrencyList,
  itemsSelector,
  getDemoItems
} from './models/currency'

let App = ({initCurrencyList, currencyList, history, items, getDemoItems}) => {

  useEffect(() => {
    initCurrencyList()
  }, [initCurrencyList])

  const handleSubmit = (data) => {
    console.log(data)
    history.push('/')
  }

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/list">currency list</Link>
        <Link to="/form">form</Link>
        <button onClick={() => getDemoItems()}>Set query</button>
        {items && items.map((i) => {
          return i.name
        })}

        <Switch>
          <Route path="/list" render={() =>
            currencyList && currencyList.map((item, key) => {
              return (<div key={key}>{item}</div>)
            })
          }/>
          <Route path="/form" render={() => <FormExample onSubmit={handleSubmit}/>}/>
        </Switch>

      </header>
    </div>
  );
}

App = connect(state => ({
  currencyList: currencyListSelector(state),
  items: itemsSelector(state),


}), {
  initCurrencyList,
  getDemoItems
})(App)

App = withRouter(App)

export default App