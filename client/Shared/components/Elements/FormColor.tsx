import * as React from 'react';
import { FormGroup, Col, Label, Input, InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';
import * as ColorPicker from 'rc-color-picker';
import FormGroupInput from './FormGroupInput';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';
import * as SelectState from '../../reducers/SelectItems';

class FormColor extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false
        };
    }
    static defaultProps = { labelWidth: 3 };

    render() {
        const { title, children, value, hasLabel, labelWidth, ...others } = this.props;

        return <FormGroupInput title={title} hasLabel={hasLabel} labelWidth={labelWidth}>
            <InputGroup size="sm">
                <Input value={value} style={{ padding: "3px 5px" }}></Input>
                <InputGroupAddon addonType="append" >
                    <InputGroupText style={{ padding: "1px 5px" }}>
                        <ColorPicker
                            color={value}
                            placement="topLeft"
                            onChange={others.onChange ? others.onChange.bind(this) : null}>
                            <span className="rc-color-picker-trigger" />
                        </ColorPicker>
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup >
        </FormGroupInput>;
    }
}

export default FormColor;