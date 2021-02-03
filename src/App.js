import React, {useEffect} from "react"
import './App.css'
import {connect} from 'react-redux'
import FormExample from './components/FormExample'
import Matrix from './components/Matrix'
import {Route, Switch, Link} from 'react-router-dom'

import {
  currencyListSelector,
  loadingErrorSelector,
  initCurrencyList
} from './models/currency'

function App({initCurrencyList, currencyList, loadingError}) {

  useEffect(() => {
    initCurrencyList()
  }, [initCurrencyList])

  const handleSubmit = (data) => {
    console.log(data)
  }

  if(loadingError){
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
        <Switch>
          <Route path="/list" render={() =>
            currencyList && currencyList.map((item, key) => {
              return (<div key={key}>{item}</div>)
            })
          }/>
          <Route path="/form" render={() => <FormExample onSubmit={handleSubmit}/>}/>
          <Route path="/matrix" component={Matrix}/>
        </Switch>


      </header>
    </div>
  )
}

export default connect(state => ({
  currencyList: currencyListSelector(state),
  loadingError: loadingErrorSelector(state)
}), {
  initCurrencyList
})(App)

