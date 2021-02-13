import React, {useState} from 'react'
import {Menu} from 'antd'
import { HomeOutlined , SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
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
            
                    <Item key="setting:1">Option 1</Item>
                    <Item key="setting:2">Option 2</Item>
                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
        
                </SubMenu>
            )}
  
      </Menu>

    )
}

export default Header
