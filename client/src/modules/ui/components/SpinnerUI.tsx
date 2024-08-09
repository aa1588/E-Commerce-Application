import React from 'react';
import spinnerImg from '../../../assets/img/spinner.gif';

const SpinnerUI = () => {
    return (
        <>
            <div className="spinner-ui">
                <img src={spinnerImg} alt="" className="m-auto text-center d-block"/>
            </div>
        </>
    );
};
export default SpinnerUI;