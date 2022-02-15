import './loginPage.css'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { LOGIN, ADD_USERS } from '../../../utils/mutations';

import Auth from '../../../utils/auth';

const LoginPage = () => {
    //handles email, password, username
    const [formState, setFormState] = useState({ email: '', password: '', username: '' });
    //handles modal display
    const [modalState, setModalState] = useState("hide")

    const [login, { loginError }] = useMutation(LOGIN)
    const [addUser, { addUserError }] = useMutation(ADD_USERS)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        if (event.nativeEvent.submitter.value === 'login') {
            try {
                console.log('test')
                const mutationResponse = await login({
                    variables: { email: formState.email, password: formState.password }
                });
                const token = mutationResponse.data.login.token;
                Auth.login(token);
                setFormState({ email: '', password: '', username: '' })
            } catch (e) {
                console.log('error')
                console.log(e);
            }
        }else if(event.nativeEvent.submitter.value === 'createUser'){
            const mutationResponse = await addUser({
                variables: {
                    email: formState.email,
                    password: formState.password,
                    username: formState.username
                  }
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token)
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
            <div className={modalState}>
                <div className="modal">
                    <button className="exitButton" value="exit" onClick={() => setModalState("hide")}>x</button>
                    <form>
                        <label>
                            <input id='emailModal' type="text" name="email" placeholder="email" onChange={handleChange} value={formState.email} />
                            <input id='passwordModal' type="password" name="password" placeholder="password" onChange={handleChange} value={formState.password} />
                            <input id='usernname' type="text" name="username" placeholder="username" onChange={handleChange} value={formState.username} />
                            <button type="submit" value="createUser">Create User</button>
                        </label>
                    </form>
                </div>
            </div>
            <div className="login-container">
                <form onSubmit={handleFormSubmit}>
                    <label>
                        <input id='email' type="email" name="email" placeholder="email" onChange={handleChange} value={formState.email} />
                        <input id='password' type="password" name="password" placeholder="password" onChange={handleChange} value={formState.password} />
                    </label>
                    <button type="submit" value="login">Login</button>

                </form>
                <button value="signin" onClick={() => setModalState("show")}>Sign Up</button>
            </div>
        </>
    );
}
export default LoginPage;