import React from "react";
import {ALERT_TYPES} from "../../constants/constants";

interface IAlertPopUpProps {
    alertMessage: string;
    alertType: string;
    onOkClick:()=>void;
}

class AlertPopup extends React.Component<IAlertPopUpProps, any> {

    render() {
        return (
            <div>
                <div className="sweet-overlay" style={{opacity: 1.16, display: 'block'}}></div>
                <div className="sweet-alert showSweetAlert visible" data-custom-class="" data-has-cancel-button="false"
                     data-has-confirm-button="true" data-allow-outside-click="false" data-has-done-function="false"
                     data-animation="pop" data-timer="null" style={{display: 'block', marginTop: -108}}>
                    <div className="sa-icon sa-error" style={{display: 'none'}}>
                  <span className="sa-x-mark">
                    <span className="sa-line sa-left"></span>
                    <span className="sa-line sa-right"></span>
                  </span>
                    </div>
                    <h2>{this.props.alertMessage}</h2>
                    <div className="sa-button-container">
                        <div className="sa-confirm-button-container">
                            <button className="confirm" style={{
                                display: 'inline-block',
                                backgroundColor: this.props.alertType === ALERT_TYPES.SUCCESS ? 'rgb(140, 212, 245)' : 'red',
                                boxShadow: 'rgba(140, 212, 245, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset'
                            }} onClick={this.props.onOkClick}>OK
                            </button>
                            <div className="la-ball-fall">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default AlertPopup;