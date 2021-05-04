import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { StyledInput } from '../styles/GlobalStyles';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [{ email, password }, setInput] = useForm({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            history.push('/');
        } catch (e) {
            setError('Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <StyledInput
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        placeholder="e-mail"
                        onChange={setInput}
                    />
                </div>
                <div>
                    <StyledInput
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={setInput}
                    />
                </div>
                {error && <div>{error}</div>}
                <button type="submit" disabled={loading}>
                    Log In
                </button>
            </form>
        </>
    );
};

export default Login;