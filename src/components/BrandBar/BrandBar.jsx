import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const BrandBar = observer(() => {

    const {device} = useContext(Context)

    return (
        <div className='d-flex flex-row column-gap-2'>
            {
                device.brands.map(brand =>
                    <div
                        className={`card p-3 ${brand.id === device.selectedBrand.id ? 'border-danger' : 'border-light'}`}
                        key={brand.id}
                        onClick={() => device.setSelectedBrand(brand)}
                        style={{cursor: "pointer"}}
                    >
                        {brand.name}
                    </div>
                )
            }
        </div>
    );
});

export default BrandBar;