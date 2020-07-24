import { Input, Button, Table, Pagination } from 'antd';
import React, { useState, useEffect } from 'react'
import apiList from '@/request/api.js'
interface Form {
  name: String,
}
export default function Index(props: any) {
  const [filterData, setFilterData] = useState({ name: '' })
  const [tableData, setTableData] = useState([{}])
  const [page, setPage] = useState({
    page: 1,
    per_page: 10,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  // 选择搜索条件
  const handleInput = (event: any) => {
    event.persist()
    setFilterData((prevState) => ({
      ...prevState,
      name: event.target.value
    }
    ))
  }
  const changePage = (cc: number) => {
    setPage((prevState) => ({
      ...prevState,
      page: cc,
    }
    ))
  }
  const changeSize = (current: number, pageSize: number) => {
    setPage((pre) => (
      {
        ...pre,
        per_page: pageSize
      }
    ))
  }
  // 获取表格数据
  useEffect(() => {
    getList()
  }, [page.page, page.per_page, filterData.name])
  const getList = () => {
    setLoading(true)
    let param = {
      ...filterData,
      page: page.page,
      per_page: page.per_page
    }
    for (const item in param) { // 如果没有值则删除字段
      if (!param[item] && param[item] !== 0) {
        delete param[item]
      }
    }
    console.log(filterData)
    apiList.getTagList(param).then(({ data, meta }) => {
      setLoading(false)
      setTableData(data)
      setPage((prevState) => ({
        ...prevState,
        total: meta.pagination.total
      }
      ))
      console.log(page)
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
      render: () => {
        return (
          <div>
            <Button
              type="primary" className="mr7" >
              编辑
          </Button>
            <Button
              type="primary" danger>
              删除
          </Button>
          </div>
        )
      }
    }
  ]
  return <div>
    <div className='tableSearch'>
      <div className='tableSearchForm'>
        <Input placeholder="标签名称" onChange={handleInput} />
        <Button type="primary" className='search'>搜索</Button>
      </div>
      <div className="tableSearchCreat">
        <Button type="primary" className='creat'>创建标签</Button>
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
        rowKey={(record, index) => index}
      />
      <Pagination
        total={page.total}
        showTotal={total => `共 ${total} 条`}
        defaultPageSize={page.per_page}
        defaultCurrent={page.page}
        onChange={changePage}
        onShowSizeChange={changeSize}
      />
    </div>

  </div>
}