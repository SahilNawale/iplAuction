import{ useEffect } from 'react'
import { useHistory } from 'react-router';

function Redirector(props) {
    const history = useHistory();
    useEffect(() => {
        history.goBack()
    }, [])
    return (
        <h1>Redirecting</h1>
    );
}

export default Redirector
