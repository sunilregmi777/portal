import React , {useEffect, useState} from "react";
import AddDriver from './AddDriver';
import Address from './info/Address';
import BasicInfo from './info/BasicInfo';
import VehicleInfo from './info/VehicleInfo';
import LicenseInfo from './info/LicenseInfo';
import Documents from './info/Documents';
import {useLocation, useParams} from "react-router-dom";
import API from '../../helpers/api';
import AlertBox from '../../components/alerts/AlertBox';

import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
    FormGroup,
    Input
  } from "reactstrap";

function Driver(props){
  const[driver, setDriver] = useState('');
  const params = useParams();
  const [alert, setAlert] = useState({});

  const toggleAlert=(msg, type)=>{
    setAlert({
      type: type,
      message: msg
    })
    setTimeout(function() {
        setAlert({})
    }, 5000)
  }

  useEffect(()=> { 
      API(`drivers/${params.id}`, "GET").then((data)=> setDriver(data));
  },[])

	return(
    <>
      <div className="add-driver mt-3">
        <Container fluid>
          <AlertBox showAlert={alert.message?true:false} message={alert.message} type={alert.type}/>
          <Row>
  	        <BasicInfo id={params.id} driver={driver} toggleAlert={toggleAlert} />
            <Address id={params.id} driver={driver} toggleAlert={toggleAlert} />
          </Row>
          <Row>
            <VehicleInfo id={params.id} driver={driver} toggleAlert={toggleAlert} />
            <Col lg="6">
              <LicenseInfo id={params.id} driver={driver} toggleAlert={toggleAlert} />
              <Documents id={params.id} driver={driver} toggleAlert={toggleAlert} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
	);
}


export default Driver;
