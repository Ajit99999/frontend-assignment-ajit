import { useReducer, useEffect } from 'react';

const useFetch = (url) => {
  const initialState = {
    data: [],         
    loading: false,  
    error: null,    
  };

  function dataReducerFn(state, action) {
    switch (action.type) {
      case 'FETCH_INIT':
        return { ...state, loading: true, error: null };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'FETCH_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  const [state, dispatch] = useReducer(dataReducerFn, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch the data.`);
        }
        const result = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: result });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

export default useFetch;
