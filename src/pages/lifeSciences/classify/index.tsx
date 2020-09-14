import React, { useState, useEffect } from 'react';
import { Tabs, Table, Switch, Space, Button } from 'antd';
import apiList from '@/request/api.js'
import CreatTag from './components/creatTag'
const { TabPane } = Tabs;
interface Form {
  name: string,
  description: string,
  id: string
}
export default function Index() {
  const [tableData, setTableData] = useState([{}])
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Form>({ name: '', description: '', id: '' });
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

  const data = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   onSelect: (record, selected, selectedRows) => {
  //     console.log(record, selected, selectedRows);
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     console.log(selected, selectedRows, changeRows);
  //   },
  // };
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

  const callback = key => {
    console.log(key);
  }

  const getModalStatus = (val: boolean) => {
    setShowModal(false)
    // val && getList(page)
  }
  const ediet = (val: number, row?: any) => {
    if (val == 1) setFormData({ name: '', description: '', id: '' })
    if (val == 2) setFormData({ name: row.name, description: row.description, id: row.id })
    setShowModal(true)
  }
  return <div>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="文档分类" key="1">
        <Table
          columns={columns}

          dataSource={tableData}
          rowKey={record => record.id + ""}
        />
      </TabPane>
      <TabPane tab="专题分类" key="2">
        专题分类
  </TabPane>

    </Tabs>
    <CreatTag showModal={showModal} formData={formData} emit={getModalStatus} />
  </div>
}