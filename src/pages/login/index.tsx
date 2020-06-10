import React from 'react'
import { history } from 'umi';
import { Form, Input, Button, message } from 'antd';
import apiList from '../../request/api'
import { setToken } from '@/utils/token'
const { Item } = Form
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class Login extends React.Component {
  formRef = React.createRef();
  onFinish = (values: any) => {
    console.log(values);
    const param = {
      username: values.userName,
      password: values.pass
    }
    console.log(param)
    apiList.loginByPassword(param).then((data) => {
      console.log(data)
      setToken('Auth-Token', data.access_token)
      history.push('/company')
    }).catch((err) => {
      message.error(err.message)
    })
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };
  checkUser = (rule, value, callback) => {
    if (!value && value !== 0) {
      return Promise.reject('不能为空');
    }
    if (value.length > 9) {
      return Promise.reject('不能大于9');
    }
    else {
      return Promise.resolve();
    }

  };
  checkConfirmPass = (rule, value, callback) => {
    let newPass = this.formRef.current.getFieldValue('pass');
    console.log(this.formRef.current.getFieldValue('pass'))
    if (!value && value !== 0) {
      return Promise.reject('密码不能为空');
    }
    if (value !== newPass) {
      return Promise.reject('必须等于输入的密码');
    }
    else {
      return Promise.resolve();
    }

  };
  render() {
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} >
        <Item name="userName" label="用户名" rules={
          [
            { required: true, validator: this.checkUser, trigger: 'blur' }
          ]}
        >
          <Input />
          < /Item>
          < Item
            name="pass"
            label="密码"
            rules={
              [
                {
                  required: true, message: '请输入密码',
                },
              ]}
          >
            <Input.Password />
            < /Item>

      < Item
              name="confirmPass"
              label="确认密码"
              rules={
                [
                  { required: true, validator: this.checkConfirmPass, trigger: 'blur' }
                ]}
            >
              <Input />
              < /Item>

      < Item {...tailLayout}>
                <Button type="primary" htmlType="submit" >
                  Submit
          < /Button>
          < Button htmlType="button" onClick={this.onReset} >
                    Reset
            < /Button>

            < /Item>
            < /Form>
    );
  }
}

export default Login
