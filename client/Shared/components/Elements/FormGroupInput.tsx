import * as React from 'react';
import { FormGroup, Col, Label, Input } from 'reactstrap';

class FormGroupInput extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    static defaultProps = { labelWidth: 3 };

    render() {
        const { title, children, hasLabel, labelWidth, ...others } = this.props;
        return <FormGroup row>
            {hasLabel != false ? <Col xs="12" md={labelWidth}>
                <Label>{title}</Label>
            </Col> : null
            }
            <Col xs="12" md={hasLabel != false ? 12 - labelWidth : 12}>
                {children}
            </Col>
        </FormGroup>;
    }
}

export default FormGroupInput;