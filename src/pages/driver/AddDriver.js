import {  Container, Row  } from "reactstrap";
import BasicInfo from './info/BasicInfo';

  function AddDriver(props){
    return(
        <>
            <div className="add-driver mt-3">
                <Container fluid>
                    <Row>
                        <BasicInfo/>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default AddDriver;