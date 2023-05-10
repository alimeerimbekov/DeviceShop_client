import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Pages = observer(() => {

    const {device} = useContext(Context)

    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }


    return (
        <div className='pagination  pagination-lg mt-5'>
            {
                pages.map((page) =>
                (
                    <li className={`page-item ${device.page === page ? 'active' : ''}`}
                    key={page}
                    onClick={() => device.setPage(page)}
                >
                    {page}
                </li>
                ))
            }
        </div>
    );
});

export default Pages;