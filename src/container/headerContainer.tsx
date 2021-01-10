import React from "react";
import Header from "../components/header/header";

interface IHeaderContainerProps{
    onNICChange:(NIC: string)=>void;
    patients:any[];
    onLogout:() => void;
}

class HeaderContainer extends React.Component<IHeaderContainerProps, any>{

    render() {
        return (
            <div className='page-header navbar navbar-fixed-top'>
                <Header onNICChange={this.props.onNICChange} patients={this.props.patients} onLogOut={this.props.onLogout}/>
            </div>
        );
    }
}

export default HeaderContainer;
