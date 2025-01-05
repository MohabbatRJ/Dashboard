import { useMemo } from 'react';
import AuthForm from '../../common/auth-form/AuthForm';
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import useFormState from '../../../hooks/useFormState.js';
import Loading from '../../common/loading/Loading.jsx';
import { useNavigate, useLocation } from 'react-router-dom';


function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();


    const { showPassword: showPassword1, togglePasswordVisibility: togglePasswordVisibility1 } = usePasswordToggle();

    const initialFormValues = useMemo(() => ({
        email: localStorage.getItem('email') || '',
        password: localStorage.getItem('password') || '',
        remember: false,
        from: location.state?.from?.pathname !== '/signup' ? location.state?.from || { pathname: '/' } : { pathname: '/' },

    }), [location.state]);
    const { values, loading, handleChange, handleSubmit } = useFormState(initialFormValues);

    const { email, password, remember } = values;

   
    const setEmail = (value) => handleChange({ target: { name: 'email', value } });
    const setPassword = (value) => handleChange({ target: { name: 'password', value } });
    const setRememberMe = () => handleChange({ target: { name: 'remember', value: !remember } });

    return (

        <>
            <AuthForm
                formType="login"
                onSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}

                password={password}
                setPassword={setPassword}
                showPassword1={showPassword1}
                togglePasswordVisibility1={togglePasswordVisibility1}
                
                rememberMe={remember}
                setRememberMe={setRememberMe}

                navigate={navigate}
            />

            <Loading loading={loading} />
        </>
    );
}

export default LoginForm;
