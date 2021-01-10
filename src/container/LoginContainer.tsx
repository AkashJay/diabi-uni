import React from "react";

interface ILoginContainerStates {
    email: string;
    password: string;
}


export default class LoginContainer extends React.Component<any, ILoginContainerStates> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div className='login-wrapper d-flex align-items-center justify-content-center text-center '>
                <div style={{minWidth: 1000}}>
                    <div className='row' style={{minHeight:130}}>
                        <div className='col-12'></div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5 diagnose-login" style={{minHeight: 'none',verticalAlign:'center'}}>
                            <div className='text-center' style={{color:'blue',fontSize:20, fontWeight:'bold'}}>Consultant Login</div>
                            <div className="register-form mt-5 px-4" style={{marginTop: 0}}>
                                <form>
                                    <div className="form-group text-left mb-4"><span>Email</span>
                                        <label htmlFor="username"><i className="lni lni-user"></i></label>
                                        <input className="form-control" id="username" type="text"
                                               placeholder="Enter your email" value={this.state.email}
                                               onChange={(e) => {
                                                   this.setState({email: e.target.value})
                                               }}/>
                                    </div>
                                    <div className="form-group text-left mb-4"><span>Password</span>
                                        <label htmlFor="username"><i className="lni lni-user"></i></label>
                                        <input className="form-control" id="username" type="password"
                                               placeholder="Enter your password" value={this.state.password}
                                               onChange={(e) => {
                                                   this.setState({password: e.target.value})
                                               }}/>
                                    </div>
                                    <button className="btn  btn-lg w-100" onClick={() => {window.localStorage.setItem("token","123456sdfsw2432r2341234")}} style={{backgroundColor: '#080858',color:'#fff8f8'}}
                                            disabled={(this.state.email !== '' && this.state.password !== '')}>Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
