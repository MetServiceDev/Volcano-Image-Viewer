import { useEffect, useState } from "react";
import { useOktaAuth } from '@okta/okta-react';

import authClient from '../auth/Auth';

const useLoginCheck = () => {
    const { authState } = useOktaAuth();
    const [activeSession, setSession] = useState<any>();

    useEffect(() => {
        async function checkLogin(): Promise<void> {
            const activeSession = await authClient.session.exists();
            setSession(activeSession);
        };
        checkLogin()
    }, [authState]);

    return { activeSession };
};

export default useLoginCheck;
