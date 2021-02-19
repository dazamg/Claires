import React, {useState} from 'react'
import {Menu} from 'antd'
import { HomeOutlined , SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../forms/Search'
const { SubMenu, Item } = Menu;


const Header = () => {
    const [current, setCurrent] = useState('home')
    let dispatch = useDispatch()
    let history = useHistory()
    let {user} = useSelector((state) => ({...state
    }))

    const handleClick = (e) => {
        setCurrent(e.key)

    }

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null,
        })
        history.push("/login")
    }

    return (
        
            
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            {!user && (
                <Item key="Signup" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/signup">Signup</Link>
                </Item>
            )}

            {!user && (
                <Item key="Login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            )}

            {user && (
                <SubMenu 
                key="SubMenu" 
                icon={<SettingOutlined />} 
                title={user.email && user.email.split('@')[0]} 
                className="float-right">
                    {user && user.role === 'subscriber' && (
                        <Item icon={<DashboardOutlined />}>
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}

                    {user && user.role === 'admin' && (
                        <Item icon={<DashboardOutlined />}>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}  
                    
                    
                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
        
                </SubMenu>
            )}

            <span className="float-right"> <Search /></span>
  
      </Menu>

    )
}

export default Header
