import { FETCH_USER } from '../actions/types';

export default function(state = null, action) { // default is null, we don't know weather a user is loggedin
  //console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
