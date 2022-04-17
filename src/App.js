import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, {persistor} from "./common/store";
import { Home } from "./features/home";

const fname = "brian";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <Home fname={fname} />
      </PersistGate>
    </Provider>
  );
}

export default App;
