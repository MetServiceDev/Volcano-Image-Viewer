import fetchUserData from '../../modules/FetchUserData';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { handleUserDashboards } from '../../redux/actions';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        cursor: 'pointer',
        position:'absolute',
        right: '0%',
        transition: '0.5s',
    },
    newBut:{
        marginTop:'10px',
        border: '1px dashed #ffbb00',
        backgroundColor: 'rgba(255, 187, 0, 0.25)',
        borderRadius:'5px',
        '&:hover': {
            backgroundColor: 'rgba(255, 187, 0, 0.5)'
        } 
    }
}

const Dashboard = ({classes}) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user);
    const token = useSelector(state => state.accessToken);
    const setUserDashboards = array => dispatch(handleUserDashboards(array));
    const userDashboards = useSelector(state => state.userDashboards);

    useEffect(() => {
        async function fetchData(){
            const userData = await fetchUserData(user.id, token);
            setUserDashboards(userData);
        };
        if(!userDashboards?.length){
            fetchData();
        }
        
    },[user.id, token]);

    return (
        <div className={classes.root}>
            <Button className={classes.newBut}>New +</Button>
        </div>
    )
};

export default withStyles(styles)(Dashboard);