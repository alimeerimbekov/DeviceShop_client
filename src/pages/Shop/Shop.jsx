import React, {useContext, useEffect} from 'react';
import TypeBar from "../../components/TypeBar/TypeBar";
import BrandBar from "../../components/BrandBar/BrandBar";
import DeviceList from "../../components/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getBrands, getDevices, getTypes} from "../../http/DeviceAPI";
import Pages from "../../components/Pages/Pages";

const Shop = observer(() => {

    const {device} = useContext(Context)

    useEffect(() => {
        getTypes().then(data => device.setTypes(data))
        getBrands().then(data => device.setBrands(data))
        getDevices(null, null, 1, 2).then(data => {

        })
    },[])

    useEffect(() => {
        getDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2)
            .then(data => {
                device.setDevices(data.rows)
                device.totalCount(data.count)
            })
    },[device.page, device.selectedType, device.selectedBrand])

    return (
        <div className='container'>
            <div className="row mt-2">
                <div className="col-md-3"><TypeBar/></div>
                <div className="col-md-9">
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </div>
            </div>
        </div>
    );
});

export default Shop;