import { RouterProvider } from 'react-router';
import router from './helper-router/router';
import './App.css';
import './table.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
