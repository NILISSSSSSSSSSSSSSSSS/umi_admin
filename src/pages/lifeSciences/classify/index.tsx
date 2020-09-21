import React, { useState, useEffect } from 'react';
import { Tabs, Table, Switch, Space, Button } from 'antd';
import apiList from '@/request/api.js'
import CreatTag from './components/creatTag'
import { FormData } from './interface.d';
const { TabPane } = Tabs;

export default function Index() {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '文档数量',
      dataIndex: 'doc_count',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: '413',
      render: (text: string | number, record: any) => {
        return (
          <div>
            <Button
              type="primary" className="mr7" onClick={() => ediet(2, record)}>
              编辑
        </Button>
          </div>
        )
      }
    },
  ];
  // 获取表格数据
  useEffect(() => {
    getList()
  }, [])
  const getList = () => {
    setLoading(true)
    apiList.getDocxList().then(({ data, meta }) => {
      console.log(data)
      setLoading(false)
      setTableData(data)
    }).catch(_ => {
      setLoading(false)
    })
  }
  const callback = (key: string): void => {
    console.log(key);
  }
  const getModalStatus = (val: boolean): void => {
    setShowModal(false)
    // val && getList()
  }
  const ediet = (val: number, row?: any) => {
    if (val == 2) setFormData({ name: row.name, description: row.description, id: row.id, parent_id: row.parent_id, sort: row.sort })
    setShowModal(true)
  }
  return <div>
    <div className='tableSearch'>
      <div className="tableSearchCreat">
        <Button type="primary" className='creat' onClick={() => ediet(1)}>创建分类</Button>
      </div>
    </div>
    <Tabs defaultActiveKey="1" onChange={e => { callback(e) }}>
      <TabPane tab="文档分类" key="1">
        <Table
          columns={columns}
          loading={loading}
          dataSource={tableData}
          rowKey={record => record.id + ""}
        />
      </TabPane>
      <TabPane tab="专题分类" key="2">
        专题分类
  </TabPane>

    </Tabs>
    <CreatTag showModal={showModal} formData={formData} tableData={tableData} emit={getModalStatus} />
  </div>
}