import './loginPage.css'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../utils/mutations';

import Auth from '../../../utils/auth';

const LoginPage = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (event.nativeEvent.submitter.value === 'signin') {

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }
    return (
        <>
            <div className="modal">
                <form>
                    <label>
                        <input id='emailModal' type="text" name="email" placeholder="email" onChange={handleChange} value={formState.email} />
                        <input id='passwordModal' type="password" name="password" placeholder="password" onChange={handleChange} value={formState.password} />
                    </label>
                </form>
            </div>
            <div className="login-container">
                <form onSubmit={handleFormSubmit}>
                    <label>
                        <input id='email' type="text" name="email" placeholder="email" onChange={handleChange} value={formState.email} />
                        <input id='password' type="password" name="password" placeholder="password" onChange={handleChange} value={formState.password} />
                    </label>
                    <button type="submit" value="login">Login</button>
                    <button type="submit" value="signin">Sign Up</button>
                </form>
            </div>
        </>
    );
}
export default LoginPage;