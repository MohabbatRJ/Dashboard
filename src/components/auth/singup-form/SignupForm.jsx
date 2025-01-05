import { useMemo } from 'react';
import AuthForm from '../../common/auth-form/AuthForm';
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import useFormState from '../../../hooks/useFormState.js';
import Loading from '../../common/loading/Loading.jsx'
import { useLocation, useNavigate } from 'react-router-dom';

function SignupForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const { showPassword: showPassword1, togglePasswordVisibility: togglePasswordVisibility1 } = usePasswordToggle();
    const { showPassword: showPassword2, togglePasswordVisibility: togglePasswordVisibility2 } = usePasswordToggle();

    const initialFormValues = useMemo(() => ({
        email: '',
        password: '',
        repeatPassword: '',
        agreeTerms: false,
        from: location.state?.from?.pathname !== '/signup' ? location.state?.from || { pathname: '/' } : { pathname: '/' },
    }), [location.state]);

    const { values, loading, handleChange, handleSubmit } = useFormState(initialFormValues);
    

    const { email, password, repeatPassword, agreeTerms } = values;

   
    const setEmail = (value) => handleChange({ target: { name: 'email', value } });
    const setPassword = (value) => handleChange({ target: { name: 'password', value } });
    const setRepeatPassword = (value) => handleChange({ target: { name: 'repeatPassword', value } });
    const setAgreeTerms = () => handleChange({ target: { name: 'agreeTerms', value: !agreeTerms } });

    return (
        <>
            <AuthForm
                formType="signup"
                onSubmit={handleSubmit}

                email={email}
                setEmail={setEmail}

                password={password}
                repeatPassword={repeatPassword}

                setPassword={setPassword}
                setRepeatPassword={setRepeatPassword}

                showPassword1={showPassword1}
                showPassword2={showPassword2}

                togglePasswordVisibility1={togglePasswordVisibility1}
                togglePasswordVisibility2={togglePasswordVisibility2}


                agreeTerms={agreeTerms}
                setAgreeTerms={setAgreeTerms}

                navigate={navigate}

            />

            <Loading loading={loading} />
        </>
    );
}

export default SignupForm;
