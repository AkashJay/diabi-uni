import React from "react";
import './registration.css'
import ImageUpload from "../image-upload/image-upload";
import Calendar from "../form-fields/date-picker/date-picker";
import {IPatient} from "../../models/models";
import {isEmpty,isNull} from 'lodash';
import classNames from 'classnames';
import {NIC_REGEX} from "../../constants/constants";

interface IRegistrationStates {
    name: string;
    dob: Date;
    number: string;
    address: string;
    nic: string
    diagnosedYear: number
    image: string,
    patients:any[]
}

interface IRegistrationProps{
    onRegister:(register:IPatient) => void;
}

export default class Registration extends React.Component<IRegistrationProps, IRegistrationStates> {
    constructor(props: IRegistrationProps) {
        super(props);
        this.state = {
            address: '',
            diagnosedYear: 0,
            dob: new Date(),
            name: '',
            nic: '',
            number: '',
            image: '',
            patients:[]
        }
    }


    private onRegister = () => {
        const registerBody = {
            name: this.state.name,
            address: this.state.address,
            dob: this.state.dob,
            nic: this.state.nic,
            number: this.state.number,
            image: this.state.image
        }

        this.props.onRegister(registerBody)
        this.setState({
            name:'',
            address:'',
            number:'',
            nic:''
        })

    }

    private validateForm = () => {
        if(!isEmpty(this.state.name) && !isEmpty(this.state.address) && !isNull(this.state.dob) && !isEmpty(this.state.number) && !isEmpty(this.state.nic) && NIC_REGEX.test(this.state.nic)){
            return true
        }
        return false
    }

    render() {
        return (
            <div className='registration'>
                <div className='col-md-12 text-center' style={{marginBottom: 20}}>
                    {this.state.image === '' ?
                        <ImageUpload
                            handleChange={(image) => {
                                this.setState({image: image.content})
                            }}
                            enableMultiple={false}
                        />
                        :
                        <img src={`data:image/jpeg;base64,${this.state.image}`} alt="" width={100} height={100}/>
                    }
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <i className="fa fa-user icon"></i>
                        <input className="input-field input" type="text" placeholder="Name" name="usrnm" onChange={(e) => {
                            this.setState({name: e.target.value})
                        }}/>
                    </div>
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <i className="fa fa-calendar icon"></i>
                        <Calendar onDateChange={(date => {this.setState({dob:date})})} placeholderText="Date of Birth" format="dd/MM/yyyy"/>
                    </div>
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <i className="fa fa-phone icon"></i>
                        <input className="input-field input" type="text" placeholder="Contact Number" name="usrnm" onChange={(e) => {
                            this.setState({number: e.target.value})
                        }}/>
                    </div>
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <i className="fa fa-address-card"></i>
                        <input className="input-field input" type="text" placeholder="Address" name="usrnm" onChange={(e) => {
                            this.setState({address: e.target.value})
                        }}/>
                    </div>
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <i className="fa fa-address-book"></i>
                        <input className="input-field input" type="text" placeholder="NIC" name="usrnm" onChange={(e) => {
                            this.setState({nic: e.target.value})
                        }}/>
                    </div>
                </div>
                {/*<div className='col-md-12 text-center'>*/}
                {/*    <div className='input-box'>*/}
                {/*        <i className="fa fa-calendar icon"></i>*/}
                {/*        <select className="select-field input" placeholder='Diagnosed Year'>*/}
                {/*            {MONTHS.map(month => {*/}
                {/*                return (*/}
                {/*                    <option  value={month.index.toString()}>{month.name}</option>*/}
                {/*                )*/}
                {/*            })}*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className='col-md-6 offset-md-3 text center'>
                    <button className={classNames({'submit-button' : this.validateForm(), 'disable-button' : !this.validateForm()})} onClick={this.onRegister} disabled={!this.validateForm()}>
                        <i className="fa fa-user-plus"></i>
                        <span style={{marginLeft: 2}}>
                            Register
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}
