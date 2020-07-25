import { Input, Button, Table, Pagination, Popconfirm, message, Menu, Dropdown, Breadcrumb } from 'antd';
import React, { useState, useEffect } from 'react'
import CreatTag from './components/creatTag'
import apiList from '@/request/api.js'
interface Form {
  name: string,
  description: string,
  id: string
}
export default function Index(props: any) {
  const [filterData, setFilterData] = useState({ name: '' })
  const [tableData, setTableData] = useState([{}])
  const [page, setPage] = useState({
    page: 1,
    per_page: 10,
  })
  const [total, setTotal] = useState(1); // 页码
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Form>({ name: '', description: '', id: '' });
  // 选择搜索条件
  const handleInput = (event: any) => {
    event.persist()
    setFilterData((prevState) => ({
      ...prevState,
      name: event.target.value
    }
    ))

  }
  const changePage = (current: number, pageSize: any) => {
    setPage((prevState) => ({
      ...prevState,
      page: current,
    }
    ))
    getList({ page: current, per_page: pageSize })
  }
  const changeSize = (current: number, pageSize: any) => {
    setPage((pre) => (
      {
        ...pre,
        per_page: pageSize
      }
    ))
    getList({ page: current, per_page: pageSize })
  }
  const searchCom = () => {
    setPage({
      page: 1,
      per_page: 10,
    })
    getList({
      page: 1,
      per_page: 10, ...filterData
    })
  }
  const ediet = (val: number, row?: any) => {
    if (val == 1) setFormData({ name: '', description: '', id: '' })
    if (val == 2) setFormData({ name: row.name, description: row.description, id: row.id })
    setShowModal(true)
  }
  const del = (id: number) => {
    apiList['deleteTags']({ id: id }).then(() => {
      message.success('删除成功')
      getList(page)
    }).catch(err => {
      message.error(err.data.message)
    })
  }
  const getModalStatus = (val: boolean) => {
    setShowModal(false)
    val && getList(page)
  }
  // 获取表格数据
  useEffect(() => {
    getList(page)
  }, [])
  const getList = (data) => {
    for (const item in data) { // 如果没有值则删除字段
      if (!data[item] && data[item] !== 0) {
        delete data[item]
      }
    }
    setLoading(true)
    apiList.getTagList(data).then(({ data, meta }) => {
      setLoading(false)
      setTableData(data)
      setTotal(meta.pagination.total)
    }).catch((err: any) => {
      console.log(err)
      setLoading(false)
    })
  }
  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '热度',
      dataIndex: 'doc_view',
      width: 180,
    },
    {
      title: '引用数量',
      dataIndex: 'doc_count',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
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
            <Popconfirm placement="top" title="确认删除吗" onConfirm={() => { del(record.id) }} okText="Yes" cancelText="No">
              <Button
                type="primary" danger>
                删除
          </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return <div>
    <div className='tableSearch'>
      <div className='tableSearchForm'>
        <Input placeholder="标签名称" onChange={handleInput} />
        <Button type="primary" className='search' onClick={searchCom}>搜索</Button>
      </div>
      <div className="tableSearchCreat">
        <Button type="primary" className='creat' onClick={() => ediet(1)}>创建标签</Button>
      </div>
    </div>
    <div className='tableCommon'>
      <Table
        bordered
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={loading}
        scroll={{ x: 1000, }}
        rowKey={(record, index) => index + ""}
      />
      <Pagination
        total={total}
        showTotal={total => `共 ${total} 条`}
        defaultPageSize={page.per_page}
        defaultCurrent={page.page}
        onChange={changePage}
        onShowSizeChange={changeSize}
      />
    </div>
    <CreatTag showModal={showModal} formData={formData} emit={getModalStatus} />
  </div>
}