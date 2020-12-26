import React, {useEffect} from "react"
import './App.css';
import {connect} from 'react-redux'
import FormExample from './components/FormExample'

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

    return (
        <div className="App">
            <header className="App-header">
                {/*<div>*/}
                {/*    {currencyList && currencyList.map((item, key) => {*/}
                {/*        return (<div key={key}>{item}</div>)*/}
                {/*    })}*/}
                {/*</div>*/}
                <div>
                {console.log(loadingError)}
                </div>
                {/*<FormExample onSubmit={handleSubmit}/>*/}
            </header>
        </div>
    );
}

export default connect(state => ({
        currencyList: currencyListSelector(state), loadingError: loadingErrorSelector(state)
    }),
    {initCurrencyList})(App)

