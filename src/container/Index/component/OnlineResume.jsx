import React from "react";
import {Icon, message, Button, Modal, Input, DatePicker, Divider, InputNumber} from "antd";
import Api from "~/until/api";
import moment from 'moment';
import 'moment/locale/zh-cn';
import "./OnlineResume.less";
import {error} from "../../../../../components/common/message";
import { DOWNLOAD_RESUME } from "~/constants/api"
moment.locale('zh-cn');

const confirm = Modal.confirm;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { TextArea } = Input;

class OnlineResume extends React.Component {
  constructor() {
    super();
    this.state = {
        mode: ['month', 'month'],//范围时间的mode
        myInfo:null,//我的信息
        practiceInfo:[],//校园实践数据
        educationBack:[],//教育背景数据
        projectExp:[],//项目经验数据
        // value: [],
        isSelfAssessment:true,//是否打开自我评价修改框
        isProfessionalSkill:true,//是否打开专业技能修改框
        eduBack:[],//判断当前教育背景的所有框的某一个是否是处于修改状态
        project:[],//判断当前项目经验的所有框的某一个是否处于修改状态
        practice:null,//判断校园实践中是否有一个框处于修改状态
        ProfessionalSkill:"",//用于存储当前专业技能的修改后的值，用于提交
        selfAssessmentInfo:"",//用于存储当前自我评价修改后的值，用于提交
        addProjectExp:null,//判断是否新增项目经验并用于存储新增项目经验的值
        addEduBack:null,//判断是否新增教育背景并用于存储新增项目经验的值
        addPractice:null,//判断是否新增校园实践并用于存储新增校园实践的值
        };
    }

    componentDidMount(){
      //组件加载完成后查询用户数据
      this.getUserInfo()
    }

    //查询用户数据
    getUserInfo = () =>{
      Api.queryStudentResume().then((res)=>{
          message.success(res.message);
          let arr = [];
          let arr1 = [];
          let arr2 = [];
          let practice = res.content.practice;
          let educationBack = res.content.educationBack;
          let projectExp = res.content.projectExperience;
          arr.length = res.content.practice.length;
          //以下for循环用于将字符串切割成数组
          for(let i=0;i<arr.length;i++){
              arr[i] = true;
              practice[i] = practice[i].split("|,|");
          }
          for(let i=0;i<educationBack.length;i++){
              arr1[i] = true;
              educationBack[i] = educationBack[i].split("|,|");
          }
          for(let i=0;i<arr.length;i++){
              arr2[i] = true;
              projectExp[i] = projectExp[i].split("|,|");
          }
          this.setState({
              practice:arr,
              project:arr2,
              eduBack:arr1,
              myInfo:res.content,
              practiceInfo:practice,
              projectExp:projectExp,
              selfAssessmentInfo:res.content.evaluate,
              ProfessionalSkill:res.content.specialtySkill,
              educationBack:educationBack
          })
      }).catch((res)=>{
          message.error(res.message)
      })
    };

    //打开修改框的时候触发
    /*
    * params isClose:是否关闭，
    * params whichInput:当前打开的框的类别，
    * params index:当前类别下的第几个框
    *
    * */
    changeInput = (isClose, whichInput,index) =>{
        let arr = this.state.practice;
        let arr1 = this.state.eduBack;
        let arr2 = this.state.project;
        if(whichInput === "practice"){
            for(let i=0;i<arr.length;i++){
                if(index !== i){
                    arr[i] = true;
                }
            }
            arr[index] = !this.state.practice[index]
        }else if(whichInput === "eduBack"){
            for(let i=0;i<arr1.length;i++){
                if(index !== i) {
                    arr1[i] = true
                }
            }
            arr1[index] = !this.state.eduBack[index]
        }else if(whichInput === "project"){
            for(let i=0;i<arr2.length;i++){
                if(index !== i) {
                    arr2[i] = true
                };
            }
            arr2[index] = !this.state.project[index]
        }
        if(whichInput !== "practice"){
            for(let i=0;i<arr.length;i++){
                arr[i] = true;
            }
        }else if(whichInput !== "eduBack"){
            for(let i=0;i<arr1.length;i++){
                arr1[i] = true;
            }
        }else if(whichInput !== "project"){
            for(let i=0;i<arr2.length;i++){
                arr2[i] = true;
            }
        }
        whichInput === "isSelfAssessment"?this.setState({
            isSelfAssessment:!this.state.isSelfAssessment,
        }):whichInput === "isProfessionalSkill"?this.setState({
            isProfessionalSkill:!this.state.isProfessionalSkill,
        }):whichInput === "practice"?this.setState({
            practice:arr
        }):whichInput === "eduBack"?this.setState({
            eduBack:arr1
        }):whichInput === "project"?this.setState({
            project:arr2
        }):null;
        isClose?this.getUserInfo():null
    };

