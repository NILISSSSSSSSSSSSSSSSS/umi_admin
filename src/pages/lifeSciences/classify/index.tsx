import React, { useState, useEffect } from 'react';
import { Tabs, Table, Switch, Space, Button } from 'antd';
import apiList from '@/request/api.js'
import CreatTag from './components/creatTag'
import { FormData } from './interface.d';
const { TabPane } = Tabs;

export default function Index() {
  const [tableData, setTableData] = useState([])
  const [activeIndex, setActiveIndex] = useState('1')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const tabList = [
    {
      keys: '1',
      label: '文档分类'
    },
    {
      keys: '2',
      label: '专题分类'
    }
  ]
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
      title: activeIndex == '1' ? '文档数量' : '专题数量',
      dataIndex: activeIndex == '1' ? 'doc_count' : 'column_count',
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
  const getList = (activeIndex: string = '1') => {
    setLoading(true)
    let apiName = activeIndex === '1' ? 'getDocxList' : 'getTheamList'
    apiList[apiName]().then(({ data, meta }) => {
      console.log(data)
      setLoading(false)
      setTableData(data)
    }).catch(_ => {
      setTableData([])
      setLoading(false)
    })
  }
  const callback = (key: string): void => {
    setActiveIndex(key)
    console.log(key);
    getList(key)

  }
  const getModalStatus = (val: boolean): void => {
    setShowModal(false)
    val && getList(activeIndex)
  }
  const ediet = (val: number, row?: any) => {
    if (val == 2) setFormData({ name: row.name, description: row.description, id: row.id, parent_id: row.parent_id, allId: [...row.path_ids, row.id], sort: row.sort })
    setShowModal(true)
  }
  return <div>
    <div className='tableSearch'>
      <div className="tableSearchCreat">
        <Button type="primary" className='creat' onClick={() => ediet(1)}>创建分类</Button>
      </div>
    </div>
    <Tabs defaultActiveKey={activeIndex} onChange={e => { callback(e) }}>
      {tabList.map((item) => {
        return (
          <TabPane tab={item.label} key={item.keys} >
            <Table
              columns={columns}
              loading={loading}
              dataSource={tableData}
              rowKey={record => record.id + ""}
            />
          </TabPane>
        )
      })}
    </Tabs>
    <CreatTag showModal={showModal} activeIndex={activeIndex} formData={formData} tableData={tableData} emit={getModalStatus} />
  </div>
}