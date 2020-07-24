import React, { useEffect, useState } from 'react';
import { Menu, Button } from 'antd';
import { history } from 'umi';
import styles from './left.less'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
export default function Index() {
  const [inlineCollapsed, setInlineCollapsed] = useState(false)
  return (
    <div className={styles.leftMenuWrapper}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={inlineCollapsed}
      >
        {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item> */}
        <SubMenu key="sub1" icon={<MailOutlined />} title="生命科学情报">
          <Menu.Item key="5" onClick={() => history.push('/tags')}>标签管理
          </Menu.Item>
          <Menu.Item key="6" onClick={() => history.push('/classify')}>分类管理
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div >
  );
}