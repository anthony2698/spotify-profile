import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { token as accessToken } from './spotify';

import { AppContainer } from './styles/AppStyles.js';

import Profile from './components/Profile.js';
import LoginScreen from './components/LoginScreen.js';

function App() {
    const [token, setToken] = useState({ token: '' });

    useEffect(() => {
        setToken({ token: accessToken })
    }, [])
    
    return (
        <Router>
            <AppContainer>
                {token.token ? <Profile /> : <LoginScreen />}
            </AppContainer>
        </Router>
    );
}

export default App;
