import React, { useContext } from 'react';
import alertContext from '../context/alert/alertContext';

const Alert = () => {
    const { alert } = useContext(alertContext);

    return (
        <div>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert" style={{height:"40px",marginTop:"2px",padding:"6px 12px"}}>
                {alert.message}
            </div>}
        </div>
    )
}

export default Alert