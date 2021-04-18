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
import '../rider.scss';
import API from '../../../helpers/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as alertMessage from '../../../components/alerts/AlertMessages';
import AlertBox from '../../../components/alerts/AlertBox';


const AddRiderSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10)
    .max(10)
});


  function AddRider(props){
    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(AddRiderSchema)
    });
    const history = useHistory();
    const formRef =useRef();
    const[alert, setAlert]=useState({});
    const[editMode, setEditMode]=useState(false);

    const OnSubmit = async (data)  => {
        {props.id ? await API(`riders/${props.id}`, 'PUT', data) : await API('riders', 'POST', data)}
        // history.push('/rider-list');
        {props.id ? props.toggleAlert(`${data.firstName}'s BasicInfo updated successfully`,alertMessage.SUCCESS)
        :setAlert({type:alertMessage.SUCCESS, message:"Rider Created Successfully"})
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
                        { props.rider && !editMode ?
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
                                        defaultValue={props.rider && props.rider.firstName?props.rider.firstName:null}
                                        disabled={props.rider?!editMode: editMode}                                             
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
                                        defaultValue={props.rider && props.rider.lastName?props.rider.lastName:null}
                                        disabled={props.rider?!editMode: editMode}
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
                                        defaultValue={props.rider && props.rider.email?props.rider.email:null}
                                        disabled={props.rider?!editMode: editMode} 
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
                                        defaultValue={props.rider && props.rider.mobile?props.rider.mobile:null}
                                        disabled={props.rider?!editMode: editMode}
                                        innerRef={register}
                                    />
                                    {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
                                </Col>
                            </FormGroup>
                            { !props.rider ?
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

export default AddRider;