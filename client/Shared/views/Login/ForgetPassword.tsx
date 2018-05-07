import * as React from 'react';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, CardFooter, Alert } from 'reactstrap';
import * as AuthState from '../../reducers/Auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormInput from '../../components/Elements/FormInput';
import ReactTelephoneInput from 'react-telephone-input';
import FormGroupInput from '../../components/Elements/FormGroupInput';
import config from '../../config';
import Loader from 'react-loaders';
import ALoader from 'react-loader-advanced';

class ForgetPassword extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      isLoading: false,
      email: ""
    }
  }
  componentDidMount() {

  }
  sendEmail() {
    this.setState({ isLoading: true });
    const { errors } = this.state;
    this.props.sendForgetEmail(this.state.email).then((result) => {
      this.setState({ isLoading: false });
      if (result == "success") {
        errors.push({ detail: "Şifre sıfırmalam maili gönderilmiştir. Lütfen mailinizi kontrol ediniz" })
        this.setState({ errors: errors });
        return;
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
            <Col md="6">
              <ALoader show={this.state.isLoading} message={<Loader active type={"ball-scale-multiple"} size="lg" color="#02a17c" />}>
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Şifremi Unuttum</h1>
                    <p className="text-muted">Lütfen Sistemde Kayıtlı E-Posta Adresinizi Giriniz</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="E-Posta" onChange={(event) => { this.setState({ email: event.target.value }); }} />
                    </InputGroup>
                    {this.state.errors && this.state.errors.length > 0 ?
                      <Row>
                        {
                          this.state.errors.map((item, index) => {
                            return <Alert key={index} color="danger" style={{ width: '100%' }}>
                              {item.detail}
                            </Alert>
                          })
                        }
                      </Row> : null}
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.sendEmail.bind(this)}>Gönder</Button>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter className="p-4">
                  </CardFooter>
                </Card>
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
)(ForgetPassword));
// export default Login;
