import * as React from 'react';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, CardFooter, Alert } from 'reactstrap';
import * as AuthState from '../../reducers/Auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormInput from '../../components/Elements/FormInput';
import ReactTelephoneInput from 'react-telephone-input';
import FormGroupInput from '../../components/Elements/FormGroupInput';
import * as Recaptcha from 'react-recaptcha';
import config from '../../config';
import Loader from 'react-loaders';
import ALoader from 'react-loader-advanced';

class Register extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      // OtelAdi: '',
      // AltAlanAdi: '',
      Yetkili: '',
      Telefon: '',
      EPosta: '',
      Parola: '',
      setAltAlan: false,
      errors: [],
      reactivation: false,
      captcha: false,
      isLoading: false
    };
  }

  validate() {
    let errors: any[] = [];
    if (this.state.Yetkili == '') {
      errors.push({ detail: "Yetkili adı giriniz." });
    }
    if (this.state.Telefon == '') {
      errors.push({ detail: "Telefon numarası giriniz." });
    }
    if (this.state.EPosta == '' && !this.state.EPosta.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errors.push({ detail: "Geçerli Bir EPosta adresi giriniz." });
    }
    if (this.state.Parola == '' || this.state.Parola.length < 6) {
      errors.push({ detail: "Parola giriniz. En az 6 karakter olmalı" });
    }
    this.setState({ errors: errors });

    return errors.length == 0;
  }
  register() {
    if (this.validate()) {
      if (this.state.captcha) {
        this.setState({ isLoading: true });
        this.props.registerNewUser({
          EMAIL: this.state.EPosta,
          AUTHORIZED: this.state.Yetkili,
          PHONE: this.state.Telefon,
          PASSWORD: this.state.Parola
        }).then((data) => {
          if (data) {
            this.setState({ errors: data, reactivation: data.title == "ReActivation" });
          } else {
            this.setState({
              errors: [{ detail: "Kaydınız başarıyla tamamlanmıştır. Lütfen E-Postanızı kontrol ediniz ve gelen aktivasyon mailini onaylayınız." }],
              Yetkili: '',
              Telefon: '',
              EPosta: '',
              Parola: '',
              captcha: false
            });
          }
          this.recaptchaInstance.reset();
          this.setState({ isLoading: false });
        });
      } else {
        this.setState({ errors: [{ detail: "Captcha doğrulayınız" }] });
      }
    }
  }

  verifyCallback = (response) => {
    this.setState({ captcha: true });
  };

  expiredCallback = () => {
    this.recaptchaInstance.reset();
    this.setState({ captcha: false });
  };
  callback = () => {
  };
  recaptchaInstance: any;

  sendReActivation() {
    this.setState({ isLoading: true });
    this.props.sendReActivation(this.state.EPosta).then((data) => {
      if (data) {
        this.setState({ errors: data });
      } else {
        this.setState({
          errors: [{ detail: "Aktivasyon mailiniz gönderilmiştir" }],
          Yetkili: '',
          Telefon: '',
          EPosta: '',
          Parola: '',
          captcha: false
        });
      }
      this.recaptchaInstance.reset();
      this.setState({ isLoading: false });
    });
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <ALoader show={this.state.isLoading} message={<Loader active type={"ball-scale-multiple"} size="lg" color="#02a17c" />}>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Kayıt Ol</h1>
                    <p className="text-muted">Yeni Otel Ekle</p>
                    {this.state.errors && this.state.errors.length > 0 ?
                      <Row>
                        {
                          this.state.errors.map((item, index) => {
                            return <Alert key={index} color="danger" style={{ width: "100%" }}>
                              {item.detail}
                              {
                                item.title == "ReActivation" ? <Button onClick={this.sendReActivation.bind(this)} >Aktivasyon Maili Gönder</Button> : null
                              }
                            </Alert>
                          })
                        }
                      </Row> : null}
                    <Row>

                      {/* <Col xs={12}>
                      <FormInput title="Otel Adı" type="text"
                        value={this.state.OtelAdi}
                        onChange={(event) => {
                          if (this.state.setAltAlan == false)
                            this.setState({ AltAlanAdi: event.target.value });
                          this.setState({ OtelAdi: event.target.value });
                        }}
                        onBlur={() => {
                          this.props.checkname(this.state.OtelAdi).then((data) => {
                            this.setState({ errors: data });
                          });
                        }} />
                    </Col>
                    <Col xs={12}>
                      <FormInput title="Alt Alan Adı" type="text"
                        value={this.state.AltAlanAdi}
                        onChange={(event) => { this.setState({ AltAlanAdi: event.target.value, setAltAlan: true }); }} 
                        onBlur={() => {
                          this.props.checkdomain(this.state.AltAlanAdi).then((data) => {
                            this.setState({ errors: data });
                          });
                        }}/>
                    </Col> */}
                      <Col xs={12}>
                        <FormInput title="Yetkili" type="text"
                          value={this.state.Yetkili}
                          onChange={(event) => { this.setState({ Yetkili: event.target.value }); }} />
                      </Col>
                      <Col xs={12}>
                        <FormGroupInput title="Telefon">
                          <ReactTelephoneInput defaultCountry='tr'
                            value={this.state.Telefon}
                            onChange={(telNumber, selectedCountry) => { this.setState({ Telefon: telNumber }); }}
                            flagsImagePath='img/flags.png' />
                        </FormGroupInput>
                      </Col>
                      <Col xs={12}>
                        <FormInput title="E-Posta" type="email"
                          value={this.state.EPosta}
                          onChange={(event) => { this.setState({ EPosta: event.target.value }); }} onBlur={() => {
                            this.setState({ isLoading: true });
                            this.props.checkemail(this.state.EPosta).then((data) => {
                              this.setState({ errors: data, isLoading: false });
                            });
                          }} />
                      </Col>
                      <Col xs={12}>
                        <FormInput title="Parola" type="password"
                          value={this.state.Parola}
                          onChange={(event) => { this.setState({ Parola: event.target.value }); }} />
                      </Col>
                      <Col xs={12}>
                        <Recaptcha
                          ref={e => this.recaptchaInstance = e}
                          sitekey={"6LekbM0SAAAAANSwyjEwdGtfAmbffuuHTVrKSFnf"}
                          render="explicit"
                          hl="tr"
                          verifyCallback={this.verifyCallback.bind(this)}
                          onloadCallback={this.callback.bind(this)}
                          expiredCallback={this.expiredCallback.bind(this)}
                        />
                      </Col>

                    </Row>

                    <Button color="success" block onClick={this.register.bind(this)}>Kaydet</Button>
                  </CardBody>
                  <CardFooter className="p-4">

                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </ALoader>
        </Container>
      </div>
    );
  }
}
export default withRouter(connect<any, any, any, any>(
  (state) => state.session, 
  AuthState.actionCreators                 
)(Register));
// export default Login;
