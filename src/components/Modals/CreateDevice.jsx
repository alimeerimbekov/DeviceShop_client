import React, {useContext, useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Col, Dropdown, Form, FormControl, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import {Context} from "../../index";
import DropdownItem from "react-bootstrap/DropdownItem";
import {createDevice, getBrands, getTypes} from "../../http/DeviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {

    const {device} = useContext(Context)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        getTypes().then(data => device.setTypes(data))
        getBrands().then(data => device.setBrands(data))
    },[])

    const addInfo = () => {
        setInfo([...info,
            {
                title: '',
                description: '',
                number: Date.now()
            }
        ])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const selectFile = (e) => {
        setFile(e.target.files[0])
    }
    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))

        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={() => onHide(false)}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2 md-2'>
                        <DropdownToggle>{device.selectedType.name || 'Выберите тип'}</DropdownToggle>
                        <DropdownMenu>
                            {
                                device.types.map(type =>
                                    <DropdownItem
                                        onClick={() => device.setSelectedType(type)}
                                        key={type.id}>{type.name}</DropdownItem>
                                )
                            }
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className='mt-2 md-2'>
                        <DropdownToggle>{device.selectedBrand.name || 'Выберите бренд'}</DropdownToggle>
                        <DropdownMenu>
                            {
                                device.brands.map(brand =>
                                    <DropdownItem
                                        onClick={() => device.setSelectedBrand(brand)}
                                        key={brand.id}>{brand.name}</DropdownItem>
                                )
                            }
                        </DropdownMenu>
                    </Dropdown>

                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-3'
                        placeholder='Введите название устройства'
                    />
                    <FormControl
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Введите стоимость устройства'
                        type='number'
                    />
                    <FormControl
                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    />
                    <div className='line mt-3'></div>
                    <Button
                        variant={'outline-primary'}
                        className='btn mt-3'
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>

                    {
                        info.map(i =>
                            <Row className='mt-3' key={i.number}>
                                <Col md={4}>
                                    <FormControl
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder='Введите название свойства'/>
                                </Col>
                                <Col md={4}>
                                    <FormControl
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder='Введите описание свойства'/>
                                </Col>
                                <Col md={4}>
                                    <Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>Удалить</Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-danger' onClick={() => onHide(false)}>Закрыть</Button>
                <Button className='btn btn-primary' onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;