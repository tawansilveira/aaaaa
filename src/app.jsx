
import { Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/nav_bar";
import Login from "./pages/login/login";
import AdmComponent from "../src/adm/components/admComponent"; // Supondo seu componente ADM

const App = () => {
  return (
    <div id="body">
      <Routes>
        <Route path="/" element={<NavBar />} />  {/* Renderizar navbar para todas as rotas não ADM */}
        <Route path="/login" element={<NavBar />} />  {/* Rota específica para login */}
        <Route path="/cardapio" element={<NavBar />} />
        <Route path="/contato" element={<NavBar />} />
        <Route path="/carrinho" element={<NavBar />} />
        <Route path="/cardapio" element={<NavBar />} />
        <Route path="/register" element={<NavBar />} />
        <Route path="/adm/*" element={<AdmComponent withoutNavBar={true} />} /> {/* Rota ADM com prop */}
        {/* Adicione outras rotas não ADM aqui */}
      </Routes>
      <Outlet />  {/* Outlet para rotas aninhadas dentro do layout apropriado */}
    </div>
  );
};

export default App;
