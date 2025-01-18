import PropTypes, { checkPropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import ShowPassword from '../show-password/ShowPassword';
import Input from '../input/Input';
import Button from '../button/Button';
import { useEffect } from 'react';

// Reusable PasswordField component
const PasswordField = ({ id, value, onChange, showPassword, togglePasswordVisibility }) => (
    <div className="mb-5 relative">
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {id === 'password' ? 'Your password' : 'Repeat password'}
        </label>
        <Input
            id={id}
            type={showPassword ? "text" : "password"}
            placeholder={'123456'}
            value={value}
            onChange={onChange}
        />
        <ShowPassword showFunc={togglePasswordVisibility} showState={showPassword} />
    </div>
);

// Reusable CheckboxField component
const CheckboxField = ({ id, checked, onChange, label }) => (
    <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
            <Input id={id} type="checkbox" checked={checked} onChange={onChange} />
        </div>
        <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
        </label>
    </div>
);

const AuthForm = ({
    formType,
    onSubmit,
    email,
    setEmail,
    password,
    repeatPassword,
    setPassword,
    setRepeatPassword,
    showPassword1,
    showPassword2,
    togglePasswordVisibility1,
    togglePasswordVisibility2,
    rememberMe,
    setRememberMe,
    agreeTerms,
    setAgreeTerms,
    navigate
}) => {
    useEffect(() => {
        // You can check prop types manually if formType is 'signup'
        if (formType === 'signup') {
            checkPropTypes(
                AuthForm.propTypes,
                { formType, onSubmit, email, setEmail, password, setPassword, showPassword1, togglePasswordVisibility1, navigate  },
                'prop',
                'AuthForm'
            );
        }
    }, [formType, onSubmit, email, setEmail, password, setPassword, showPassword1, togglePasswordVisibility1, navigate]);
    return (
        <section className="loginForm py-8 min-h-svh max-w-xl mx-auto flex items-center justify-center flex-col">
            <div className="w-full flex items-center justify-center">
                <form onSubmit={(e) => onSubmit(e, formType, navigate)} className="w-full p-10 border border-1 border-primary-100 rounded">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <Input id={'email'} type={'text'} placeholder={'name@mail.com'} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <PasswordField
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPassword={showPassword1}
                        togglePasswordVisibility={togglePasswordVisibility1}
                    />

                    {formType === 'signup' && (
                        <>
                            <PasswordField
                                id="repeat-password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                showPassword={showPassword2}
                                togglePasswordVisibility={togglePasswordVisibility2}
                            />

                            <CheckboxField
                                id="terms"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                label={
                                    <>
                                        I agree with the{' '}
                                        <NavLink to="/" className="text-primary-700 hover:underline dark:text-primary-800">
                                            terms and conditions
                                        </NavLink>
                                    </>
                                }
                            />
                        </>
                    )}

                    {formType === 'login' && (
                        <div className='grid grid-cols-2 grid-flow-col mb-5'>
                            <CheckboxField
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                label="Remember me"
                            />
                            <div className="text-end">
                                <NavLink to="/signup" className="bg-btn-transparent">Sign up</NavLink>
                            </div>
                        </div>
                    )}

                    <Button type="submit" className="bg-btn-primary-700">
                        {formType === 'signup' ? 'Register new account' : 'Submit'}
                    </Button>
                </form>
            </div>
        </section>
    );
};

AuthForm.propTypes = {
    formType: PropTypes.oneOf(['login', 'signup']).isRequired,
    onSubmit: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    repeatPassword: PropTypes.string,
    setPassword: PropTypes.func.isRequired,
    setRepeatPassword: PropTypes.func,
    showPassword1: PropTypes.bool.isRequired,
    showPassword2: PropTypes.bool,
    togglePasswordVisibility1: PropTypes.func.isRequired,
    togglePasswordVisibility2: PropTypes.func,
    rememberMe: PropTypes.bool,
    setRememberMe: PropTypes.func,
    agreeTerms: PropTypes.bool,
    setAgreeTerms: PropTypes.func,
    navigate: PropTypes.func.isRequired,
};
PasswordField.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    showPassword: PropTypes.bool.isRequired,
    togglePasswordVisibility: PropTypes.func.isRequired,
};
CheckboxField.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.node.isRequired,
};  


export default AuthForm;
