import './loginPage.css'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { LOGIN, ADD_USERS } from '../../../utils/mutations';
import { useAuthContext } from '../../../utils/AuthContext';

const LoginPage = () => {
    //handles email, password, username
    const [formState, setFormState] = useState({ email: '', password: '', username: '' });
    //handles modal display
    const [modalState, setModalState] = useState("hide")

    const { loggedIn, login, logout } = useAuthContext();

    const [loginRequest, { loginError }] = useMutation(LOGIN)
    const [addUser, { addUserError }] = useMutation(ADD_USERS)

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (event.nativeEvent.submitter.value === 'login') {
            try {
                const mutationResponse = await loginRequest({
                    variables: { email: formState.email, password: formState.password }
                });
                const token = mutationResponse.data.login.token;
                login(token);
                setFormState({ email: '', password: '', username: '' })
            } catch (e) {
                console.log('error')
                console.log(e);
            }
        } else if (event.nativeEvent.submitter.value === 'createUser') {
            try {
                const mutationResponse = await addUser({
                    variables: {
                        email: formState.email,
                        password: formState.password,
                        username: formState.username
                    }
                });
                console.log(mutationResponse)
                const token = mutationResponse.data.addUser.token;
                login(token)
                //react router navigate later when cbf
            } catch (e) {
                console.log(e)
            }
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
            {!loggedIn ? (
                <>
                    <div className={modalState}>
                        <div className="modal">
                            <button className="exitButton" value="exit" onClick={() => setModalState("hide")}>x</button>
                            <form onSubmit={handleFormSubmit}>
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
            ) : (
                <>
                    <button className="logout" onClick={() => logout()}>
                        Log Out
                    </button>
                    <button className="bookNow" onClick={console.log('test')}>
                        Book Now
                    </button>
                    <button className="calendarButton" onClick={console.log('test')}>
                        Calendar
                    </button>
                </>
            )}

        </>
    );
}
export default LoginPage;