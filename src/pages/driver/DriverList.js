import React, { useState, useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Row, Col,Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody
 } from 'reactstrap';
import { Link } from 'react-router-dom';
import './driver.scss';
import { connect } from "react-redux";
import { fetchDriver, deleteDriver, updateDriver } from '../../store/actions';
import AddDriver from './AddDriver';
import API from "../../helpers/api";
import AlertBox from '../../components/alerts/AlertBox';
import * as alertMessage from '../../components/alerts/AlertMessages';
import Loading from "../../components/Loading";

function DriverList(props) {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState([]);
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true)

    useEffect(() => {
      const getAllDrivers = async () => {
        const allDrivers = await retriveDrivers();
        if(allDrivers) setDrivers(allDrivers);
      }
      getAllDrivers();
  },[]);

  //retrive all Drivers
  const retriveDrivers = async () => {
    const response = await API('drivers','GET');
    setLoading(false)
    return response;
  }
  const handleDelete =  (event, driver ) => {
      setDriver(driver);
      setModalShow(true);
  }
  const handleClose = () => {
    setDriver(null)
    setModalShow(false);
  }
  const handleDeleteDriver = async (event) =>{
    await API(`drivers/${driver.id}`,'DELETE');
    setDrivers(drivers.filter((dri)=>dri.id!=driver.id));

    setAlert({
      type: alertMessage.WARNING,
      message: 'Driver Deleted Successfully'
    })
        setModalShow(false);

    setTimeout(function() {
        setAlert({})
    }, 5000)
  }

  const closeAlert = ()=>{
    setAlert({});
  }

  const toggle = () => setModalShow(!modalShow);
  let newList = [];
  if (drivers){
       newList = drivers.map(driver => {
        return Object.assign(driver, {
            action: 
            <>
              <Link to={{pathname:`driver/${driver.id}`}}><button className="btn btn-info mr-2">View</button></Link>
              <button className="btn btn-danger"  onClick={(event) => handleDelete(event, driver)}>Delete</button>
            </>
        });
    });
  }

  const newData={
    columns: [
      {
        label: 'First Name',
        field: 'firstName',
        width: 100,
      },
      {
        label: 'Last Name',
        field: 'lastName',
        width: 100,
      },
      {
        label: 'Email',
        field: 'email',
        width: 100,
      },
      {
        label: 'Mobile No.',
        field: 'mobile',
        width: 100,
      },
      {
        label: 'Action',
        field: 'action',
        width: 200,
      },
    ],
    rows: newList
  };

    return(
    <>
      <div className="driver-list mt-3">
        <Container fluid>
          <AlertBox showAlert={alert.message?true:false} message={alert.message} type={alert.type} closeAlert={closeAlert}/>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Drivers list</h3>
                </CardHeader>
                <CardBody>
                  {loading&& <Loading />}
                  <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={20} pagesAmount={4} data={newData} searchTop searchBottom={false} />
                  <Modal isOpen={modalShow} toggle={toggle} className="d">
                    <ModalHeader toggle={toggle}>Delete Driver</ModalHeader>
                    <ModalBody>
                      Are you sure to delete driver?
                    </ModalBody>
                    <ModalFooter>
                      <Button className="btn-danger" onClick={(event) => handleDeleteDriver(event)}>Delete</Button>{' '}
                      <Button className="btn-info" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
export default DriverList;