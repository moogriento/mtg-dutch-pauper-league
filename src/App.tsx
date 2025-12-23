import { RouterProvider } from 'react-router';
import router from './helper-router/router';
import './global.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
