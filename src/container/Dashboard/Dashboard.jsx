import React from "react";
import { Route } from "react-router-dom";
import MyLoadingComponent from "~/components/common/loadComponents";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import "./Dashboard.less";
import 'moment/locale/zh-cn';
import Api from '~/until/api';
import {message} from "antd";
import {fetchPostsGetUser} from '~/action/getUserInfo';

const routes = [
    {
        path: "Index",
        component: Loadable({
            loader: () => import("~/container/Index/Index"),
            loading: MyLoadingComponent
        }),
        isExact: true
    },{
        path: "Register",
        component: Loadable({
            loader: () => import("~/container/Index/register"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "ForgetPwd",
        component: Loadable({
            loader: () => import("~/container/Index/ForgetPwd"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "Login",
        component: Loadable({
            loader: () => import("~/container/Index/Login"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "MyInfo",
        component: Loadable({
            loader: () => import("~/container/MyInfo/MyInfo"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "MyRight",
        component: Loadable({
            loader: () => import("~/container/Index/component/MyRight"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "MyDeal",
        component: Loadable({
            loader: () => import("~/container/Index/component/MyDeal"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "MyEntrust",
        component: Loadable({
            loader: () => import("~/container/Index/component/MyEntrust"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "MyService",
        component: Loadable({
            loader: () => import("~/container/Index/component/MyService"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "StockPage",
        component: Loadable({
            loader: () => import("~/container/StockPage/StockPage"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },{
        path: "ContractSearch",
        component: Loadable({
            loader: () => import("~/container/ContractSearch/ContractSearch"),
            loading: MyLoadingComponent
        }),
        isExact: false
    },
];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90,
            // isLogin:false,
        };
    }

    componentDidMount(){
        // Api.getUserInfo().then((res) => {
        //     console.log(res)
        // }).catch((err) => {
        //     console.log(err)
        //     window.location.href = "#/Dashboard/index"
        //     // message.error(err.msg);
        // })
    }


    handleData(data) {
        console.log(data)
        // if(data.){
        //
        // }
        // let result = JSON.parse(data);
        // this.setState({count: this.state.count + result.movement});
    }

    // getWebSocket(){
    //     let ws = new WebSocket("ws://www.10sgame.com:8282");
    //     ws.onopen = ()=>{
    //         let data = '{"type":"join_room","uid":1,"room_id":123456,"level_room":1}'
    //         ws.send(data)
    //     }
    //     ws.onmessage = (e)=>{
    //         let data = JSON.parse(e.data);
    //         let userData = data.data?JSON.parse(data.data):null
    //         let type = data.type || "";
    //         switch (type) {
    //             case "ping":
    //
    //                 break;
    //
    //             case 'active':
    //                 let user_data = JSON.parse(data.data);
    //
    //                 break;
    //
    //             case 'leave':
    //                 let user_datas = JSON.parse(data.data);
    //
    //                 break;
    //             default:
    //                 break;
    //         }
    //         console.log(data,userData)
    //     }
    // }

    render() {
        // this.getWebSocket();
        const { match } = this.props;
        const RouteWithSubRoutes = route => (
            <Route
                exact={route.isExact}
                path={`${match.url}/${route.path}`}
                render={props => <route.component {...props} routes={route.routes} />}
            />
        );
        // let val = sessionStorage.getItem("key");
        return (
            <div className="container">
                <div>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes isLogin={123} key={i} {...route} />
                    ))}
                </div>

                {/*<Websocket url='ws://www.10sgame.com:8282'*/}
                           {/*required={{"type":"join_room","uid":1,"room_id":123456,"level_room":1}}*/}
                           {/*OnOpen ={{"type":"join_room","uid":1,"room_id":123456,"level_room":1}}*/}
                           {/*onMessage={this.handleData.bind(this)}/>*/}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { getDictReducer } = state;
    return { getDictReducer };
};
export default connect(mapStateToProps)(Dashboard);
// export default Dashboard;
