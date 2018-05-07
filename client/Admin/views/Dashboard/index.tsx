import * as React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { mapToCssModules } from 'reactstrap/lib/utils';
import * as classNames from 'classnames';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Widget from '../../../Shared/components/Widget';

import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardSubtitle,
  CardText,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from 'reactstrap';
const socialBoxData = [
  {
    data: [
      65,
      59,
      84,
      84,
      51,
      55,
      40
    ],
    label: 'Kadir Otel'
  }
];
const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};
const socialChartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};
class Dashboard extends React.Component<any, any> {

  componentDidMount() {
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12}>
            &nbsp;
          </Col>
        </Row>
        
        <Row>
          <Col xs={12}>
            &nbsp;
          </Col>
        </Row>
        <Row>
          {this.props.UserHotels
            ? this.props.UserHotels.map((hotel, index) => {
              return <Col xs="12" sm="6" lg="3" key={index}>
                <Widget
                  header={hotel.NAME}
                  mainText=""
                  icon="fa fa-cogs"
                  img={hotel.LOGOURL}
                  color="primary"
                  variant="1" />
              </Col>
            })
            : null
          }
        </Row>
      </div>
    )
  }
}

export default withRouter(Dashboard);

