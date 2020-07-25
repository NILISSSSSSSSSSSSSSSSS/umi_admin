import React from "react"
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import { DownOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Left from './components/Left';
import styles from './main.less'
export default function Index(props: any) {
  const Header = function (hprop) {
    const breadcrumbs = hprop.routes;
    console.log(hprop)
    console.log(breadcrumbs)
    const menu = (
      <Menu>
        <Menu.Item>
          退出
        </Menu.Item>
      </Menu>
    );
    return <div className='headerWrapper'>
      <Breadcrumb separator=">" >
        {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item >Application Center</Breadcrumb.Item>
        <Breadcrumb.Item>Application List</Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
        {
          breadcrumbs.map(item => {
            return (
              <Breadcrumb.Item key={item.path}>{item.breadcrumb}</Breadcrumb.Item>
            )
          })
        }
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