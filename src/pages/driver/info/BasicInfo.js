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
import React, { useEffect, useState, useRef} from 'react';
import _ from "lodash/fp";
import '../driver.scss';
import API from '../../../helpers/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as alertMessage from '../../../components/alerts/AlertMessages';
import AlertBox from '../../../components/alerts/AlertBox';


const AddDriverSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10)
    .max(10)
});


  function AddDriver(props){
    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(AddDriverSchema)
    });
    const history = useHistory();
    const formRef = useRef();
    const[editMode, setEditMode]=useState(false);
    const[alert, setAlert]=useState({});

    const OnSubmit = async (data)  => {
        {props.id ? await API(`drivers/${props.id}`, 'PUT', data) : await API('drivers', 'POST', data)}
        // history.push('/driver-list');
        {props.id ? props.toggleAlert(`${data.firstName}'s BasicInfo updated successfully`,alertMessage.SUCCESS)
            :setAlert({type:alertMessage.SUCCESS, message:"Driver Created Successfully"})
            setTimeout(function() {
                setAlert({})
            }, 5000)
        }
        formRef.current.reset();
    }
    const editHandler = () =>{
        setEditMode (!editMode);
    }

    return(
        <>
            {!props.id && <Col lg="12"><AlertBox showAlert={alert.message?true:false} message={alert.message} type={alert.type}/></Col>}
            <Col lg="6">
                <Card>
                    <CardHeader>
                        <h3 className="mb-0">Basic Info</h3>
                        { props.driver && !editMode ?
                                <div className="">
                                  <Button
                                    onClick={editHandler}
                                    className="btn btn-warning"
                                  >
                                    Edit BasicInfo
                                </Button>
                            </div>
                            :null
                        }
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(OnSubmit)} ref={formRef}>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="firstName"
                                    >
                                    First Name
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="firstName"
                                        className={errors.firstName?"is-invalid":""}
                                        placeholder="First Name"
                                        type="text" 
                                        defaultValue={props.driver && props.driver.firstName?props.driver.firstName:null}
                                        disabled={props.driver?!editMode: editMode}                                             
                                        innerRef={register}
                                    />
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="lastName"
                                    >
                                    Last Name
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="lastName"
                                        className={errors.lastName?"is-invalid":""}
                                        placeholder="Last Name"
                                        type="text"
                                        defaultValue={props.driver && props.driver.lastName?props.driver.lastName:null}
                                        disabled={props.driver?!editMode: editMode}
                                        innerRef={register}
                                    />
                                   {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="email"
                                    >
                                    Email
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="email"
                                        className={errors.email?"is-invalid":""}
                                        placeholder="Email"
                                        type="email"
                                        defaultValue={props.driver && props.driver.email?props.driver.email:null}
                                        disabled={props.driver?!editMode: editMode} 
                                        innerRef={register}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="mobile"
                                    >
                                    Mobile
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="mobile"
                                        className={errors.mobile?"is-invalid":""}
                                        placeholder="Phone No"
                                        type="number"
                                        defaultValue={props.driver && props.driver.mobile?props.driver.mobile:null}
                                        disabled={props.driver?!editMode: editMode}
                                        innerRef={register}
                                    />
                                    {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
                                </Col>
                            </FormGroup>
                            { !props.driver ?
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

export default AddDriver;