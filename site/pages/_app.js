import "../styles/globals.css";
import "react-notifications/lib/notifications.css";
import { useState } from "react";
import { NotificationContainer } from "react-notifications";

import Header from "../components/header";
import Footer from "../components/footer";

export default function App({ Component, pageProps }) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <Header searchText={searchText} changeSearch={setSearchText} />
      <div className="flex-1">
        <Component {...pageProps} searchText={searchText} />
      </div>
      <Footer />
      <NotificationContainer />
    </div>
  );
}
