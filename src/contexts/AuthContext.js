import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { auth, getGoogleProvider } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };
    const logout = () => {
        return auth.signOut();
    };
    const loginWithGoogle = () => {
        return auth.signInWithPopup(getGoogleProvider());
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loginWithGoogle,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

AuthProvider.defaultProps = {
    children: undefined,
};
