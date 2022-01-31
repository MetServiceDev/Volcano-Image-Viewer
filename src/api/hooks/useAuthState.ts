import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import { User } from '../User/headers';

const useAuthState = () => {
    const { authState } = useOktaAuth();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(authState && authState.isAuthenticated){ 
            const { email, aud, name } = authState?.idToken?.claims as any;
            const token = authState?.accessToken?.accessToken || '';
            setUser({ email, aud, name, token } as User);
        };
    }, [authState]);

    return user;
};

export default useAuthState;
