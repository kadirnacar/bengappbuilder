import * as React from 'react';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert } from 'reactstrap';
import * as AuthState from '../../reducers/Auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loaders';
import ALoader from 'react-loader-advanced';

class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errors: [], isLoading: false };
  }
  login() {
    this.setState({ isLoading: true });
    this.props.login(this.state.email, this.state.password).then((result) => {
      this.setState({ isLoading: false });
      if (result == "success") {
        this.props.history.push("/");
      } else {
        this.setState({ errors: result });
      }
    })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <ALoader show={this.state.isLoading} message={<Loader active type={"ball-scale-multiple"} size="lg" color="#02a17c" />}>
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>

                      <h1>Giriş</h1>
                      <p className="text-muted">Lütfen Giriş Yapın</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" onChange={(event) => { this.setState({ email: event.target.value }); }} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" onChange={(event) => { this.setState({ password: event.target.value }); }} />
                      </InputGroup>
                      {this.state.errors && this.state.errors.length > 0 ?
                        <Row>
                          {
                            this.state.errors.map((item, index) => {
                              return <Alert key={index} color="danger" style={{ width: '100%' }}>
                                {JSON.stringify(item.detail)}
                              </Alert>
                            })
                          }
                        </Row> : null}
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login.bind(this)}>Giriş</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" onClick={() => { this.props.history.push("/forgetpassword"); }}>Şifremi Unuttum</Button>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Yeni Üyelik</h2>
                        <p>Üye Değilim, Otelimi Ekle</p>
                        <Button color="primary" className="mt-3" onClick={() => { this.props.history.push("/register"); }} active>Kayıt Ol!</Button>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </ALoader>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default withRouter(connect<any, any, any, any>(
  (state) => state.session,
  AuthState.actionCreators
)(Login));

