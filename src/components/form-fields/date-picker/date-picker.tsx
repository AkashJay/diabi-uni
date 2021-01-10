import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface ICalendarProps{
    onDateChange:(date:Date) => void
    placeholderText:string;
    format:string
}

interface ICalendarState{
    selectedDate:any
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState>{
    constructor(props: ICalendarProps | Readonly<ICalendarProps>) {
        super(props);
        this.state = {
            selectedDate : null
        }
    }

    private onDateChange = (date:Date) => {
        this.setState({
            selectedDate:date
        })
        this.props.onDateChange(date)
    }
    render() {
        return (
            <DatePicker
                selected={this.state.selectedDate}
                onChange={(date:Date) => {this.onDateChange(date)}}
                placeholderText={this.props.placeholderText}
                dateFormat={this.props.format}
                className={"input-box input"}
            />

        );
    }
}