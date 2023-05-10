import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {createBrand} from "../../http/DeviceAPI";

const CreateBrand = ({show, setShow, onHide}) => {

    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('')
            onHide()
        })
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
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        placeholder='Введите название бренда'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-danger' onClick={() => onHide(false)}>Закрыть</Button>
                <Button className='btn btn-primary' onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;