import React from "react"
import { Icon, Button, Row, Col, DatePicker } from "antd"
import moment from "moment";

const { RangePicker } = DatePicker;
class MyService extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="my-service-wrap">
                <div className="my-service-header">
                    <Icon type="left" theme="outlined" />
                    <p>我的客服</p>
                    <Icon type="sync" theme="outlined" />
                </div>
            </div>
        )
    }
}

export default MyService