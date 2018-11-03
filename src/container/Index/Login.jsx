import React from 'react';
import {Form, Icon, Modal, Tabs, Input, Button, message, Badge} from "antd";
import "./Login.less"
import connect from "react-redux/es/connect/connect";
import Api from '~/until/api';
//

const FormItem = Form.Item;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login:{
                tel:null,
                password:null
            },
            loginForm:[
                {
                    key:"tel",
                    name:"tel",
                    required:true,
                    message:"请输入用户账号",
                    placeholder:"用户账号",
                    before:<Icon className="before-icon" type="user" theme="outlined" />,
                    re:/^1[34578]\d{9}$/,
                    isOk:"",
                },
                {
                    key:"password",
                    name:"username",
                    required:true,
                    message:"请输入用户密码",
                    placeholder:"用户密码",
                    isOk:"",
                    before:<Icon className="before-icon" type="lock" theme="outlined" />
                }
            ]
        };
    }

    changeInput = (e, item, index, name1) => {
        let value =e.target.value;
        let arr = this.state.loginForm;
        let name2 = "loginForm";
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
        if(item.key === "newpassword"){
            if(value !== this.state.register.password){
                arr[index].isOk = "error";
            }else {
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
            <div className="login-wrap">
                <div className="header-login">
                    <Icon type="left" theme="outlined" /><p>登录</p><a href="">注册</a>
                </div>
                <div>
                    <img src="" alt=""/>
                </div>
                <Form>
                    {
                        this.state.loginForm.map((item, index)=>{
                            return <FormItem
                                required
                                hasFeedback
                                validateStatus={item.key !== "code"?item.isOk:""}
                                help={item.isOk === "error"?item.message:null}
                                key={index}
                            >
                                {item.before}<Input type={item.key === "password"?"password":"text"}
                                                    onChange={(e)=>this.changeInput(e,item,index,"login")}
                                                    placeholder={item.placeholder}
                                                    id={item.isOk}/>
                            </FormItem>
                        })
                    }
                    <FormItem>
                        <Button onClick={()=>this.handleSubmit("loginForm")} onClick={()=>this.handleSubmit("loginForm")} className="check-button" type="primary">登录</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     const {loginReducer,userInfo} = state;
//     return {loginReducer,userInfo}
// };
// export default connect(mapStateToProps)(Login)
export default Login