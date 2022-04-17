import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, {persistor} from "./common/store";
import { Home } from "./features/home";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
}

export default App;
