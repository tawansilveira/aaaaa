import { Outlet } from "react-router-dom";
import NavBar from "./components/nav_bar";
import Login from "./pages/login/login";

const App = () => {
    return (
        <body id="body">
            <NavBar />
            <Outlet />
        </body>
    );
}

export default App;

