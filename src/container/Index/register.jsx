import React from 'react';
import {Form, Icon, Modal, Tabs, Input, Button, message, Badge} from "antd";
import "./register.less"
import connect from "react-redux/es/connect/connect";
import Api from '~/until/api';


const FormItem = Form.Item;
class  Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            register:{
                name:null,
                mobile:null,
                password:null,
                wd:null,
                code:null
            },
            Register:[
                {
                    key:"name",
                    name:"name",
                    required:true,
                    message:"请输入真实姓名",
                    placeholder:"真实姓名",
                    isOk:"",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    // re:/^1[34578]\d{9}$/,
                },
                {
                    key:"mobile",
                    name:"mobile",
                    required:true,
                    message:"请输入手机号码",
                    placeholder:"手机号码",
                    isOk:"",
                    before:<Icon type="tablet" theme="outlined" />,
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
                    key:"wd",
                    name:"wd",
                    required:true,
                    message:"请确认网点编号",
                    placeholder:"网点编号",
                    isOk:"",
                    before:<Icon type="profile" theme="outlined" />
                }
            ],
        }
    }

    changeInput = (e, item, index, name1) => {
        let value =e.target.value;
        let arr = this.state.Register;
        let name2 = "Register";
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

    getKaptchald(){
        console.log(12123);
        Api.sendVerifiCode({mobile:this.state.register.mobile}).then((res)=>{
            message.success(res.msg)
        }).catch((err) => {
            message.error(err.msg)
        })
    }

    handleSubmit(){
        let count = 0;
        this.state.Register.map((item, index)=>{
            if(item.isOk === "error"){
                count ++
            }
        });
        if(count > 0){
            message.error("信息填写错误");
            return false
        }else {
            Api.register(this.state.register).then((res) => {
                console.log(res)
                message.success(res.msg)
            }).catch((err) => {
                message.error(err.msg)
            })
        }
    }

    render(){
        return(
            <div className="register-wrap">
                <div className="header-login">
                    <Icon type="left" theme="outlined" /><p>注册</p><a onClick={()=>{window.location.href = "#/Dashboard/Login"}}>登录</a>
                </div>
                <Form>
                    {
                        this.state.Register.map((item, index)=>{
                            return <FormItem
                                required
                                hasFeedback
                                validateStatus={item.key !== "code"?item.isOk:""}
                                help={item.isOk === "error"?item.message:null}
                                key={index}
                            >
                                {item.before}<Input type={item.key === "password"||item.key === "wd"?"password":"text"} className={item.key === "code"?"kaptchald":null}
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
                <p className="register-tips">
                    温馨提示：网点编号可向你的商务经理获取
                </p>
            </div>
        )
    }
}

export default Register