import { useContext, useEffect } from "react";
import NavUi from "./components/ui/nav/nav";
import Guest from "./components/routing/guest";
import Authorized from "./components/routing/authorized";
import type { TokenRes } from "./types/Auth.types";
import axios from "axios";

import "./App.css";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { auth, setAuth, setUser } = useContext(UserContext);

  useEffect(() => {
    async function GetToken() {
      const data = await axios.get<TokenRes | null>(
        "http://localhost:5174/Auth/GetToken",
        { withCredentials: true }
      );

      console.log(data.data?.user);

      if (data.data?.user.exp && data.data?.user.exp > Date.now() / 1000) {
        setAuth(true);

        setUser({
          _id: data.data?.user._id,
          Name: data.data?.user.Name,
          YearOfBirth: data.data?.user.YearOfBirth,
          FavoritePerfumes: data.data?.user.FavoritePerfumes,
        });
      } else {
        setAuth(false);
        setUser(null);
        return;
      }
    }

    GetToken();
  }, []);

  return (
    <>
      <NavUi />
      {auth ? <Authorized /> : <Guest />}
    </>
  );
}

export default App;
