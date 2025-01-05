import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../store/actions/authActions/authActionForm/loginUserAction';
import { signupUserAction } from '../store/actions/authActions/authActionForm/signupUserAction';



const useFormState = (initialState = {}) => {

    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const [values, setValues] = useState(initialState);
    
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (event, formType, navigate) => {
        event.preventDefault();
        if (formType === 'signup') {
            dispatch(signupUserAction({ 'data': values }));
        } else if (formType === 'login') {
            dispatch(loginUserAction({ 'data': values }, navigate));
        }
        if(!error){
            resetForm();
        }
    };

    const resetForm = () => {
        setValues(initialState);
    };

    return {
        values,
        handleChange,
        handleSubmit,
        resetForm,
        loading,
        error,
    };
};

export default useFormState;
