import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./components/AppRouter";
import {useDispatch} from "react-redux";
import {restoreFromStorageAction} from "./store/reducers/userReducer";

function App()  {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(restoreFromStorageAction());
  })

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
