import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });  // getting the same user model as the auth reducer
}

// refactor with async - await
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data }); // only interested in the data from the response
};

export const submitSurvey = (values, history) => async dispatch =>{
    // console.log("submit survey action", values);
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys'); // navigate user back to the dashboard page
    dispatch({ type: FETCH_USER, payload: res.data }) // the api response with user with updated credit    
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

// using redux-thunk
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get("/api/current_user")
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };

// older version of the same action:
// const fetchUserOld = () => {
//     const request = axios.get("/api/current_user");
//     return {
//         type: FETCH_USER,
//         payload: request
//     };
// };
