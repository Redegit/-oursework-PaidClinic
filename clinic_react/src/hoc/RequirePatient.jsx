import { Navigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';

export const RequirePatient = ({ children }) => {
    const { patient } = useAuth();

    if (!patient) {
        return <Navigate to='/' state={{ showAuthForm: true }} />
    }
    return children;
}