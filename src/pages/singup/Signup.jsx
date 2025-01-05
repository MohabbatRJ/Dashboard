import { useMemo } from 'react'
import SignupForm from '../../components/auth/singup-form/SignupForm'

function Signup() {
    const memoizedSignupForm = useMemo(() => <SignupForm />, []);

    return memoizedSignupForm;
}

export default Signup
