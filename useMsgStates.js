import React from 'react'

const INITIAL_STATE = {
  loading: false,
  error: null,
  content: [],
  ready: false
}

const useMsgStates = () => {
  const [state, dispatch] = React.useReducer(reducer,INITIAL_STATE)

  function reducer(state, action){
    switch (action.type) {
      case 'LOADING':
        return {
          loading: true,
          error: null,
          content: [],
          ready: false
        };
      case 'SUCCESS':
        return {
          loading: false,
          error: null,
          content: action.payload,
          ready: true
        };
      case 'ERROR':
        return {
          loading: false,
          error: action.error,
          content: [],
          ready: false
        };
      default:
        return state
    }
  }
  
  return {state, dispatch}
}

export default useMsgStates


