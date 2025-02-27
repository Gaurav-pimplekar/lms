"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Home from "./page";
import { Provider } from "react-redux";
import store from "@/redux/store";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Provider store={store}>
        {children}
        </Provider>
      </body>
    </html>
  );
}
