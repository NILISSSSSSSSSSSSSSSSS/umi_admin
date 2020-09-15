import React from "react"
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import { DownOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useStore } from 'umi';
import Left from './components/Left';
import { loginOutClear } from '@/utils/tool';
import styles from './main.less'
export default function Index(props: any) {

  const Header = function (hprop) {
    const breadcrumbs = useBreadcrumbs(hprop.routes, { excludePaths: ['/'] });
    const store = useStore();
    const userInfo = store.getState().user.userInfo
    console.log(userInfo)
    const loginOut = _ => {
      loginOutClear()
    }
    const menu = (
      <Menu>
        <Menu.Item onClick={loginOut}>
          退出
        </Menu.Item>
      </Menu>
    );
    return <div className='headerWrapper'>
      <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
        {breadcrumbs.map(({
          match,
          breadcrumb
        }) => (
            <Breadcrumb.Item href="" key={match.url}> {breadcrumb}</Breadcrumb.Item>
          ))}
      </Breadcrumb>
      <div className={styles.userInfo}>
        <Dropdown overlay={menu}>
          <span className="ant-dropdown-link" >
            {userInfo.name} <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  }
  return <div className={styles.mainWrapper}>
    <div className={styles.left}>
      <Left />
    </div>
    <div className={styles.right}>
      <Header routes={props.route.routes} />
      <div style={{ padding: 20 }}>{props.children}</div>
    </div>
  </div>
}