import { UserContextProvider } from "./UserContext";
import { AppRoutes } from "./routes/routes";
import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <AppRoutes/>
    </UserContextProvider>
  );
}

export default App;
