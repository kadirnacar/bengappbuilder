import * as React from 'react';
import { Row, Col, Card, CardBody, CardHeader, InputGroup, Label, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

class CheckBox extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render() {
        const { data, propertyName, label } = this.props;
        return <InputGroup size="lg" className={(data[propertyName] == true ? "checked" : "")} onClick={() => { data[propertyName] = !data[propertyName]; this.setState({}); }}  >
            <Label className="form-control" style={{ padding: "2px 5px", fontSize: "inherit" }}>{label}</Label>
            <InputGroupAddon addonType="append" >
                <InputGroupText>
                    <Input addon type="checkbox" checked={data[propertyName] || ''} onChange={(event) => { data[propertyName] = event.target.checked; this.setState({}); }} />
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>;
    }
}
export default CheckBox;