import * as React from 'react';
import { FormGroup, Col, Label, Input } from 'reactstrap';
import VirtualizedSelect from 'react-virtualized-select';
import FormGroupInput from './FormGroupInput';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';
import * as SelectState from '../../reducers/SelectItems';

class FormSelect2 extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    static defaultProps = { labelWidth: 3 };

    componentDidMount() {
        this.loadOptions();
    }

    loadOptions() {
        if (this.props.action && typeof this.props[this.props.action] == 'function')
            this.props[this.props.action](this.props.cachable == false);
    }

    render() {
        const { title, children, labelKey, valueKey, action, cachable, hasLabel, properties, propertyId, labelWidth, ...others } = this.props;
        // const data = this.props.properties ? (this.props.propertyId ? this.props[this.props.properties][this.props.propertyId] || [] : this.props[this.props.properties] || []) : [];
        let data = [];
        if (properties && this.props[properties]) {
            if (propertyId) {
                data = this.props[properties][propertyId] || [];
            } else if (Array.isArray(this.props[properties])) {
                data = this.props[properties] || [];
            }
        }
        let options = data.map((item) => { return { label: item[labelKey], value: item[valueKey] }; });

        return <FormGroupInput title={title} hasLabel={hasLabel} labelWidth={labelWidth}>
            <div className="dynamic">
                <VirtualizedSelect ref={"vvv"} searchable  {...others}
                    optionHeight={24}
                    onOpen={() => {
                        if (cachable == false || options.length == 0) {
                            this.props[action](cachable == false);
                        }
                    }}
                    placeholder={title} options={options} />
            </div>

        </FormGroupInput>;
    }
}

// export default FormSelect2;
interface FormSelect2Props extends ApplicationState {

}

export default connect<any, any, any, FormSelect2Props>(
    (state: ApplicationState) => state.select,
    SelectState.actionCreators
)(FormSelect2);