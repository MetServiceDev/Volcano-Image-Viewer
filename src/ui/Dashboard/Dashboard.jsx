import fetchUserData from '../../modules/FetchUserData';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = ({classes}) => {
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.accessToken);

    useEffect(() => {
        fetchUserData(user.id, token).then(res => console.log(res))
    })

    return <h1>Dashboard</h1>
};

export default Dashboard;