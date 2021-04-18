import React , {useEffect, useState} from "react";
import BasicInfo from './info/BasicInfo';
import AddressInfo from './info/AddressInfo';
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

function Rider(props){
  const[rider, setRider] = useState('');
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
      API(`riders/${params.id}`, "GET").then((data)=> setRider(data));
  },[])

	return(
    <>
      <div className="add-driver mt-3">
        <Container fluid>
          <AlertBox showAlert={alert.message?true:false} message={alert.message} type={alert.type}/>
          <Row>
  	        <BasicInfo id={params.id} rider={rider} toggleAlert={toggleAlert} />
            <AddressInfo id={params.id} rider={rider} toggleAlert={toggleAlert} />
          </Row>
        </Container>
      </div>
    </>
	);
}


export default Rider;
