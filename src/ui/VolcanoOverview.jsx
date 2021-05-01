import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';


const VolcanoOverview = () => {
    const { volcano } = useParams()

    return(
        <div>
            <Typography>{volcano}</Typography>
        </div>
    )
}

export default VolcanoOverview;
