import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import './Auth.css';
import Logo from '../../assets/images/logo.png';
import { Authenticator, RemoveErrMessage } from '../../Redux/AuthActionCreator';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../Component/Spinner/spinner';

const MapState = state => ({
    isLoading: state.authLoading,
    message: state.authErrMessage
})

const Auth = () => {
    const [mode, setMode] = useState('Login');
    const dispatch = useDispatch();
    const { isLoading, message } = useSelector(MapState);

    useEffect(() => {
        document.title = "Login || FoodPanda";
    }, [])

    const toggleMode = () => {
        setMode(mode === 'Login' ? 'Sign Up' : 'Login');
        dispatch(RemoveErrMessage())
    }

    if (isLoading) return <Spinner />;
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                name: ''
            }}

            validate={({ email, password }) => {
                const errors = {};
                if (!email) {
                    errors.email = "Required"
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
                    errors.email = "Invalid Email"
                }

                if (!password) {
                    errors.password = "Required"
                } else if (password.length < 8) {
                    errors.password = "Please enter at least 8 Character"
                }
                return errors;
            }}

            onSubmit={({ email, password, name }) => dispatch(Authenticator(email, password, mode, name))}
        >
            {({ handleSubmit, handleChange, values, errors }) => (
                <div className="form-container">
                    <div className="main-form">
                        <a href="/"><img src={Logo} alt="loginLogo" /></a>
                        {message && <p className="login-err-message">{message}</p>}
                        {mode === 'Login'
                            ? (
                                <div className="intro-msg">
                                    <p className="welcome-login-text">Welcome Back</p>
                                    <p className="login-text">Enter your credentials to login</p>
                                </div>
                            )
                            : (
                                <div className="intro-msg">
                                    <p className="welcome-sign-text">Welcome To FoodPanda</p>
                                    <p className="login-text">Enter necessary details to sign up</p>
                                </div>
                            )}
                        <form onSubmit={handleSubmit}>
                            {mode === 'Sign Up' && (
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="You Full Name"
                                    onChange={handleChange}
                                    value={values.name}
                                    required
                                />
                            )}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                value={values.email}
                                required
                            />
                            {errors.email ? <p className="err-message">{errors.email}</p> : ''}
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={values.password}
                                required
                            />
                            {errors.password ? <p className="err-message">{errors.password}</p> : ''}
                            <input type="submit" value={mode} />
                        </form>
                        <button className="toggle-btn" onClick={toggleMode}>
                            {mode === 'Login' ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default Auth;