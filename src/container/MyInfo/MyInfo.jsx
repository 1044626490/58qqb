import React from "react"
import { Icon, Button, Avatar } from "antd"
import connect from "react-redux/es/connect/connect";
import "./MyInfo.less"

class MyInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:this.props.userInfo.data
        }
    }

    render(){
        const { userInfo } = this.state;
        console.log(userInfo)
        return(
            <div className="my-info-wrap-container">
                <div className="info-header">
                    <Icon type="left" theme="outlined" />
                    <p>个人资料</p>
                </div>
                <div className="info-my-content">
                    {/*<table>*/}
                        <ul>
                            <li><span>头像</span><span><Avatar src={userInfo.avatar} size="large" icon="user" /><Icon type="right" theme="outlined" /></span></li>
                            <li><span>昵称</span><span><i>{userInfo.name}</i><Icon type="right" theme="outlined" /></span></li>
                            <li><span>交易账号</span><span><i>{userInfo.up_uid}</i><Icon type="right" theme="outlined" /></span></li>
                            <li><span>身份证</span><span><i>已认证</i><Icon type="right" theme="outlined" /></span></li>
                            <li><span>昵称</span><span><i>廖家德</i><Icon type="right" theme="outlined" /></span></li>
                            <li><span>昵称</span><span><i>廖家德</i><Icon type="right" theme="outlined" /></span></li>
                        </ul>
                    {/*</table>*/}
                    <Button>退出登录</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(MyInfo)