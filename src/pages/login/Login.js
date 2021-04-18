import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Input
} from "reactstrap";
import { useForm } from "react-hook-form";

import "./login.scss";
import _ from "lodash/fp";
import { connect } from "react-redux";

import { login } from '../../store/actions';

function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  if (props.isAuthenticated) {
    history.push("/dashboard")
  }

  const OnSubmit = data => {
    props.login(data.email, data.password, history)
  };

  return (
    <>
      <div className="login-form-wrapper">
        <Container className="pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <h1>Login Form</h1>
                  </div>
                  <form onSubmit={handleSubmit(OnSubmit)}>
                    <div className="input-wrapper text-muted">
                      <i className="ni ni-email-83" />
                      <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        innerRef={register({
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                      />
                      {_.get("email.type", errors) === "required" && (
                        <p className="error-message">This field is required</p>
                      )}
                      {_.get("email.type", errors) === "pattern" && (
                        <p className="error-message">Email must contain @</p>
                      )}
                    </div>
                    <div className="input-wrapper text-muted">
                      <i className="ni ni-lock-circle-open" />
                      <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        innerRef={register({
                          required: true,
                          pattern: /^[a-zA-Z0-9]{5,15}$/
                        })}
                      />
                      {_.get("password.type", errors) === "required" && (
                        <p className="error-message">This field is required</p>
                      )}
                      {_.get("password.type", errors) === "pattern" && (
                        <p className="error-message">Password must be 8-15 characters and number digit and special character</p>
                      )}
                    </div>
                    <div className="text-center">
                      <Button type="submit" className="btn-info mt-3">Login</Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

// pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    isAuthenticated: state.login.isAuthenticated
  };
};

export default connect(mapStateToProps, { login })(Login);
