import React, {useState} from 'react';
import CreateType from "../../components/Modals/CreateType";
import CreateBrand from "../../components/Modals/CreateBrand";
import CreateDevice from "../../components/Modals/CreateDevice";

const Admin = () => {

    const [typeVisible, setTypeVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)


    return (
        <div className='container d-flex flex-column mt-5 row-gap-4'>
            <button
                className="btn btn-outline-primary p-3"
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </button>
            <button
                className="btn btn-outline-primary p-3"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </button>
            <button
                className="btn btn-outline-primary p-3"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </button>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>

        </div>
    );
};

export default Admin;