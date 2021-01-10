import React from "react";
import menu from './menu.json';
import {map} from 'lodash';

interface IHamburgerMenuProps {
    onMenuClick:(path: string) => void;
}

export default class HamburgerMenu extends React.Component<IHamburgerMenuProps, any> {

    render() {
        return (
            <div className='sidebar-container' style={{backgroundColor:'#172631'}}>
                <div className='sidemenu-container navbar-collapse collapse fixed-menu'>
                    <div id='remove-scroll'>
                        <ul className="sidemenu page-header-fixed p-t-20" data-keep-expanded="false"
                            data-auto-scroll="true" data-slide-speed="200">
                            <li className="sidebar-toggler-wrapper hide">
                                <div className="sidebar-toggler">
                                    <span></span>
                                </div>
                            </li>
                            {/**TODO: Set active menu with active and start class**/}
                            {map(menu, (item:any) => {
                                return (
                                    <li className="nav-item start active">
                                        <a onClick={()=>{this.props.onMenuClick(item.path)}} className="nav-link nav-toggle">
                                            {/**NOTE: Uncomment to add icon**/}
                                            {/*<i className="material-icons">dashboard</i>*/}
                                            <span className="title">{item.name}</span>
                                            {/**TODO: Uncomment to handling arrow and selected **/}
                                            {/*<span className="selected"></span>*/}
                                            {/*<span className="arrow open"></span>*/}
                                        </a>

                                        {/**TODO: uncomment to add submenu **/}
                                        {/*<ul className="sub-menu">*/}
                                        {/*    <li className="nav-item active">*/}
                                        {/*        <a href="index.html" className="nav-link ">*/}
                                        {/*            <span className="title">Dashboard 1</span>*/}
                                        {/*            <span className="selected"></span>*/}
                                        {/*        </a>*/}
                                        {/*    </li>*/}
                                        {/*    <li className="nav-item ">*/}
                                        {/*        <a href="dashboard2.html" className="nav-link ">*/}
                                        {/*            <span className="title">Dashboard 2</span>*/}
                                        {/*        </a>*/}
                                        {/*    </li>*/}
                                        {/*</ul>*/}
                                    </li>
                                )

                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

