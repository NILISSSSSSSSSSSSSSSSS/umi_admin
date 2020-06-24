import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Header from './components/Header';
import Left from './components/Left';
import styles from './main.less'
export default function Index(props: any) {
  console.log(props.children)
  return <div className={styles.mainWrapper}>
    <div className={styles.left}>
      <Left />
    </div>
    <div className={styles.right}>
      <Header />
    </div>
  </div>
}