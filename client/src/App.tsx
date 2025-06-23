import { useState } from "react";
import "./App.css";
import NavUi from "./components/ui/nav/nav";
import Guest from "./components/routing/guest";
import Authorized from "./components/routing/authorized";

function App() {
  const [auth, setAuth] = useState<boolean>(false);
  return (
    <>
      <NavUi auth={auth} />
      {auth ? <Authorized /> : <Guest />}
    </>
  );
}

export default App;
