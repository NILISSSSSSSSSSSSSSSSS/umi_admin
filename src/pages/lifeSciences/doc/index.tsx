import { Select, Cascader, Tag, DatePicker, Input, Button, Table, Pagination, message, Modal } from 'antd';
import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { FormData } from './interface.d';
// import CreatTag from './components/creatTag'
import styles from './index.less'
import apiList from '@/request/api.js'
const { Option } = Select;
export default function Index(props: any) {
  const uploadRef = useRef<HTMLInputElement | null>(null)
  const [filterData, setFilterData] = useState({ type_id: [], price: [], extension_type: '', tag: '', title: '', created_date: '' })
  const [categoryTreeList, setCategoryTreeList] = useState([])
  const [tableData, setTableData] = useState([])
  const [page, setPage] = useState({
    page: 1,
    per_page: 10,
  })
  const [total, setTotal] = useState(1); // 页码
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [docObj, setDocObj] = useState({ showModal: false, loading: false });
  // 选择搜索条件
  const handleInput = (event: any, field: string) => {
    console.log(event, field)
    event.persist()
    const neeData = { ...filterData }
    neeData[field] = event.target.value
    setFilterData(neeData)

  }
  const handleChange = (val: any, field: string) => {

    const neeData = { ...filterData }
    neeData[field] = field === 'created_date' && val ? moment(val).format('YYYY-MM-DD') : val
    setFilterData(neeData)

  }
  const changePage = (current: number, pageSize: number) => {
    setPage((prevState) => ({
      ...prevState,
      page: current,
    }
    ))
    getList({ page: current, per_page: pageSize })
  }
  const changeSize = (current: number, pageSize: number) => {
    setPage((pre) => (
      {
        ...pre,
        per_page: pageSize
      }
    ))
    getList({ page: current, per_page: pageSize })
  }
  const searchCom = () => {
    console.log(filterData)
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
    if (val == 1) {
      // setFormData({ name: '', description: '', id: '' })
      setDocObj({ showModal: true, loading: false })
    }
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
  //上下架
  const handleShelf = (row: any) => {
    let cc
    if (row.on_sale === 0) {
      cc = 1;
    } else {
      cc = 0;
    }
    apiList.documenUpdate({ id: row.id, on_sale: cc }).then(res => {
      getList(filterData)
    })
  }
  // 获取表格数据
  useEffect(() => {
    getList(page)
    getDocList()
  }, [])
  // 分类列表
  const getDocList = () => {
    apiList.gettDocCategory().then(({ data }) => {
      setCategoryTreeList(data)
    })
  }
  const getList = (data: any) => {
    if (data.type_id) {
      data.category_id = data.type_id[data.type_id.length - 1]
      delete data['type_id']
    }
    for (const item in data) { // 如果没有值则删除字段
      if (!data[item] && data[item] !== 0) {
        delete data[item]
      }
    }
    setLoading(true)
    apiList.documentList(data).then(({ data, meta }) => {
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
      title: '文档名称',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: '分类',
      dataIndex: 'category_name',
      width: 180,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (text) => {
        return (
          <div>
            {text.map((item: number | undefined, index: number) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </div>
        )
      }
    },
    {
      title: '价格(元)',
      dataIndex: 'price_by_yuan',
    },

    {
      title: '总页数',
      dataIndex: 'total_page',
      width: 200,
    },
    {
      title: '免费页数',
      dataIndex: 'free_page_count',
      width: 180,
    },
    {
      title: '购买量',
      dataIndex: 'buy_count',
    },
    {
      title: '浏览量',
      dataIndex: 'view',
    },

    {
      title: '下载量',
      dataIndex: 'download',
    },
    {
      title: '文档类型',
      dataIndex: 'extension_type_txt',
    },
    {
      title: '上传时间',
      dataIndex: 'created_date',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 250,
      fixed: 'right',
      render: (text: string | number, record: any) => {
        return (
          <div>
            <a target="_blank" href={process.env.REACT_APP_DOC_PREVIEW + '/docDetail/nomal/' + record.id} >
              <Button
                type="primary" className="mr7" >
                预览
             </Button>
            </a>
            <Button
              type="primary" className="mr7" onClick={() => ediet(record)}>
              编辑
          </Button>
            {record.on_sale
              ? <Button
                type="primary" className="mr7" onClick={() => handleShelf(record)} >
                上架
                </Button>
              : <Button
                type="primary" danger className="mr7" onClick={() => handleShelf(record)} >
                下架
            </Button>
            }
          </div>
        )
      }
    }
  ]
  const typeArray = [{ // 搜索框文档类型
    id: 'doc',
    name: 'DOC'
  }, {
    id: 'pdf',
    name: 'PDF'
  }, {
    id: 'ppt',
    name: 'PPT'
  }, {
    id: 'xls',
    name: 'XLS'
  }]
  // 上传文档弹框
  const handleCancel = () => {
    setDocObj(Object.assign({}, docObj, { showModal: false }))
  }
  const changeFile = () => {
    uploadRef.current!.click();
  }
  const dealFile = (e: any) => {
    const file = e.target.files[0]
    const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    const isLt2M = file.size / 1024 / 1024 < 50
    if (!['doc', 'docx', 'pdf', 'ppt', 'pptx', 'xls', 'xlsx'].includes(testmsg)) {
      message.error('上传的文件只能是 doc docx pdf ppt pptx xls xlsx 格式')
      return false
    }
    if (!isLt2M) {
      message.error('上传文件大小不能超过 50MB')
      return false
    }

    // const param = new FormData()
    // param.append('file', file)
    // param.append('project', 'JS_ADMIN')
  }
  return <div>
    <div className='tableSearch'>
      <div className='tableSearchForm'>
        <Cascader fieldNames={{ label: 'name', value: 'id' }} placeholder="分类" options={categoryTreeList} onChange={(val) => { handleChange(val, 'type_id') }} changeOnSelect />
        <Select placeholder="价格" onChange={(val) => { handleChange(val, 'is_free') }}>
          <Option value="1">免费</Option>
          <Option value="0">付费</Option>
        </Select>
        <Select placeholder="文档类型" onChange={(val) => { handleChange(val, 'extension_type') }}>
          {
            typeArray.map((item, index) => {
              return <Option key={index} value={item.id}>{item.name}</Option>
            })
          }
        </Select>
        <Input placeholder="标签" onChange={(val) => { handleInput(val, 'tag') }} />
        <Input placeholder="文档名称" onChange={(val) => { handleInput(val, 'title') }} />
        <DatePicker onChange={(val) => { handleChange(val, 'created_date') }} />
        <Button type="primary" className='search' onClick={searchCom}>搜索</Button>
      </div>
      <div className="tableSearchCreat">
        <Button type="primary" className='creat' onClick={() => ediet(1)}>上传文档
        </Button>
      </div>
    </div>
    <div className='tableCommon'>
      <Table
        bordered
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={loading}
        scroll={{ x: 500, y: 590 }}
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
    {/* <CreatTag showModal={showModal} formData={formData} emit={getModalStatus} /> */}
    {/* 上传文档弹框 */}
    <Modal
      title="上传文档"
      visible={docObj.showModal}
      onCancel={handleCancel}
      okText='确定'
      cancelText="取消"
      className={'commonModal ' + styles.docModal}

    >
      <input type="file" ref={uploadRef} onChange={dealFile} style={{ display: "none" }} />
      <Button type="primary" onClick={changeFile}>选择文档</Button>
    </Modal>
  </div>
}