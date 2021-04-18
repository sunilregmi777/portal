import {  Container, Row  } from "reactstrap";
import BasicInfo from './info/BasicInfo';

  function AddRider(props){
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

export default AddRider;