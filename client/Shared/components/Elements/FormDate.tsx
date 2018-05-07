import * as React from 'react';
import { FormGroup, Col, Label, Input } from 'reactstrap';
// import DatePicker from 'react-datepicker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';
import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import * as  moment from 'moment';
import 'moment/locale/tr';
import FormGroupInput from './FormGroupInput';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';
import * as SelectState from '../../reducers/SelectItems';
moment.locale('tr');
const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

function YearMonthForm({ date, localeUtils, onChange }) {
    const months = moment.months();

    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
        years.push(i);
    }

    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();
    console.log(selectedYear, selectedMonth);

    const mhandleChange = function handleChange(e) {
        onChange(new Date(selectedYear, e.target.value));
    };

    const yhandleChange = function handleChange(e) {
        onChange(new Date(e.target.value, selectedMonth));
    };
    return (
        <div className="DayPicker-Caption">
            <select name="month" onChange={mhandleChange} value={selectedMonth}>
                {months.map((month, i) => {
                    return <option key={i} value={i} >
                        {month}
                    </option>
                })}
            </select>
            <select name="year" onChange={yhandleChange} value={selectedYear}>
                {years.map((year, i) => (
                    <option key={i} value={year} >
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
}
class FormDate extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            month: fromMonth,
        };
    }

    static defaultProps = { labelWidth: 3 };

    handleYearMonthChange(month) {
        console.log(month);
        this.setState({ month });
    }

    render() {
        const { title, children, value, hasLabel, before, after, labelWidth, ...others } = this.props;
        return <FormGroupInput title={title} hasLabel={hasLabel} labelWidth={labelWidth}>
            <DayPickerInput onDayChange={(day) => {
                if (this.props.onChange) {
                    this.props.onChange.call(null, moment(day, ['DD.MM.YYYY', 'YYYY-MM-DD']).format("YYYY-MM-DD"));
                }

            }}
                {...others}
                formatDate={formatDate}
                parseDate={parseDate}
                month={this.state.month}
                style={{ height: 22 }}
                fromMonth={fromMonth}
                toMonth={toMonth}
                placeholder={title}
                value={value ? moment(value, ['DD.MM.YYYY', 'YYYY-MM-DD']).format("DD.MM.YYYY") : ''}
                inputProps={{ className: "form-control" }}
                dayPickerProps={{
                    locale: 'tr',
                    localeUtils: MomentLocaleUtils,
                    disabledDays: {
                        before: before ? moment(before, ['DD.MM.YYYY', 'YYYY-MM-DD']).toDate() : null,
                        after: after ? moment(after, ['DD.MM.YYYY', 'YYYY-MM-DD']).toDate() : null,
                    }
                    // captionElement: ({date, localeUtils }) => (
                    //     <YearMonthForm
                    //         date={date}
                    //         localeUtils={localeUtils}
                    //         onChange={this.handleYearMonthChange.bind(this)}
                    //     />
                    // )
                }}
            />
            {/* <DatePicker
                ref="input"
                {...others}
                style={{height:22}}
                className={"form-control"}
                selected={value ? moment(value, ['DD.MM.YYYY', 'YYYY-MM-DD']) : null}
                isClearable={true}
                disabledKeyboardNavigation={false}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                popperModifiers={{
                    preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                        boundariesElement: "scrollParent",
                    },
                    flip: {
                        enabled: true
                    }
                }}
            /> */}
        </FormGroupInput>;
    }
}



export default FormDate;