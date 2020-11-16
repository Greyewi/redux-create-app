import React, { useEffect } from "react"
import './App.css';
import { connect } from 'react-redux'
import {
  currencyListSelector,
  initCurrencyList
} from './models/currency'

function App({initCurrencyList, currencyList}) {

  useEffect(() => {
    initCurrencyList()
  }, [initCurrencyList])

  return (
    <div className="App">
      <header className="App-header">
        {currencyList && currencyList.map((item, key) => {
          return (<div key={key}>{item}</div>)
        })}
      </header>
    </div>
  );
}

export default connect(state => ({
  currencyList: currencyListSelector(state)
}), {
  initCurrencyList
})(App)

