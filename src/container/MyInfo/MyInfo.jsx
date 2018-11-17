import React from "react"
import { Icon, Button, Avatar, Modal, Upload ,message, Input } from "antd"
import connect from "react-redux/es/connect/connect";
import {fetchPostsGetUser} from '~/action/getUserInfo';
import "./MyInfo.less"
import history from "~/history";
import Api from "../../until/api"

class MyInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo:this.props.userInfo.data,
            isUpLoad:false,
            isUpName:false,
            name:this.props.userInfo.data.name
        }
    }

    logout(){
        Api.logout().then(res => {
            window.location.href = "#/Dashboard/Login"
        })
    }

    upload(file){
        Api.upLoad({file:file.file}).then(res => {
            this.setState({
                isUpLoad:false
            });
            message.success(res.msg)
        }).catch(err => {
        })
    }

    onOkname(){
        if(this.state.name.length > 10){
            message.warning("昵称长度过长")
            return false
        }
        Api.editKhName({name:this.state.name}).then(res => {
            this.props.dispatch(fetchPostsGetUser()).then(res =>{
                this.setState({
                    isUpName:false
                })
            }).catch(err => {
                window.location.href = "#/Dashboard/Login"
            });
            message.success(res.msg)
        }).catch(err => {
        })
    }

    render(){
        const { userInfo } = this.state;
        return(
            <div className="my-info-wrap-container">
                <div className="info-header">
                    <Icon onClick={()=>{history.go(-1)}} type="left" theme="outlined" />
                    <p>个人资料</p>
                </div>
                <div className="info-my-content">
                    {/*<table>*/}
                        <ul>
                            <li><span>头像</span><span>
                                <Avatar src={userInfo.avatar} onClick={()=>{this.setState({isUpLoad:true})}}
                                        size="large" icon="user" /><Icon type="right" theme="outlined" /></span></li>
                            <li><span>昵称</span><span  onClick={()=>{this.setState({isUpName:true})}}><i>{userInfo.name}</i><Icon type="right" theme="outlined" /></span></li>
                            <li><span>交易账号</span><span><i>{userInfo.up_uid}</i><Icon type="right" theme="outlined" /></span></li>
                            <li><span>手机号</span><span><i>{userInfo.mobile}</i><Icon type="right" theme="outlined" /></span></li>
                            {/*<li><span>身份证</span><span><i>已认证</i><Icon type="right" theme="outlined" /></span></li>*/}
                            {/*<li><span>姓名</span><span><i>廖家德</i><Icon type="right" theme="outlined" /></span></li>*/}
                            {/*<li><span>昵称</span><span><i>廖家德</i><Icon type="right" theme="outlined" /></span></li>*/}
                        </ul>
                    {/*</table>*/}
                    <Button onClick={()=>this.logout()}>退出登录</Button>
                </div>
                {
                    this.state.isUpLoad?<Modal footer={null} visible={this.state.isUpLoad} wrapClassName="changePic" destroyOnClose={true} maskClosable={true} title="修改头像" onCancel={()=>{this.setState({isUpLoad:false})}}>
                        <Upload beforeUpload={()=>{return false}} onChange={(file)=>this.upload(file)}>
                            <Button>
                                <Icon type="upload" />上传头像
                            </Button>
                        </Upload>
                    </Modal>:null
                }
                {
                    this.state.isUpName?
                        <Modal visible={this.state.isUpName} wrapClassName="changePic" destroyOnClose={true}
                               maskClosable={true} title="修改昵称" onOk={()=>this.onOkname()} onCancel={()=>{this.setState({isUpName:false})}}>
                            <Input placeholder="修改昵称" onChange={(value)=>{this.setState({name:value.target.value})}}/>
                        </Modal>:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginReducer,userInfo} = state;
    return {loginReducer,userInfo}
};
export default connect(mapStateToProps)(MyInfo)