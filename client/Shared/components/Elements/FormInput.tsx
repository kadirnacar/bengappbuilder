import * as React from 'react';
import { FormGroup, Col, Label, Input } from 'reactstrap';
import FormGroupInput from './FormGroupInput';

class FormInput extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    static defaultProps = { labelWidth: 3 };
    render() {
        const { title, children, hasLabel, labelWidth, ...others } = this.props;
        return <FormGroupInput title={title} hasLabel={hasLabel} labelWidth={labelWidth}>
            <Input {...others} placeholder={title} className="form-control" />
        </FormGroupInput >;
    }
}

export default FormInput;