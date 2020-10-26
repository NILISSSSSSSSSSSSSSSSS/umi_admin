import React, { useState, useEffect } from 'react'
import { Modal, Input, Form, message, Cascader } from 'antd';
import apiList from '@/request/api.js'
import { FormData } from '../interface.d';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
interface CreatProps {
  showModal: boolean,
  activeIndex: string,
  formData: FormData,
  tableData: any,
  emit: (v: boolean) => void
}
export default function Index(props: CreatProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //如果是关闭弹框,则清空值
    if (!props.showModal) {
      resetForm()
    }
    //如果是打开,则赋值
    else {
      if (props.showModal) form.setFieldsValue(props.formData)
    }
  }, [props.showModal])
  //提交表单
  const handleOk = () => {
    form.validateFields().then(v => {
      console.log(v)
      let api = ''
      let tip = ""
      let param: any = { name: v.name, description: v.description, parent_id: v.allId[0], sort: v.sort }
      if (props.formData.id) {
        api = props.activeIndex === '1' ? 'updateDocxClass' : 'updateTheam'
        tip = '修改成功'
        param.id = props.formData.id
      }
      else {
        api = props.activeIndex === '1' ? 'createDocxClass' : 'createTheam'
        tip = '新增成功'
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
    console.info(form)
    form.setFieldsValue({
      name: '',
      description: '',
      parent_id: '',
      allId: [],
      sort: '',
      id: '',
    })
  }
  const handleCancel = () => {
    props.emit(false)
  }


  const onChange = (value: any) => {
    console.log(value)
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
        forceRender
      >
        <Form {...layout} form={form} name="control-hooks" >
          <Form.Item initialValue={props.formData.allId} name="allId" label="父级分类" rules={[{ required: true, message: '请填写父级分类' }]}>
            <Cascader fieldNames={{ label: 'name', value: 'id' }} options={props.tableData} onChange={onChange} changeOnSelect />
          </Form.Item>
          <Form.Item initialValue={props.formData.name} name="name" label="名称" rules={[{ required: true, message: '请填写名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item initialValue={props.formData.description} name="description" label="描述" rules={[{ required: true, message: '请填写描述' }]}>
            <Input />
          </Form.Item>
          <Form.Item initialValue={props.formData.sort} name="sort" label="排序" rules={[{ required: true, message: '请填写排序' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}