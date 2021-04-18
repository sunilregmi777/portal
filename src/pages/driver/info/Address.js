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


const AddDriverAddressSchema = yup.object().shape({
  address: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  state: yup.string()
    .required()
    .matches(/^[0-9]+$/)
    .min(1)
    .max(2)
});

  function AddDriverAddress(props){
    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(AddDriverAddressSchema)
    });
    const[editMode, setEditMode] = useState(false);
    const history = useHistory();

    const editHandler = () =>{
        setEditMode (!editMode);
    }

    const OnSubmit = async (data)  => {
        const newData = {...props.driver, address: data}
        const response = await API(`drivers/${props.id}`, 'PUT', newData);
        props.toggleAlert("Driver's Address updated successfully",alertMessage.SUCCESS);
        setEditMode(false)
    }

    useEffect(()=>{
        console.log(props.driver.address)
        if(props.driver.address==null){
            setEditMode(true)
        }
        else setEditMode(false)
    },[props.driver])

    return(
        <>
            <Col lg="6">
                <Card>
                    <CardHeader>
                        <h3 className="mb-0">Driver Address</h3>
                        { props.driver && !editMode ?
                                <div className="">
                                  <Button
                                    onClick={editHandler}
                                    className="btn btn-warning"
                                  >
                                    Edit Address
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
                                        htmlFor="address"
                                    >
                                    Address
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="address"
                                        className={errors.address?"is-invalid":""}
                                        placeholder="Address"
                                        type="text"
                                        innerRef={register}
                                        defaultValue ={props.driver && props.driver.address!=null?props.driver.address.address:null }
                                        disabled={props.driver?!editMode: editMode}
                                    />
                                    {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                </Col>
                            </FormGroup>
                            
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="city"
                                    >
                                    City
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="city"
                                        className={errors.city?"is-invalid":""}
                                        placeholder="City"
                                        type="text"
                                        innerRef={register}
                                        defaultValue ={props.driver && props.driver.address!=null?props.driver.address.city:null }
                                        disabled={props.driver?!editMode: editMode}
                                    />
                                    {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="state"
                                    >
                                    State
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="state"
                                        className={errors.state?"is-invalid":""}
                                        placeholder="State"
                                        type="number"
                                        innerRef={register}
                                        defaultValue ={props.driver && props.driver.address!=null?props.driver.address.state:null }
                                        disabled={props.driver?!editMode: editMode}
                                    />
                                    {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                                </Col>
                            </FormGroup>
                            <FormGroup className="row">
                                <Col md="3">
                                    <Label
                                        className="form-control-label col-form-label"
                                        htmlFor="country"
                                    >
                                    Country
                                    </Label>
                                </Col>
                                <Col md="9">
                                    <Input
                                        name="country"
                                        className={errors.country?"is-invalid":""}
                                        placeholder="Country"
                                        type="text"
                                        innerRef={register}
                                        defaultValue ={props.driver && props.driver.address!=null?props.driver.address.country:null }
                                        disabled={props.driver?!editMode: editMode}
                                    />
                                    {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                                </Col>
                            </FormGroup>
                            { !props.driver.address ?
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