    //重置数据，在保存修改数据之后和删除数据之后调用，不用传任何参数
    resetUserInfo = () =>{
        let practice = this.state.practiceInfo.map((item) => {
            return item.join("|,|")
        });
        let educationBack = this.state.educationBack.map((item) => {
            return item.join("|,|")
        });
        let projectExperience = this.state.projectExp.map((item) => {
            return item.join("|,|")
        });
        let params = {
            evaluate:this.state.selfAssessmentInfo||"",
            specialtySkill: this.state.ProfessionalSkill||"",
            practice,
            educationBack,
            projectExperience,
        };
        Api.updateResumeInfo(params).then((res) => {
            message.success(res.message);
        }).catch((res) => {
            message.error(res.message);
        });
        this.setState({
            practiceInfo:[],
            educationBack:[],
            projectExp:[],
            isSelfAssessment:true,
            isProfessionalSkill:true,
            ProfessionalSkill:"",
            selfAssessmentInfo:"",
            addProjectExp:null,
            addEduBack:null,
            addPractice:null,
        });
        this.getUserInfo()
    };

    //保存以及新增框的返回按钮触发，用于将新增框的值添加到对应的数据组中
    /*
    * params name：当前框的类型，
    * params isSave：是否保存
    * */
    updateInfo = (name, isSave) => {
        if(!isSave){
            this.setState({
                [name]:null
            })
        }else {
            let arr = this.state[name];
            name === "addEduBack"?this.setState({
                educationBack:this.state.educationBack.push(arr)
            }):name === "addProjectExp"?
                this.setState({
                    projectExp:this.state.projectExp.push(arr)
                }):name === "addPractice"?
                    this.setState({
                        practiceInfo:this.state.practiceInfo.push(arr)
                    }):null;
            this.resetUserInfo();
        }
    };

    //打开新增框
    /*
    * params name：对应的新增框的名称
    * */
    add = (name) => {
        name === "project"?this.setState({
            addProjectExp:[],
        }):name === "eduBack"?this.setState({
            addEduBack:[]
        }):name === "practice"?this.setState({
            addPractice:[]
        }):null
    };

    //范围时间修改调用
    /*
    * params value：修改后传过来的修改后的值，需要用moment转化为时间
    * params mode：范围时间使用的mode
    * params name：当前范围时间的类型
    * params index；当前范围时间的类型下的数据的下标（新增时下标为-1）
    * */
    handlePanelChange = (value, mode, name,index) => {
            if(name.indexOf("add") === -1){
                let time = moment(value[0]).format("YYYY年MM月")+"-"+moment(value[1]).format("YYYY年MM月");
                let arr = this.state[name];
                arr[index][0] = time;
                this.setState({
                    [name]:arr,
                    mode: [
                        mode[0] === 'date' ? 'month' : mode[0],
                        mode[1] === 'date' ? 'month' : mode[1],
                    ],
                });
            }else {
                let time = moment(value[0]).format("YYYY年MM月")+"-"+moment(value[1]).format("YYYY年MM月");
                let arr = this.state[name]||[];
                arr[0] = time;
                this.setState({
                    [name]:arr,
                    mode:[
                        mode[0] === 'date' ? 'month' : mode[0],
                        mode[1] === 'date' ? 'month' : mode[1],
                    ]
                })
            }
    };

    //input内容修改时调用（不包括number类型和时间类型的input框）
    /*
    * params e：用于事件代理，拿到事件源及值
    * params name：当前范围时间的类型
    * params index；当前范围时间的类型下的数据的下标（新增时下标为-1）
    * params index2；当前范围时间的类型下的这一条数据下的下标
    * */
    onChange = (e,name, index, index2) => {
        let value = e.target.value?e.target.value:"";
        let arr = this.state[name];
        if(index2){
            if(index >= 0){
                arr[index][index2] = value;
            }else {
                arr[index2] = value;
            }
        }
        if(index === 0||index){
            this.setState({
                [name]:arr
            })
        }else {
            this.setState({
                [name]:value
            })
        }
    };

