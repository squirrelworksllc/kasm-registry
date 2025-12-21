import "../styles/globals.css";
import { useState } from "react";

import Header from "../components/header";
import Footer from "../components/footer";

export default function App({ Component, pageProps }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Component {...pageProps} search={search} />
      <Footer />
    </>
  );
}
