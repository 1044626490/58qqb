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
            forget:{
                tel:null,
                password:null,
                newpassword:null,
                code:null
            },
            forgetForm:[
                {
                    key:"tel",
                    name:"tel",
                    required:true,
                    message:"请输入手机号码",
                    placeholder:"手机号码",
                    isOk:"",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[345789]\d{9}$/,
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
                    re:/^\d{6,12}$/,
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                },
                {
                    key:"newpassword",
                    name:"newpassword",
                    required:true,
                    message:"请输入交易密码（6~12位）",
                    placeholder:"确认交易密码（6~12位）",
                    isOk:"",
                    re:/^\d{6,12}$/,
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                }
            ]
        }
    }

    handleSubmit(){
        let count = 0;
        this.state.forgetForm.map((item, index)=>{
            if(item.isOk === "error"){
                count ++
            }
        });
        if(count > 0){
            message.error("信息填写错误");
            return false
        }else {
            Api.changePass(this.state.forget).then((res) => {
                message.success(res.msg)
                window.location.href = "#/Dashboard/Lgoin"
            }).catch((err) => {
                message.error(err.msg)
            })
        }
    }

    getKaptchald(){
        Api.sendVerifiCode({mobile:this.state.register.mobile}).then((res)=>{
            message.success(res.msg)
        }).catch((err) => {
            message.error(err.msg)
        })
    }

    changeInput = (e, item, index, name1) => {
        let value =e.target.value;
        let arr = this.state.forgetForm;
        let name2 = "forgetForm";
        let name = item.key;
        let form = this.state[name1];
        if(item.re){
            if(item.re.test(value)){
                arr[index].isOk = "success";
                form[name] = value;
            }else {
                arr[index].isOk = "error";
            }
        }else {
            if(value === ""||!value){
                arr[index].isOk = "error";
            }else {
                form[name] = value;
                arr[index].isOk = "success";
            }
        }
        this.setState({
            [name2]:arr,
            [name1]:form
        })
    };

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
                                                    onChange={(e)=>this.changeInput(e,item,index,"forget")}
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
                        <Button onClick={()=>this.handleSubmit("forget")} className="check-button" type="primary">注册</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default ForgetPwd