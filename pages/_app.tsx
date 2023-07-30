// pages/_app.tsx

import { AppProps } from 'next/app';
import { createContext, useContext, useEffect, useState } from 'react';
import { getToken } from '../utils/user/token';

const JwtTokenContext = createContext<{jwtToken: string}>(null);

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [jwtToken, setJwtToken] = useState('');

    const setToken = async () => {
        setJwtToken(await getToken());
    };

    useEffect(() => {setToken()});

    return (
        <JwtTokenContext.Provider value={{ jwtToken }}>
            <Component {...pageProps} />
        </JwtTokenContext.Provider>
    );
};

export const useJwtContext = () => {
    return useContext(JwtTokenContext);
};

export default MyApp;