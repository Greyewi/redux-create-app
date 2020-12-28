import axios from "axios"
import apiList from './apis'

export const fetchMiddleware = storeAPI => next => action => {
  if (action.type.includes('REQUEST')) {

    const getApi = apiList(action.payload)[action.type.replace('_REQUEST', '')]
    axios.get(getApi.url).then(({data}) => {
      storeAPI.dispatch({
        type: action.type.replace('REQUEST', 'SUCCESS'),
        payload: getApi.selector(data)
      })
    })
  }

  return next(action)
}