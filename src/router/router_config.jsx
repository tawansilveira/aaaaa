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
import CardapioAdm from '../adm/pages/cardapio/cardapioAdm';
import Pedidos from '../adm/pages/home/homeAdm';
import OrderSummary from '../pages/cart/orderSummary';
import Historico from '../adm/pages/historico';
import PedidosUsu from '../pages/pedidos/pedidos';


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
            { path: '/cardapioAdm', element:<CardapioAdm/>},
            { path: '/homeAdm', element:<Pedidos/>},
            {path: '/orderSummary/:orderId', element:<OrderSummary/>},
            {path: "/historico", element:<Historico/>},
            {path: "/pedidos1", element:<PedidosUsu/>},


        ]
    },
]);

export default RouterConfig;
