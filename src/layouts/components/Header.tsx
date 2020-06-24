import React, { useState } from 'react';
import { Menu, Dropdown, Breadcrumb } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './header.less'
export default function Index() {
  const [current, setCurrent] = useState('mail');
  const menu = (
    <Menu>
      <Menu.Item>
        退出
      </Menu.Item>
    </Menu>
  );
  return <div className={styles.headerWrapper}>
    <Breadcrumb separator=">" className={styles.breadWrapper}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item >Application Center</Breadcrumb.Item>
      <Breadcrumb.Item>Application List</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
    <div className={styles.userInfo}>
      <Dropdown overlay={menu}>
        <span className="ant-dropdown-link" >
          Hover me <DownOutlined />
        </span>
      </Dropdown>
    </div>
  </div>
}