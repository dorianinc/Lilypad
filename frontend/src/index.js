import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import CalendarProvider from "./context/CalendarContext";
import CounterProvider from "./context/CounterContext";
import MapProvider from "./context/MapContext";
import App from "./App";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/sessionReducer";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <CalendarProvider>
      <CounterProvider>
        <ModalProvider>
          <Provider store={store}>
            <BrowserRouter>
              <MapProvider>
                <App />
              </MapProvider>
              <Modal />
            </BrowserRouter>
          </Provider>
        </ModalProvider>
      </CounterProvider>
    </CalendarProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
