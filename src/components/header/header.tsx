import React from "react";


interface IHeaderProps {
    onNICChange:(NIC: string)=>void
    patients:any[];
    onLogOut:()=>void;
}

export default class Header extends React.Component<IHeaderProps, any> {


    onPatientSelect = (value:string) => {
        this.props.onNICChange(value)
    }

    render() {
        return (
            <div className="page-header navbar navbar-fixed-top">
                <div className="page-header-inner ">
                    <div className="page-logo">
                        <a href="index.html">
                            <img alt="" src="favicon.png" height={40} width={40}/>
                            <span className="logo-default">Diabi Care</span> </a>
                    </div>
                    <ul className="nav navbar-nav navbar-left in">
                        <li><a href="#" className="menu-toggler sidebar-toggler"><i
                            className="icon-menu"></i></a></li>
                    </ul>
                    <form className="search-form-opened" action="#" method="GET">
                        <div className="input-group">
                            <select className="form-control" placeholder="Patient NIC" name="query" onChange={(e) => this.onPatientSelect(e.target.value)}>
                                <option value="select">Select NIC</option>
                                {

                                    Object.keys(this.props.patients).map((p:any) => {
                                        return (<option value={this.props.patients[p].nic}>{this.props.patients[p].nic}</option>)
                                    })
                                }
                            </select>

                        </div>
                    </form>

                    <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse"
                       data-target=".navbar-collapse">
                        <span></span>
                    </a>

                    <div className="top-menu">
                        <ul className="nav navbar-nav pull-right">
                            <li className="dropdown dropdown-user">
                                <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown"
                                   data-hover="dropdown" data-close-others="true">
                                    <img alt="" className="img-circle " src="assets/img/dp.jpg"/>
                                    <span className="username username-hide-on-mobile"> John </span>
                                    <i className="fa fa-angle-down"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-default animated jello">
                                    <li>
                                        <a onClick={this.props.onLogOut}><i className="icon-logout"></i> Log Out </a>
                                    </li>
                                </ul>
                                {/*    <li>*/}
                                {/*        <a href="#">*/}
                                {/*            <i className="icon-settings"></i> Settings*/}
                                {/*        </a>*/}
                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <a href="#">*/}
                                {/*            <i className="icon-directions"></i> Help*/}
                                {/*        </a>*/}
                                {/*    </li>*/}
                                {/*    <li className="divider"></li>*/}
                                {/*    <li>*/}
                                {/*        <a href="lock_screen.html">*/}
                                {/*            <i className="icon-lock"></i> Lock*/}
                                {/*        </a>*/}
                                {/*    </li>*/}
                                {/*    <li>*/}
                                {/*        <a href="login.html">*/}
                                {/*            <i className="icon-logout"></i> Log Out </a>*/}
                                {/*    </li>*/}
                                {/*</ul>*/}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

