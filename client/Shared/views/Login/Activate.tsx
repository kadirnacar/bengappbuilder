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

class Activate extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      isLoading: false,
      isSuccess: false
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.Activate(this.props.match.params.guid).then((data) => {
      if (data && data.length > 0) {
        this.setState({ errors: data, isSuccess: false });
      } else {
        this.setState({
          isSuccess: true,
          errors: []
        });
      }
      this.setState({ isLoading: false });
    });
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
                    <h1>Aktivasyon</h1>
                    {
                      this.state.isSuccess ? <p className="text-muted">Aktivasyonunuz başarıyla yapılmıştır. Sisteme giriş yapabilirsiniz.<Button onClick={() => { this.props.history.push("/login"); }}>Giriş</Button></p>
                        : <p className="text-muted">Aktivasyon işleminiz yapılmakta. Lütfen Bekleyiniz.</p>
                    }
                    {this.state.errors && this.state.errors.length > 0 ?
                      <Row>
                        {
                          this.state.errors.map((item, index) => {
                            return <Alert key={index} color="danger" style={{ width: "100%" }}>
                              {item.detail}
                            </Alert>
                          })
                        }

                      </Row> : null}
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
)(Activate));
// export default Login;
