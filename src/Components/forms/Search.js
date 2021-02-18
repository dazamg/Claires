import React from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {SearchOutlined} from '@ant-design/icons'

const Search = () => {
    //Redux state
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({...state}))
    // WHEN A USER HIT THE INPUT TAKE THEM TO THE SHOP PAGE
    const {text} = search;

    const  history = useHistory

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: e.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/shop?${text}`)
    }
    
    return (
        <form className="form-inline my-2 my-lg-0 " onSubmit={handleSubmit}>
            <input type="search" 
            onChange={handleChange}
            value={text} 
            className="form-control mr-sm-2"
            placeholder="Search"
            />
            <SearchOutlined onClick={handleSubmit} style={{cursor: "pointer"}}/>
        </form>
    )
}

export default Search
