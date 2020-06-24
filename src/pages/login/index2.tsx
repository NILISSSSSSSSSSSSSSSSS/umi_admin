import React, { useState } from "react"
import { history } from 'umi';
import { Form, Input, Button, message } from 'antd';
import apiList from '@/request/api.js'
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

export default function Login() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    const param = {
      username: values.userName,
      password: values.pass
    }
    apiList.loginByPassword(param).then((data: any) => {
      console.log(data)
      setToken('Auth-Token', data.access_token)
      history.push('/company')
    }).catch((err: any) => {
      message.error(err.message)
    })
  };
  const onReset = () => {
    form.resetFields();
  };
  const checkUser = (rule: any, value: any, callback: any) => {
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
  const checkConfirmPass = (rule: any, value: any, callback: any) => {
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

  return (

    <Form  {...layout}
      form={form}
      name="basic" onFinish={onFinish}>
      <Item name="userName" label="用户名" rules={
        [
          { required: true, validator: checkUser, trigger: 'blur' }
        ]}
      >
        <Input />
      </Item>
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
      </Item>

      < Item
        name="confirmPass"
        label="确认密码"
        rules={
          [
            { required: true, validator: checkConfirmPass, trigger: 'blur' }
          ]}
      >
        <Input />
      </Item>

      < Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          登录
         </Button>
        < Button htmlType="button" onClick={onReset} >
          重置
          </Button>

      </Item>
    </Form>
  )
}