import React from "react";
import '../registration/registration.css'
import {IAnalyze} from "../../models/models";
import classNames from "classnames";
import moment from 'moment'
import {DATE_FORMAT} from "../../constants/constants";

interface IRegistrationStates {
    gender: string;
    age: string;
    right_VA: string;
    left_VA: string;
    howLong: string;
    prediction: string
}

interface IRegistrationProps{
    onAnalyze:(analyzeBody:any[]) => Promise<any>
    onAnalyzeSave:(analyse: IAnalyze) => void;
    selectedNIC:string;
}

export default class Analyze extends React.Component<IRegistrationProps, IRegistrationStates> {

    constructor(props: IRegistrationProps) {
        super(props);
        this.state = {
            gender: '',
            age: '',
            right_VA: '',
            left_VA: '',
            howLong: '',
            prediction: ''
        }
    }

    private onAnalyze = () => {
        const analyzeBody = {
            Gender: this.state.gender,
            Age: this.state.age,
            Right_VA: this.state.right_VA,
            Left_VA: this.state.left_VA,
            HowLong: this.state.howLong,
        }
        this.props.onAnalyze([analyzeBody]).then(results => {
            this.setState({
                prediction: results.prediction
            })
        }).catch(err => {
            console.log("err ", err)
        })

    }

    private onSave = () => {
        const analyzeBody:IAnalyze = {
            rightVA: parseInt(this.state.right_VA),
            leftVA: parseInt(this.state.left_VA),
            howLong: parseInt(this.state.howLong),
            patientNIC:this.props.selectedNIC,
            analyzeDate:moment().format(DATE_FORMAT),
            prediction:this.state.prediction
        }
        this.setState({
            gender: '',
            age: '',
            right_VA: '',
            left_VA: '',
            howLong: '',
            prediction: ''
        })
        this.props.onAnalyzeSave(analyzeBody)
    }

    private validateForm = () => {
        if(this.state.age && this.state.right_VA && this.state.left_VA && this.state.howLong){
            return true
        }
        return false
    }
    render() {
        return (
            <div className='registration'>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <select className="input-field input" style={{width: 290}} placeholder="Gender" name="usrnm"
                                onChange={(e) => {
                                    this.setState({gender: e.target.value})
                                }}>
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                        </select>
                    </div>
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <input className="input-field input" type="text" placeholder="Age" name="usrnm"
                               onChange={(e) => {
                                   this.setState({age: e.target.value})
                               }}
                               value={this.state.age}
                        />
                    </div>
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <input className="input-field input" type="text" placeholder="Right_VA" name="usrnm"
                               onChange={(e) => {
                                   this.setState({right_VA: e.target.value})
                               }}
                               value={this.state.right_VA}
                        />
                    </div>
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <input className="input-field input" type="text" placeholder="Left_VA" name="usrnm"
                               onChange={(e) => {
                                   this.setState({left_VA: e.target.value})
                               }}
                               value={this.state.left_VA}
                        />
                    </div>
                </div>
                <div className='col-md-12 text-center'>
                    <div className='input-box'>
                        <input className="input-field input" type="text" placeholder="HowLong" name="usrnm"
                               onChange={(e) => {
                                   this.setState({howLong: e.target.value})
                               }}
                               value={this.state.howLong}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3 offset-md-3 text center'>
                        <button className={classNames({'submit-button' : this.validateForm(), 'disable-button' : !this.validateForm()})} onClick={this.onAnalyze} disabled={!this.validateForm()}>
                            <i className="fa fa-check-circle"></i>
                            <span style={{marginLeft: 2}}>
                            Analyze
                        </span>
                        </button>
                    </div>
                    <div className='col-md-3 text center'>
                        <button className={classNames({'submit-button' : this.validateForm(), 'disable-button' : !this.validateForm()})} onClick={this.onSave} disabled={!this.validateForm()}>
                            <i className="fa fa-save"></i>
                            <span style={{marginLeft: 2}}>
                            Save
                        </span>
                        </button>
                    </div>
                    {
                        this.state.prediction.length !== 0 &&
                        <div className='col-md-12 text-center' style={{marginTop:20}}>
                            <span style={{color: 'rgb(57, 139, 200)', fontSize: 30}}>DR Stage : {this.state.prediction}</span>
                        </div>
                    }

                </div>

            </div>
        );
    }
}