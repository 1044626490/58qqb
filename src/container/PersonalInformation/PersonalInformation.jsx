import React from 'react';
import {Input, Icon, Modal, Avatar, Progress, Badge, message, Button, Upload} from "antd";
import connect from "react-redux/es/connect/connect";
import BottomMenu from "../../components/bottomMenu/bottonMenu"
import HeaderNav from "../../components/headerNav/headerNav";
import Api from '~/until/api';
import "./PersonalInformation.less"
import {fetchPostsGetUser} from '~/action/getUserInfo';
import MyInfoModal from "./component/MyInfoModal";
//
class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isResetName: false,
            myInfo: this.props.userInfo.data,
            isOpenModel:false,
            isResetMyInfo:false,

        }
    }

    getUserInfo = () =>{
        this.props.dispatch(fetchPostsGetUser()).then((res) => {
            console.log(res.data);
            let rate = 0;
            if(res.data.total_office !== 0){
                rate = Math.round(res.data.victory/res.data.total_office);
            }
            this.setState({
                myInfo:res.data,
            })
        }).catch((err) => {
            message.error(err.msg)
        })
    };

    openModal = (isOpen) => {
        this.setState({
            isOpenModel:isOpen
        })
    };

    render(){
        console.log(this.state.myInfo)
        const info = this.state.myInfo;

        return(
            <div className="my-info-container">
                <HeaderNav name="挑战10秒"/>
                <div className="my-info-wrap">
                    <div className="header-pic">
                            <div className="top-header">
                                <Avatar size={64} icon="user" src={info?info.avatar:require("../../layouts/image/head.png")} />
                                <div className="name-class">
                                    <p><span>账号：</span><span>
                                        <span className="my-name">{info?info.username:""}</span><span>({info?info.uid:""})</span>&nbsp;&nbsp;
                                        <Icon type="edit" theme="outlined" onClick={()=>{this.setState({isResetMyInfo:true})}}/>
                                    </span>
                                    </p>
                                    <div className="my-level"><span className="class-rank">签名：</span>
                                        <span>
                                            {this.state.myInfo.signature}
                                        </span>
                                        {/*<Progress successPercent={30} />&nbsp;&nbsp;&nbsp;lv{info?info.level:1}*/}
                                        </div>
                                </div>
                            </div>
                            <div className="bottom-header">
                                <ul className="bottom-header-list">
                                    <li>
                                        <p>{info?info.gold:0}</p>
                                        <span>金币</span>
                                    </li>
                                    <li>
                                        <p>{info?info.silver:0}</p>
                                        <span>银币</span>
                                    </li>
                                    <li onClick={()=>{window.location.href = "#/Dashboard/MyFriend/1"}}>
                                        <div>
                                            <Badge count={10} overflowCount={9}>98
                                            </Badge>
                                        </div>
                                        <span>好友</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <div className="my-info-operation">
                        <div className="operation-list">
                            <ul>
                                <li onClick={()=>this.openModal(true)}>
                                    <p>个人信息</p><Icon type="right" theme="outlined" />
                                </li>
                                <li onClick={()=>{window.location.href = "#/Dashboard/MyMedal"}}>
                                    <p>我的勋章</p><Icon type="right" theme="outlined" />
                                </li>
                                <li onClick={()=>{window.location.href = "#/Dashboard/MyFriend/3"}}>
                                    <p>邀请好友</p><Icon type="right" theme="outlined" />
                                </li>
                                <li>
                                    <p>意见或建议</p><Icon type="right" theme="outlined" />
                                </li>
                            </ul>
                        </div>
                        <div onClick={()=>{window.location.href = "#/Dashboard/Setting"}} className="setting-operation">
                            <p>设置</p><Icon type="right" theme="outlined" />
                        </div>
                    </div>
                </div>
                <BottomMenu />
                <MyInfoModal info={info} isResetMyInfo={this.state.isResetMyInfo} openModal={()=>this.openModal()}
                             changeHeader={()=>this.changeHeader()} isOpenModel={this.state.isOpenModel}
                             getUserInfo={()=>{
                                this.getUserInfo();
                                this.setState({
                                    isResetMyInfo:false
                                })
                             }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(PersonalInformation)