import React from "react"
import { Icon, Button } from "antd"

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
                    <table>
                        <tbody>
                        <tr><td>头像</td><td><img src="" alt=""/></td><td><Icon type="right" theme="outlined" /></td></tr>
                        <tr><td>昵称</td><td>廖家德</td><td><Icon type="right" theme="outlined" /></td></tr>
                        <tr><td>交易账号</td><td>128812091</td><td><Icon type="right" theme="outlined" /></td></tr>
                        <tr><td>昵称</td><td>廖家德</td><td><Icon type="right" theme="outlined" /></td></tr>
                        <tr><td>昵称</td><td>廖家德</td><td><Icon type="right" theme="outlined" /></td></tr>
                        <tr><td>昵称</td><td>廖家德</td><td><Icon type="right" theme="outlined" /></td></tr>
                        </tbody>
                    </table>
                    <Button>退出登录</Button>
                </div>
            </div>
        )
    }
}

export default MyInfo