    //input（number类型）内容修改时调用
    /*
    * params value：修改后的值
    * params name：当前范围时间的类型
    * params index；当前范围时间的类型下的数据的下标（新增时下标为-1）
    * params index2；当前范围时间的类型下的这一条数据下的下标
    * */
    getNum(value,name, index, index2){
        let arr = this.state[name];
        if(index2){
            if(index >= 0){
                arr[index][index2] = value;
            }else {
                arr[index2] = value;
            }
        }
        if(index === 0||index){
            this.setState({
                [name]:arr
            })
        }else {
            this.setState({
                [name]:value
            })
        }
    }

    //删除对应的数据
    /*
    * params name：当前类型
    * params index；当前类型下的数据的下标
    * */
    delete = (name, index) => {
        let arr = this.state[name].splice(index,1);
        this.setState({
            [name]:arr
        });
        this.resetUserInfo()
    };

    render(){
      const date = new Date();
      const { mode } = this.state;//时间范围选择器的mode
        //基本资料的name和key值
      const userBaseInfo = [
          {
              key:"name",
              name:"姓名",
          },
          {
              key:"sex",
              name:"性别",
          },
          {
              key:"birthday",
              name:"出生日期",
          },
          {
              key:"nativePlace",
              name:"籍贯",
          },
          {
              key:"locationNow",
              name:"现所在地",
          },
          {
              key:"education",
              name:"最高学历",
          },
          {
              key:"experience",
              name:"工作经验",
          },
          {
              key:"salary",
              name:"薪酬期望",
          },
          {
              key:"tel",
              name:"联系电话",
          },
          {
              key:"email",
              name:"电子邮箱",
          }
      ];
      //项目经验的input框的名称和类型
      const projectExp = [
          {name:"项目时间",type:"date"},
          {name:"项目名称",type:"text"},
          {name:"项目人数",type:"number"},
          {name:"项目职务",type:"text"},
          {name:"项目简介",type:"textarea"},
          {name:"责任描述",type:"textarea"},
          {name:"业绩描述",type:"textarea"},
          ];
      //拿到查询到的所有的信息
      const info = this.state.myInfo;
      //拆分日期为年月日
      let [year, month, day] = info?info.birthday.split("-"):[0,0,0];
        return(
            <div id="online-resume">
                {
                    info?
                        <div className="userinfo-resume">
                            <div className="online-resume-header">
                                <span>助力毕业求职测评</span>
                                <br/>
                                <span>www.zhianedu.com</span>
                            </div>
                            <div className="online-resume-userinfo">
                                <span className="online-resume-name">{info.name}——{info.onlineFileName} 求职简历</span>
                                {/*导入导出的按钮*/}
                                <div className="output-word">
                                    <button><a target="_blank" href={DOWNLOAD_RESUME+"?type=1"}>导出word</a></button>
                                    <button><a target="_blank" href={DOWNLOAD_RESUME+"?type=2"}>导出PDF</a></button>
                                </div>
                                {/*基本资料框*/}
                                <div className="base-user-info">
                                    <h3>基本资料</h3>
                                    <div className="base-user-info-header">
                                        <img src={this.state.myInfo.photoUrl||require("../../../../../layouts/image/employ/resume_header.png")} alt=""/>
                                    </div>
                                    <table className="userBaseInfo-content">
                                        <tbody>
                                        {
                                            userBaseInfo.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="base-info-table-name">{item.name}</td>
                                                    <td className="base-info-table-name">：</td>
                                                    {
                                                        item.key === "birthday"?
                                                            <td>{year}年{month}月{day}日</td>
                                                            :item.key === "sex"?
                                                            <td>{info[item.key] === 1?
                                                                "男":info[item.key] === 2?
                                                                    "其他":"女"}</td>
                                                            :<td>{info[item.key]}</td>
                                                    }
                                                </tr>
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/*自我评价框*/}
                            <div className="self-assessment">
                                <div className="self-assessment-info">
                                    <h3>自我评价</h3>
                                    <div className={this.state.isSelfAssessment?"self-assessment-input":"self-assessment-input input-border self-assessment-input-disabled"}>
                                        {
                                            /*判断是否是出于输入状态*/
                                            this.state.isSelfAssessment?
                                                <div>
                                                    <Icon type="form" theme="outlined" onClick={() => this.changeInput(false,"isSelfAssessment")}/>
                                                    <span>{this.state.selfAssessmentInfo}</span>
                                                </div>
                                                :<div>
                                                    <TextArea
                                                        defaultValue={this.state.selfAssessmentInfo}
                                                        placeholder={"自我评价描述：以个人技能及其他素养，" +
                                                        "描述出自己能胜任该岗位的能力，建议3-5条"}
                                                        autosize={{minRows: 3}}
                                                        onChange={(e)=>this.onChange(e,"selfAssessmentInfo")}
                                                    />
                                                    <div className="input-button">
                                                        <Button onClick={()=>this.updateInfo("selfAssessmentInfo",true)}>保存</Button>
                                                        <Button onClick={()=>this.changeInput(true,"isSelfAssessment")} className="close-botton">返回</Button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/*专业技能框*/}
                            <div className="self-assessment">
                                <div className="self-assessment-info">
                                    <h3>专业技能</h3>
                                    <div className={this.state.isProfessionalSkill?"self-assessment-input":"self-assessment-input input-border self-assessment-input-disabled"}>
                                        {
                                            /*判断是否是出于输入状态*/
                                            this.state.isProfessionalSkill?
                                                <div>
                                                    <Icon type="form" theme="outlined" onClick={() => this.changeInput(false, "isProfessionalSkill")}/>
                                                    <span>{this.state.ProfessionalSkill}</span>
                                                </div>:<div>
                                                    <TextArea
                                                        defaultValue={this.state.ProfessionalSkill}
                                                        placeholder={"专业技能描述：描述出个人目前掌握的技能，包括但不限于专业所学" +
                                                        "、办公软件掌握以及其他与求职岗位相关之素养（如：英语水平、获奖经历）"}
                                                        autosize={{minRows: 3}}
                                                        onChange={(e) => this.onChange(e, "ProfessionalSkill")}
                                                        // disabled={this.state.isProfessionalSkill}
                                                    />
                                                    <div className="input-button">
                                                        <Button onClick={()=>this.updateInfo("ProfessionalSkill",true)}>保存</Button>
                                                        <Button onClick={()=>this.changeInput(true,"isProfessionalSkill")} className="close-botton">返回</Button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/*校园实践框*/}
                            <div className="self-assessment school-practice">
                                <div className="self-assessment-info">
                                    <h3>校园实践</h3><span onClick={()=>this.add("practice")} className="new-add">+新增校园实践</span>
                                    {
                                        this.state.practiceInfo.map((item, index)=>{
                                            return <div key={index} className={this.state.practice[index]?"self-assessment-input":"self-assessment-input input-border self-assessment-input-disabled"}>
                                                {
                                                    /*判断第几条数据是否是出于输入状态，每一种情况下只能修改一条数据，但是可以同时新增加修改*/
                                                    this.state.practice[index]?
                                                        <div>
                                                            <Icon type="form" theme="outlined" onClick={() => this.changeInput(false,"practice",index)}/>
                                                            <Icon type="delete" theme="outlined" onClick={() => this.delete("practiceInfo",index)}/>
                                                            <div>
                                                                <span>{this.state.practiceInfo[index][0]}</span><Divider type="vertical" />
                                                                <span>{this.state.practiceInfo[index][1]}</span><Divider type="vertical" />
                                                                <span>{this.state.practiceInfo[index][2]}</span>
                                                                <br/>
                                                                <br/>
                                                                <p>
                                                                    {this.state.practiceInfo[index][3]}
                                                                </p>
                                                            </div>
                                                        </div> :<div>
                                                            <RangePicker
                                                                placeholder={['开始时间', '结束时间']}
                                                                format="YYYY年MM月"
                                                                value={[
                                                                    moment(this.state.practiceInfo[index][0].split("-")[0],"YYYY-MM"),
                                                                    moment(this.state.practiceInfo[index][0].split("-")[1],"YYYY-MM")
                                                                ]}
                                                                mode={mode}
                                                                onPanelChange={(value, mode)=>{
                                                                    this.handlePanelChange(value,mode,"practiceInfo",index)
                                                                }}
                                                            />
                                                            <Input onChange={(e)=>this.onChange(e,"practiceInfo",index,1)} defaultValue={this.state.practiceInfo[index][1]} className="school-name" placeholder="学校名称"/>
                                                            <Input onChange={(e)=>this.onChange(e,"practiceInfo",index,2)} defaultValue={this.state.practiceInfo[index][2]} className="school-name" placeholder="实践名称"/>
                                                            <TextArea
                                                                defaultValue={"实践描述："+this.state.practiceInfo[index][3]}
                                                                placeholder={"专业技能描述：描述出个人目前掌握的技能，包括但不限于专业所学" +
                                                                "、办公软件掌握以及其他与求职岗位相关之素养（如：英语水平、获奖经历）"}
                                                                autosize={{minRows: 3}}
                                                            />
                                                            <div className="input-button">
                                                                <Button onClick={()=>this.updateInfo("practiceInfo",true)}>保存</Button>
                                                                <Button onClick={()=>this.changeInput(true, "practice",index)} className="close-botton">返回</Button>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        })
                                    }
                                    {
                                        /*判断是否处于新增状态*/
                                        this.state.addPractice?<div className="self-assessment-input input-border self-assessment-input-disabled">
                                            <div>
                                                <RangePicker
                                                    placeholder={['开始时间', '结束时间']}
                                                    format="YYYY年MM月"
                                                    value={this.state.addPractice[0]?[
                                                        moment(this.state.addPractice[0].split("-")[0],"YYYY-MM"),
                                                        moment(this.state.addPractice[0].split("-")[1],"YYYY-MM")
                                                    ]:[]}
                                                    mode={mode}
                                                    onPanelChange={(value, mode)=>{
                                                        this.handlePanelChange(value,mode,"addPractice",-1)
                                                    }}
                                                />
                                                <Input onChange={(e)=>this.onChange(e,"addPractice",-1,1)} defaultValue={this.state.addPractice[1]?this.state.addPractice[1]:null} className="school-name" placeholder="学校名称"/>
                                                <Input onChange={(e)=>this.onChange(e,"addPractice",-1,2)} defaultValue={this.state.addPractice[2]?this.state.addPractice[2]:null} className="school-name" placeholder="实践名称"/>
                                            </div>
                                            <TextArea
                                                defaultValue={this.state.addPractice[3]?this.state.addPractice[3]:null}
                                                placeholder={"专业技能描述：描述出个人目前掌握的技能，包括但不限于专业所学" +
                                                "、办公软件掌握以及其他与求职岗位相关之素养（如：英语水平、获奖经历）"}
                                                autosize={{minRows: 3}}
                                            />
                                                    <div className="input-button">
                                                        <Button onClick={()=>this.updateInfo("addPractice",true)}>保存</Button>
                                                        <Button onClick={()=>this.updateInfo("addPractice",false)} className="close-botton">返回</Button>
                                                    </div>
                                        </div>:null
                                    }
                                </div>
                            </div>
                            {/*教育背景框*/}
                            <div className="self-assessment school-practice">
                                <div className="self-assessment-info">
                                    <h3>教育背景</h3><span onClick={()=>this.add("eduBack")} className="new-add">+新增教育背景</span>
                                    {
                                        this.state.educationBack.map((item, index)=>{
                                            return <div  key={index} className={this.state.eduBack[index]?"self-assessment-input":"self-assessment-input input-border self-assessment-input-disabled"}>
                                                {
                                                    /*判断第几条数据是否是出于输入状态，每一种情况下只能修改一条数据，但是可以同时新增加修改*/
                                                    this.state.eduBack[index]?
                                                        <div>
                                                            <Icon type="form" theme="outlined" onClick={() => this.changeInput(false, "eduBack",index)}/>
                                                            <Icon type="delete" theme="outlined" onClick={() => this.delete("educationBack",index)}/>
                                                            <div>
                                                                <span>{this.state.educationBack[index][0]}</span><Divider type="vertical" />
                                                                <span>{this.state.educationBack[index][1]}</span><Divider type="vertical" />
                                                                <span>{this.state.educationBack[index][2]}</span><Divider type="vertical" />
                                                                <span>{this.state.educationBack[index][3]}</span>
                                                            </div>
                                                        </div> :<div>
                                                            <RangePicker
                                                                placeholder={['开始时间', '结束时间']}
                                                                format="YYYY年MM月"
                                                                value={[
                                                                    moment(this.state.educationBack[index][0].split("-")[0],"YYYY-MM"),
                                                                    moment(this.state.educationBack[index][0].split("-")[1],"YYYY-MM")
                                                                ]}
                                                                mode={mode}
                                                                onPanelChange={(value, mode)=>{
                                                                    this.handlePanelChange(value,mode,"educationBack",index)
                                                                }}
                                                            />
                                                            <Input onChange={(e)=>this.onChange(e,"educationBack",index,1)} defaultValue={this.state.educationBack[index][1]} className="school-name" placeholder="学校名称"/>
                                                            <Input onChange={(e)=>this.onChange(e,"educationBack",index,2)} defaultValue={this.state.educationBack[index][2]} className="school-name" placeholder="专业名称"/>
                                                            <Input onChange={(e)=>this.onChange(e,"educationBack",index,3)} defaultValue={this.state.educationBack[index][3]} className="school-name school-name1" placeholder="本科（统招）"/>
                                                            <div className="input-button">
                                                                <Button onClick={()=>this.updateInfo("educationBack",true)}>保存</Button>
                                                                <Button onClick={()=>this.changeInput(true, "eduBack",index)} className="close-botton">返回</Button>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        })
                                    }
                                    {
                                        //判断是否处于新增框打开状态
                                        this.state.addEduBack?<div className="self-assessment-input input-border self-assessment-input-disabled">
                                                    <div>
                                                        <RangePicker
                                                            placeholder={['开始时间', '结束时间']}
                                                            format="YYYY年MM月"
                                                            value={this.state.addEduBack[0]?[
                                                                moment(this.state.addEduBack[0]?this.state.addEduBack[0].split("-")[0]:date,"YYYY-MM"),
                                                                moment(this.state.addEduBack[0]?this.state.addEduBack[0].split("-")[1]:date,"YYYY-MM")
                                                            ]:[]}
                                                            mode={mode}
                                                            onPanelChange={(value, mode)=>{
                                                                this.handlePanelChange(value,mode,"addEduBack",0)
                                                            }}
                                                        />
                                                        <Input onChange={(e)=>this.onChange(e,"addEduBack",-1,1)} className="school-name" placeholder="学校名称"/>
                                                        <Input onChange={(e)=>this.onChange(e,"addEduBack",-1,2)} className="school-name" placeholder="专业名称"/>
                                                        <Input onChange={(e)=>this.onChange(e,"addEduBack",-1,3)} className="school-name school-name1" placeholder="本科（统招）"/>
                                                    </div>
                                            <div className="input-button">
                                                <Button onClick={()=>this.updateInfo("addEduBack",true)}>保存</Button>
                                                <Button onClick={()=>this.updateInfo("addEduBack",false)} className="close-botton">返回</Button>
                                            </div>
                                        </div>:null
                                    }
                                </div>
                            </div>
                            {/*项目经验框*/}
                            <div className="self-assessment school-practice">
                                <div className="self-assessment-info">
                                    <h3>项目经验</h3><span onClick={()=>this.add("project")} className="new-add">+新增项目经验</span>
                                    {
                                        this.state.projectExp.map((item, index)=>{
                                            return <div  key={index} className={this.state.project[index]?"self-assessment-input":"self-assessment-input input-border self-assessment-input-disabled"}>
                                                {
                                                    /*判断第几条数据是否是出于输入状态，每一种情况下只能修改一条数据，但是可以同时新增加修改*/
                                                    this.state.project[index]?
                                                        <div>
                                                            <Icon type="form" theme="outlined" onClick={() => this.changeInput(false, "project",index)}/>
                                                            <Icon type="delete" theme="outlined" onClick={() => this.delete("projectExp",index)}/>
                                                            <div>
                                                                {
                                                                    projectExp.map((item ,index2) => {
                                                                        return <div key={index2}>
                                                                            <span>{item.name}：</span><span>{this.state.projectExp[index][index2]}</span>
                                                                        </div>
                                                                    })
                                                                }
                                                            </div>
                                                        </div> :<div>
                                                            <RangePicker
                                                                placeholder={['开始时间', '结束时间']}
                                                                format="YYYY年MM月"
                                                                value={this.state.projectExp[index][0]?[
                                                                    moment(this.state.projectExp[index][0].split("-")[0],"YYYY-MM"),
                                                                    moment(this.state.projectExp[index][0].split("-")[1],"YYYY-MM")
                                                                ]:[]}
                                                                mode={mode}
                                                                onPanelChange={(value, mode)=>{
                                                                    this.handlePanelChange(value,mode,"projectExp",index)
                                                                }}
                                                            />
                                                            <Input onChange={(e)=>this.onChange(e,"projectExp",index,1)} defaultValue={this.state.projectExp[index][1]} placeholder="项目名称"/>
                                                            <InputNumber onChange={(value)=>this.getNum(value,"projectExp",index,2)} defaultValue={this.state.projectExp[index][2]} placeholder="项目人数" />
                                                            <Input onChange={(e)=>this.onChange(e,"projectExp",index,3)} defaultValue={this.state.projectExp[index][3]} placeholder="项目职务"/>
                                                            <TextArea autosize={{minRows: 3}} onChange={(e)=>this.onChange(e,"projectExp",index,4)} defaultValue={this.state.projectExp[index][4]} placeholder="项目简介"/>
                                                            <TextArea autosize={{minRows: 3}} onChange={(e)=>this.onChange(e,"projectExp",index,5)} defaultValue={this.state.projectExp[index][5]} placeholder="责任描述"/>
                                                            <TextArea autosize={{minRows: 3}} onChange={(e)=>this.onChange(e,"projectExp",index,6)} defaultValue={this.state.projectExp[index][6]} placeholder="业绩描述"/>
                                                            <div className="input-button">
                                                                <Button onClick={()=>this.updateInfo("projectExp",true)}>保存</Button>
                                                                <Button onClick={()=>this.changeInput(true, "project",index)} className="close-botton">返回</Button>
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        })
                                    }
                                    {
                                        //新增项目框
                                        this.state.addProjectExp?<div className="self-assessment-input input-border self-assessment-input-disabled">
                                            <div>
                                                <RangePicker
                                                    placeholder={['开始时间', '结束时间']}
                                                    format="YYYY年MM月"
                                                    value={this.state.addProjectExp[0]?[
                                                        moment(this.state.addProjectExp[0]?this.state.addProjectExp[0].split("-")[0]:date,"YYYY-MM"),
                                                        moment(this.state.addProjectExp[0]?this.state.addProjectExp[0].split("-")[1]:date,"YYYY-MM")
                                                    ]:[]}
                                                    mode={mode}
                                                    onPanelChange={(value, mode)=>{
                                                        this.handlePanelChange(value,mode,"addProjectExp",-1)
                                                    }}
                                                />
                                                <Input onChange={(e)=>this.onChange(e,"addProjectExp",-1,1)} defaultValue={this.state.addProjectExp[1]||null} placeholder="项目名称"/>
                                                <InputNumber onChange={(value)=>this.getNum(value,"addProjectExp",-1,2)} defaultValue={this.state.addProjectExp[2]||null} placeholder="项目人数" />
                                                <Input onChange={(e)=>this.onChange(e,"addProjectExp",-1,3)} defaultValue={this.state.addProjectExp[3]||null} placeholder="项目职务"/>
                                                <TextArea autosize={{minRows: 3}} onChange={(e)=>this.onChange(e,"addProjectExp",-1,4)} defaultValue={this.state.addProjectExp[4]||null} placeholder="项目简介"/>
                                                <TextArea autosize={{minRows: 3}} onChange={(e)=>this.onChange(e,"addProjectExp",-1,5)} defaultValue={this.state.addProjectExp[5]||null} placeholder="责任描述"/>
                                                <TextArea autosize={{minRows: 3}} onChange={(e)=>this.onChange(e,"addProjectExp",-1,6)} defaultValue={this.state.addProjectExp[6]||null} placeholder="业绩描述"/>
                                            </div>
                                            <div className="input-button">
                                                <Button onClick={()=>this.updateInfo("addProjectExp",true)}>保存</Button>
                                                <Button onClick={()=>this.updateInfo("addProjectExp",false)} className="close-botton">返回</Button>
                                            </div>
                                        </div>:null
                                    }
                                </div>
                            </div>
                            <div className="self-assessment">
                                <div className="self-assessment-info">
                                    <h3>技能图</h3>
                                    <p>系统测评后自动生成</p>
                                </div>
                            </div>
                        </div>
                        :<span>loading...</span>
                }
            </div>
        )
    }
  }

  export default OnlineResume