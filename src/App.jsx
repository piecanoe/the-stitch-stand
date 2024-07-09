import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsListPage from './pages/ProductsListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
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
        element: <ProductDetailsPage />,
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
