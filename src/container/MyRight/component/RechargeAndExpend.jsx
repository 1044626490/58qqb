import React from "react"
import {InputNumber, Button, message, Icon} from "antd"
import "./RechargeAndExpend.less"
import connect from "react-redux/es/connect/connect";
import Api from "../../../until/api"

class RechargeAndExpend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.match.params.id,
            value:null
        }
    }

    submit(){
        if(this.state.id === "1"){
            if(Number(this.state.value) >= 100){
                Api.reflect({money:this.state.value}).then(res => {
                    message.success(res.msg)
                }).catch(err=>{
                    message.warning(err.msg)
                })
            }else {
                message.warning("提现需要大于100")
            }
        }else {
            if(Number(this.state.value) >= 1){
                window.location.href = "http://qq.jiaoyixiu.com/api/pay/bank_quick_pay?money="+this.state.value+"&uid="+this.props.userInfo.data.up_id;
            }else {
                message.warning("请输入大于1的数字")
            }
        }
    }

    render(){
        return(
            <div  className="my-RechargeAndExpend-wrap">
                <div className="my-RechargeAndExpend-header">
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" />
                    <p>{this.state.id === "1"?"提现申请":"充值操作"}</p>
                    <span onClick={()=>{window.location.href = "#/Dashboard/MoneyRecord/"+this.state.id}} className="record">{this.state.id === "1"?"出金记录":"入金记录"}</span>
                </div>
                <InputNumber  defaultValue={this.state.value} onChange={(value)=>{this.setState({value:value})}} placeholder={this.state.id === "1"?"请输入要提现的金额（需大于等于100）":"请输入金额"} />
                <Button onClick={()=>this.submit()}>{this.state.id === "1"?"立即提现":"提交"}</Button>
                {
                    this.state.id === "1"?<div className="info">
                        <h5>温馨提示：</h5>
                        <p>提现时间为交易日早上9:30到15:30分。</p>
                        <p>提现到账时间为交易日24点之前。</p>
                    </div>:null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {userInfo} = state;
    return {userInfo}
};
export default connect(mapStateToProps)(RechargeAndExpend)
// export default RechargeAndExpend