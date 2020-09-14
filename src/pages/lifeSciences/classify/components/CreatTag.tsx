import React, { useState, useEffect } from 'react'
import { Modal, Input, Form, message } from 'antd';
import apiList from '@/request/api.js'
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
interface CreatProps {
  showModal: boolean,
  formData: {
    name: string,
    description: string,
    id: string
  },
  emit: (v: boolean) => void
}
export default function Index(props: CreatProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    //如果是关闭弹框,则清空值
    if (!props.showModal && props.formData.id) {
      resetForm()
    }
    //如果是打开,则赋值
    else {
      form.setFieldsValue(props.formData)
    }
  }, [props.showModal])
  //提交表单
  const handleOk = () => {
    form.validateFields().then(v => {
      let api = ''
      let tip = ""
      let param: any = { name: v.name, description: v.description }
      if (props.formData.id) {
        [api, tip] = ['updateTags', '修改成功']
        param.id = props.formData.id
      }
      else {
        [api, tip] = ['addTags', '新增成功']
      }
      setLoading(true)
      apiList[api](param).then(() => {
        message.success(tip)
        props.emit(true)
        setLoading(false)
      }).catch(err => {
        message.error(err.data.message)
        setLoading(false)
      })
    })
  }
  // 重置表单
  const resetForm = () => {
    form.setFieldsValue({
      name: '',
      description: '',
      id: ''
    })
  }
  const handleCancel = () => {
    props.emit(false)
  }
  const title = props.formData.id ? '编辑分类' : '创建分类'
  return (
    <div>
      <Modal
        title={title}
        visible={props.showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText='确定'
        cancelText="取消"
        className="commonModal"
      >
        <Form {...layout} form={form} name="control-hooks" >
          <Form.Item initialValue={props.formData.name} name="name" label="名称" rules={[{ required: true, message: '请填写名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item initialValue={props.formData.description} name="description" label="描述" rules={[{ required: true, message: '请填写描述' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}