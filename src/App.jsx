import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsListPage from './pages/ProductsListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import EventsPage from './pages/EventsPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

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
        path: '/products/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: '/events',
        element: <EventsPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
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
