import React, {useEffect} from "react"
import './App.css'
import {connect} from 'react-redux'
import FormExample from './components/FormExample'
import Matrix from './components/Matrix'
import {Link, Route, Switch, withRouter} from 'react-router-dom'

import {
  activeCurrenciesSelector,
  currencyListSelector,
  getCurrencyData,
  getDemoItems,
  initCurrencyList,
  itemsSelector,
  loadingErrorSelector,
} from './models/currency'

let App = ({
             initCurrencyList,
             currencyList,
             history,
             items,
             getDemoItems,
             loadingError,
             getCurrencyData,
             activeCurrencies
}) => {

  useEffect(() => {
    initCurrencyList()
  }, [initCurrencyList])

  const handleSubmit = (data) => {
    console.log(data)
    history.push('/')
  }

  if (loadingError) {
    return <div className="App">
      <header className="App-header">
        {loadingError}
      </header>
    </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/list">currency list</Link>
        <Link to="/form">form</Link>
        <Link to="/matrix">matrix</Link>
        <button onClick={() => getDemoItems()}>Set query</button>
        {items && items.map((i) => {
          return i.name
        })}

        <Switch>
          <Route path="/list" exact render={() =>
            currencyList && currencyList.map((item, key) => {
              return (
                <Link className="App-link" key={key} to={`/list/:${item}`}>
                  <div onClick={() => getCurrencyData(item)}>{item}</div>
                </Link>
              )
            })
          }/>
          <Route path="/list/:currency" render={() =>
            activeCurrencies && Object.keys(activeCurrencies).map((item, key) => {
              return (
                <Link className="App-link" key={key} to={`/list/:${item}`}>
                  <div onClick={() => getCurrencyData(item)}>{item}: {activeCurrencies[item]}</div>
                </Link>
              )
            })
          }/>
          <Route path="/form" render={() => <FormExample onSubmit={handleSubmit}/>}/>
          <Route path="/matrix" component={Matrix}/>
        </Switch>

      </header>
    </div>
  )
}


App = connect(state => ({
  currencyList: currencyListSelector(state),
  items: itemsSelector(state),
  loadingError: loadingErrorSelector(state),
  activeCurrencies: activeCurrenciesSelector(state),
}), {
  initCurrencyList,
  getCurrencyData,
  getDemoItems
})(App)

App = withRouter(App)

export default App