import React , { Component } from 'react';
import { Form, Icon, Input, Button ,message } from 'antd';
import * as myFetch from '../../config/myFetch';
import { hashHistory } from 'react-router'; 
const FormItem = Form.Item;

class FormData extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
            myFetch.post('/site/login',{
                username : values.userName ,
                password : values.password,
                type : 2, //物业
            }).then(res => {
                if(res.code === 200 ){
                    message.success('登录成功!');
                    sessionStorage.setItem('token',res.data.token);//保存token
                    sessionStorage.setItem('activeName','newCompany');//保存导航logo的高亮
                    hashHistory.push('/app');
                }else{
                    message.error(res.message);
                }
            });
          }
        });
    }
    render (){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请填写用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入账号" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(FormData);

export default WrappedNormalLoginForm