import React, { useEffect } from "react"
import './App.css';
import { connect } from 'react-redux'
import FormExample from './components/FormExample'
import {Route, Switch, Link} from 'react-router-dom'

import {
  currencyListSelector,
  initCurrencyList
} from './models/currency'

function App({initCurrencyList, currencyList}) {

  useEffect(() => {
    initCurrencyList()
  }, [initCurrencyList])

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/list">currency list</Link>
        <Link to="/form">form</Link>
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

export default connect(state => ({
  currencyList: currencyListSelector(state)
}), {
  initCurrencyList
})(App)

