import React from 'react';
import star from '../../assets/svg/star.svg'
import {useNavigate} from "react-router-dom";

const DeviceItem = ({device}) => {

    const navigate = useNavigate()

    return (
        <div className='col-md-3' onClick={() => navigate(`/device/${device.id}`)}>
            <div className='card border-light mt-4' style={{width: 150, cursor: "pointer"}}>
                <img src={process.env.REACT_APP_API_URL + device.img} className="img-thumbnail" style={{width: 150, height: 150}} alt={device.name}/>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <div className='text-black-50' >Samsung...</div>
                    <div className='d-flex flex-row column-gap-1 align-items-center mt-1'>
                        <div>{device.rating}</div>
                        <img src={star} alt='star' style={{width: 15, height: 15}}></img>
                    </div>
                </div>
                <div className='mt-2'>{device.name}</div>
            </div>
        </div>
    );
};

export default DeviceItem;