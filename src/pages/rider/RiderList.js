import React, { useState, useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Row, Col,Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody
 } from 'reactstrap';
import { Link } from 'react-router-dom';
import './rider.scss';
import { connect } from "react-redux";
import { fetchDriver, deleteDriver, updateDriver } from '../../store/actions';
import API from "../../helpers/api";
import AlertBox from '../../components/alerts/AlertBox';
import * as alertMessage from '../../components/alerts/AlertMessages';

function RiderList(props) {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [riders, setRiders] = useState([]);
  const [rider, setRider] = useState([]);
  const [alert, setAlert] = useState({});

    useEffect(() => {
      const getAllRiders = async () => {
        const allRiders = await retriveRiders();
        if(allRiders) setRiders(allRiders);
      }
      getAllRiders();
  },[]);

  //retrive all riders
  const retriveRiders = async () => {
    const response = await API('riders','GET');
    return response;
  }
  const handleDelete =  (event, rider ) => {
      setRider(rider);
      setModalShow(true);
  }
  const handleClose = () => {
    setRider(null)
    setModalShow(false);
  }
  const handleDeleteRider = async (event) =>{
    await API(`riders/${rider.id}`,'DELETE');
    setRiders(riders.filter((rid)=>rid.id!=rider.id));

    setAlert({
      type: alertMessage.WARNING,
      message: 'Rider Deleted Successfully'
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
  if (riders){
       newList = riders.map(rider => {
        return Object.assign(rider, {
            action: 
            <>
              <Link to={{pathname:`rider/${rider.id}`}}><button className="btn btn-info mr-2">View</button></Link>
              <button className="btn btn-danger"  onClick={(event) => handleDelete(event, rider)}>Delete</button>
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
      <div className="rider-list driver-list mt-3">
        <Container fluid>
          <AlertBox showAlert={alert.message?true:false} message={alert.message} type={alert.type} closeAlert={closeAlert}/>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Riders list</h3>
                </CardHeader>
                <CardBody>
                  <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={20} pagesAmount={4} data={newData} searchTop searchBottom={false} />
                  <Modal isOpen={modalShow} toggle={toggle} className="d">
                    <ModalHeader toggle={toggle}>Delete Driver</ModalHeader>
                    <ModalBody>
                      Are you sure to delete driver?
                    </ModalBody>
                    <ModalFooter>
                      <Button className="btn-danger" onClick={(event) => handleDeleteRider(event)}>Delete</Button>{' '}
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
export default RiderList;