import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
    FormGroup,
    Input,
    Label
  } from "reactstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState} from 'react';
import _ from "lodash/fp";
import '../driver.scss';
import { connect } from "react-redux";
import API from '../../../helpers/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as alertMessage from '../../../components/alerts/AlertMessages';


const AddDriverVehicleSchema = yup.object().shape({
  numberPlate: yup.string().required(),
  make: yup.string().required(),
  modal: yup.string().required(),
  year:yup.date().required(),
  color:yup.string().required()
});

  function AddDriverAddress(props){
    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(AddDriverVehicleSchema)
    });
    const[editMode, setEditMode] = useState(false);
    const history = useHistory();

    const editHandler = () =>{
        setEditMode (!editMode);
    }

    const OnSubmit = async (data)  => {
        const newData = {...props.driver, vehicleInfo: data}
        const response = await API(`drivers/${props.id}`, 'PUT', newData);
        props.toggleAlert("Driver's Vehicle info updated successfully",alertMessage.SUCCESS);
        setEditMode(false)
    }

    useEffect(()=>{
        if(props.driver.vehicleInfo==null){
            setEditMode(true)
        }
        else setEditMode(false)
    },[props.driver])

    return(
        <>
            <Col lg="6">
                <Card>
                    <CardHeader>
                        <h3 className="mb-0">Drivers Vehicle Info</h3>
                        { props.driver && !editMode ?
                                <div className="">
                                  <Button
                                    onClick={editHandler}
                                    className="btn btn-warning"
                                  >
                                    Edit VehicleInfo
                                </Button>
                            </div>
                            :null
                        }
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(OnSubmit)}>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="numberPlate"
                                    >
                                    Number Plate
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="numberPlate"
                                        className={errors.numberPlate?"is-invalid":""}
                                        placeholder="Number Plate"
                                        type="text"
                                        innerRef={register}
                                        defaultValue={props.driver && props.driver.vehicleInfo!=null?props.driver.vehicleInfo.numberPlate:null}
                                        disabled={props.driver?!editMode:editMode}
                                    />
                                    {errors.numberPlate && <div className="invalid-feedback">{errors.numberPlate.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="make"
                                    >
                                    Make
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="make"
                                        className={errors.make?"is-invalid":""}
                                        placeholder="Make"
                                        type="text"
                                        innerRef={register}
                                        defaultValue={props.driver && props.driver.vehicleInfo!=null?props.driver.vehicleInfo.make:null}
                                        disabled={props.driver?!editMode:editMode}
                                    />
                                    {errors.make && <div className="invalid-feedback">{errors.make.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="modal"
                                    >
                                    Modal
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="modal"
                                        className={errors.modal?"is-invalid":""}
                                        placeholder="Modal"
                                        type="text"
                                        innerRef={register}
                                        defaultValue={props.driver && props.driver.vehicleInfo!=null?props.driver.vehicleInfo.modal:null}
                                        disabled={props.driver?!editMode:editMode}
                                    />
                                    {errors.modal && <div className="invalid-feedback">{errors.modal.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="year"
                                    >
                                    Year
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="year"
                                        className={errors.year?"is-invalid":""}
                                        placeholder="Year"
                                        type="text"
                                        innerRef={register}
                                        defaultValue={props.driver && props.driver.vehicleInfo!=null?props.driver.vehicleInfo.year:null}
                                        disabled={props.driver?!editMode:editMode}
                                    />
                                    {errors.year && <div className="invalid-feedback">{errors.year.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="color"
                                    >
                                    Color
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="color"
                                        className={errors.color?"is-invalid":""}
                                        placeholder="Color"
                                        type="text"
                                        innerRef={register}
                                        defaultValue={props.driver && props.driver.vehicleInfo!=null?props.driver.vehicleInfo.color:null}
                                        disabled={props.driver?!editMode:editMode}
                                    />
                                    {errors.color && <div className="invalid-feedback">{errors.color.message}</div>}
                                </Col>
                            </FormGroup>
                            { !props.driver.vehicleInfo?
                                <Row className="float-right">
                                    <Col>
                                        <Button type="submit" className="btn-info">Submit</Button>
                                    </Col>
                                </Row>:
                                editMode?
                                <Row className="float-right">
                                    <Col>
                                        <Button type="submit" className="btn-info">Update</Button>
                                    </Col>
                                </Row>:null
                            }
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
}

export default AddDriverAddress;