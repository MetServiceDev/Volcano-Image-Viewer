import React from 'react';
import { useSelector } from 'react-redux';

import apiCall from '../../api/APICall';
import authClient from '../../api/auth/Auth';
import { User } from '../../api/User/headers';
import { AppState } from '../../redux/store';

const UserDashboard: React.FC = () => {

    const [savedImages, setSavedImages] = React.useState<string[]>([]);
    const token = authClient.getAccessToken() as string;
    const login = useSelector((state:AppState) => state.login) as User || {};

    const fetchImages = React.useCallback(
        async(): Promise<void> => {
            const savedImages = await apiCall<string[]>(`user?userId=${login.aud}`, 'GET', token);
            setSavedImages(savedImages);
        },
        [token]
    );

    React.useEffect(() => {
        if(token) {
            fetchImages();
        }
    }, [fetchImages]);

    return (
        <>
        </>
    );
};

export default UserDashboard;
