import { createBrowserRouter } from 'react-router-dom';
import App from '../app';
import HomePage from '../pages/home/home_page';
import Cardapio from '../pages/cardapio/cardapio';
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ProductCards from "../pages/cart/cart";
import CartProvider from "../contexts/cart_provider";
import Contato from '../pages/contato/contato';
import LoginAdm from '../adm/pages/login/loginAdm';
import HomePageAdm from '../adm/pages/home/homeAdm';
import CardapioAdm from '../adm/pages/cardapio/cardapioAdm';

const RouterConfig = createBrowserRouter([
    {
        path: '/', element: <CartProvider><App /></CartProvider>, children: [
            { path: '/', element: <HomePage /> },
            { path: '/cardapio', element: <Cardapio /> },
            { path: '/login', element: <Login/> },
            { path: '/register', element: <Register/> },
            { path: '/carrinho', element: <ProductCards/> },
            { path: '/contato', element:<Contato/> },
            { path: '*', element: <h1>404 - Página não encontrada</h1>},
            { path: '/adm', element:<LoginAdm/>},
            { path: '/homeAdm', element:<HomePageAdm/>},
            { path: '/cardapioAdm', element:<CardapioAdm/>}
        ]
    },
]);

export default RouterConfig;
