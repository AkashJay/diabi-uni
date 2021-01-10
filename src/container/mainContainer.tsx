import React from "react";
import HeaderContainer from "./headerContainer";
import AppContainer from "./appContainer";
import FooterContainer from "./footerContainer";
import FirebaseService from "../services/firebase-service";
import LoadingIndicator from "../components/loader/loader";
import LoginContainer from "./LoginContainer";

interface IMainContainerStates{
    patients:any[]
    selectedNIC:string;
    isLoggedIn:boolean;
}

class MainContainer extends React.Component<any, IMainContainerStates> {
    constructor(props:any) {
        super(props);
        this.state = {
            patients:[],
            selectedNIC:'',
            isLoggedIn:false
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem("token");
        const loggedIn = token ? true :false;
        FirebaseService.getPatients().then(res => {
            this.setState({patients:res})
        }).catch(err => {

        });
        this.setState({
            isLoggedIn:loggedIn
        })
    }

    private onNICChange = (NIC:string) => {
        this.setState({
            selectedNIC:NIC
        })
    }

    private logout = () => {
        window.localStorage.clear();
        this.setState({
            isLoggedIn:false
        })

    }



    render() {
        return (
            <div>

                {this.state.isLoggedIn &&
                    <div>
                        <LoadingIndicator/>
                        <HeaderContainer onNICChange={this.onNICChange} patients={this.state.patients} onLogout={this.logout}/>
                        <React.StrictMode>
                            <AppContainer selectedNIC={this.state.selectedNIC} patients={this.state.patients}/>
                        </React.StrictMode>
                        <FooterContainer/>
                    </div>

                }
                {!this.state.isLoggedIn &&
                <React.StrictMode>
                    <LoginContainer/>
                </React.StrictMode>
                }
            </div>
        );
    }

}

export default MainContainer;
