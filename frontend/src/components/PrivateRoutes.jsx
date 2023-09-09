import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoutes() {
  const { auth } = useAuth(); // auth from useAuth hook
  console.log({ auth });

  if (auth === undefined) return 'loading...'; // Auth not loaded 

  return auth === true ? <Outlet /> : <Navigate to="/auth" />; // Go to respective routes if authenticated else go to auth route
}

export default PrivateRoutes;