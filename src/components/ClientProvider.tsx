"use client";

import {ReactNode} from "react";
import {Provider} from "react-redux";
import {persistor, store} from "@/redux/store";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {PersistGate} from "redux-persist/integration/react";

export default function ClientProvider({children}: {children: ReactNode}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </PersistGate>
    </Provider>
  );
}
