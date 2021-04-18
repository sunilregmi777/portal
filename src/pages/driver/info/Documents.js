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


const AddDriverDocumentsSchema = yup.object().shape({
  licenceNumber: yup.string().required(),
  expiryDate: yup.date().required(),
});

  function AddDriverDocuments(props){
    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(AddDriverDocumentsSchema)
    });
    const history = useHistory();
    const[editMode, setEditMode]=useState(false);

    const editHandler = () =>{
        setEditMode(!editMode)
    }
    const OnSubmit = async (data)  => {
        const newData = {...props.driver, documents:data}
        const response = await API(`drivers/${props.id}`, 'PUT', newData);
        if(response.id){
            history.push('/driver-list');
        }
    }

    useEffect(()=>{
        console.log(props.driver.documents)
        if(props.driver.documents==null){
            setEditMode(true)
        }
        else setEditMode(false)
    },[props.driver])

    return(
        <>
            <Card>
                <CardHeader>
                    <h3 className="mb-0">Driver Documents</h3>
                    { props.driver && !editMode ?
                            <div className="">
                              <Button
                                onClick={editHandler}
                                className="btn btn-warning"
                              >
                                Edit LicenseInfo
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
                                    htmlFor="licenceNumber"
                                >
                                Drivers Photo
                                </Label>
                            </Col>
                            <Col md="9">
                                <Input
                                    name="licenceNumber"
                                    className={errors.licenceNumber?"is-invalid":""}
                                    placeholder="License Number"
                                    type="text"
                                    innerRef={register}
                                    defaultValue={props.driver && props.driver.documents!=null?props.driver.documents.licenceNumber:null}
                                    disabled={props.driver?!editMode:editMode}
                                />
                                {errors.licenceNumber && <div className="invalid-feedback">{errors.licenceNumber.message}</div>}
                            </Col>
                        </FormGroup>
                        <FormGroup className="row">
                            <Col md="3">
                                <Label
                                    className="form-control-label col-form-label"
                                    htmlFor="expiryDate"
                                >
                                Driver Licence
                                </Label>
                            </Col>
                            <Col md="9">
                                <Input
                                    name="expiryDate"
                                    className={errors.expiryDate?"is-invalid":""}
                                    placeholder="Expiry Date"
                                    type="text"
                                    innerRef={register}
                                    defaultValue={props.driver && props.driver.documents!=null?props.driver.documents.expiryDate:null}
                                    disabled={props.driver?!editMode:editMode}
                                />
                                {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate.message}</div>}
                            </Col>
                        </FormGroup>
                        { !props.driver.documents ?
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
        </>
    );
}

export default AddDriverDocuments;