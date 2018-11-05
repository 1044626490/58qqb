import React from 'react';
import {Form, Icon, Modal, Tabs, Input, Button, message, Badge} from "antd";
import "./register.less"
import connect from "react-redux/es/connect/connect";
import Api from '~/until/api';

const FormItem = Form.Item;
class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forgetForm:[
                {
                    key:"tel",
                    name:"tel",
                    required:true,
                    message:"请输入手机号码",
                    placeholder:"手机号码",
                    isOk:"",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[34578]\d{9}$/,
                },
                {
                    key:"code",
                    name:"code",
                    required:true,
                    message:"请输入验证码",
                    placeholder:"短信验证码",
                    isOk:"",
                    before:<Icon className="before-icon" type="safety-certificate" theme="outlined" />
                },
                {
                    key:"password",
                    name:"password",
                    required:true,
                    message:"请输入交易密码（6~12位）",
                    placeholder:"用户密码",
                    isOk:"",
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                },
                {
                    key:"newpassword",
                    name:"newpassword",
                    required:true,
                    message:"请输入交易密码（6~12位）",
                    placeholder:"确认交易密码（6~12位）",
                    isOk:"",
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                }
            ]
        }
    }

    render(){
        return(
            <div className="register-wrap">
                <div className="header-login">
                    <Icon  onClick={()=>{window.history.go(-1)}} type="left" theme="outlined" /><p>忘记密码</p>
                </div>
                <Form>
                    {
                        this.state.forgetForm.map((item, index)=>{
                            return <FormItem
                                required
                                hasFeedback
                                validateStatus={item.key !== "code"?item.isOk:""}
                                help={item.isOk === "error"?item.message:null}
                                key={index}
                            >
                                {item.before}<Input type={item.key === "password"||item.key === "newpassword"?"password":"text"} className={item.key === "code"?"kaptchald":null}
                                                    onChange={(e)=>this.changeInput(e,item,index,"register")}
                                                    placeholder={item.placeholder}
                                                    id={item.isOk}/>
                                {
                                    item.key === "code"?
                                        <Button onClick={()=>this.getKaptchald()} className="get-kaptchald" type="primary">获取验证码</Button>
                                        :null
                                }
                            </FormItem>
                        })
                    }
                    <FormItem>
                        <Button onClick={()=>this.handleSubmit("Register")} className="check-button" type="primary">注册</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default ForgetPwd