import { useState, useEffect } from 'react';


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
        <AppContainer>
            {token.token ? <Profile /> : <LoginScreen />}
        </AppContainer>
    );
}

export default App;
