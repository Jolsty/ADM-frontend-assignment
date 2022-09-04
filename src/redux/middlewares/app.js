import { init } from '../reducers/app'
import { fetchPeople } from '../thunks/app'

const appMiddleware = (storeAPI) => (next) => (action) => {
  switch (action.type) {
    case init.toString(): {
      storeAPI.dispatch(fetchPeople({ url: 'https://swapi.dev/api/people?page=1' })) // fetch first page
      break
    }
  }
  return next(action)
}

export default appMiddleware
