import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import DeviceItem from "../DeviceItem/DeviceItem";

const DeviceList = observer(() => {

    const {device} = useContext(Context)



    return (
        <div className='d-flex flex-row flex-wrap mt-2'>
            {
                device.devices.map(device =>
                    <DeviceItem key={device.id} device={device}/>
                )
            }
        </div>
    );
});

export default DeviceList;