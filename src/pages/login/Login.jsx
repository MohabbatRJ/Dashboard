import { useMemo } from 'react';
import LoginForm from '../../components/auth/login-form/LoginForm'

function Login() {
    const memoizedLoginForm = useMemo(() => <LoginForm />, []);
    
    return memoizedLoginForm;
}

export default Login
