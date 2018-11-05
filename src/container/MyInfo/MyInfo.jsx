import React from "react"
import { Icon, Button, Avatar } from "antd"
import "./MyInfo.less"

class MyInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    render(){
        return(
            <div className="my-info-wrap-container">
                <div className="info-header">
                    <Icon type="left" theme="outlined" />
                    <p>个人资料</p>
                </div>
                <div className="info-my-content">
                    {/*<table>*/}
                        <ul>
                            <li><span>头像</span><span><img src="" alt=""/></span><span><Avatar size="large" icon="user" /></span></li>
                            <li><span>昵称</span><span><i>廖家德</i><Icon type="right" theme="outlined" /></span></li>
                            <li><span>交易账号</span><span><i>128812091</i><Icon type="right" theme="outlined" /></span></li>
                            <li><span>昵称</span><span><i>廖家德</i><Icon type="right" theme="outlined" /></span></li>
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

export default MyInfo