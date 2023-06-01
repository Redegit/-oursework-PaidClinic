import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';

export const RequireAdmin = ({ children }) => {
    const location = useLocation();
    const { admin } = useAuth();

    if (!admin) {
        return <Navigate to='/admin/auth' state={{ from: location }} />
    }
    return children;
}