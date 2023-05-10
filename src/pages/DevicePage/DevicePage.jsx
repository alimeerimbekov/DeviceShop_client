import React, {useEffect, useState} from 'react';
import star from '../../assets/svg/BigStar.png'
import {useParams} from "react-router";
import {getDeviceOne} from "../../http/DeviceAPI";


const DevicePage = () => {

    const [device, setDevice] = useState({info: []})

    const {id} = useParams()

    useEffect(() => {
        getDeviceOne(id).then(data => setDevice(data))
    },[])


    return (
        <div className='container mt-3'>
            <div className="d-flex flex-row flex-wrap">

                <div className="col-md-4">
                    <img src={`${process.env.REACT_APP_API_URL}${device.img}`} alt={device.name} style={{width: 300, height: 300}}/>
                </div>
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center">
                        <h2 className=''>{device.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={
                                {
                                    background: `url(${star}) no-repeat center/cover`,
                                    width: 242,
                                    height: 242,
                                    backgroundSize: 'cover',
                                    fontSize: 64
                                }}
                        > {device.rating}</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className="card d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От. {device.price} руб.</h3>
                        <button type='button' className='btn btn-primary'>Добавить в корзину</button>
                    </div>
                </div>
                <div className="d-flex flex-column mt-3 m-lg-4" style={{width: '100%'}}>
                    <h1>Характеристики</h1>
                    {
                        device.length &&
                        device.info.map((info, idx) =>
                            <div
                                className='d-flex flex-row'
                                key={info.id}
                                style={{ background: idx % 2 === 0 ? 'lightgray' : 'transparent', padding: 6, width:'100%' }}
                            >
                                {info.title}: {info.description}
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default DevicePage;