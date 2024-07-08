import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsListPage from './pages/ProductsListPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductsListPage />,
      },
      {
        path: `/products/:productId`,
        element: <ProductPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
