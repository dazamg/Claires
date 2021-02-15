import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from '../../nav/AdminNav'
import {getCategories} from '../../../functions/category'
import {createSub, removeSub, getSubs} from '../../../functions/sub'
import { Link } from "react-router-dom";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../forms/CategoryForm'
import SearchFilterForm from '../../forms/SearchFilterForm'


const SubCreate = () => {
    const {user} = useSelector((state) => ({ ...state}));
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [subs, setSubs] = useState([])
    const [searchquery, setSearchquery] = useState("")

    useEffect(() => {
      loadCategories()
      loadSubs()
    }, [])

    const loadCategories = () => {
      getCategories()
      .then(c => setCategories(c.data))
    }
    
    const loadSubs = () => {
      getSubs()
      .then(s => setSubs(s.data))
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        createSub({name, parent: category}, user.token)
        .then((res) => {
            // console.log(res)
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is created`)
            loadSubs()
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data);
        });
    };

    const handleRemove = async(slug) => {
      if(window.confirm("Delete?")) {
        setLoading(true)
        removeSub(slug, user.token)
        .then(res => {
          setLoading(false)
          toast.error(`${res.data.name} deleted`)
          loadSubs()
        })
        .catch((err)  => {
          if(err.response.status === 400){
            setLoading(false)
            toast.error(err.response.data);
          } 
        })
      }
    }
    // Filter function. 
    const searched = (searchquery) => (c) => c.name.toLowerCase().includes(searchquery)

    

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div>
            {loading ? (
            <h4 className="text-danger">Loading</h4>
          ) : (
            <h4>Create Sub category</h4>
          )}

        <div className="form-group">
            <label>Category</label>
            <select name="category" 
            // className="form-control"
            onChange={(e) => setCategory(e.target.value)}
            >
                <option>Please Select</option>
                {categories.length > 0 && 
                categories.map((c) =>(
                <option key={c._id} value={c._id}>
                    {c.name}
                </option>))}
            </select>
        </div>
        
        <CategoryForm handleSubmit={handleSubmit} 
          name={name}
          setName={setName}
        />

        < SearchFilterForm searchquery={searchquery} setSearchquery={setSearchquery}/>

          {/* Filter out the search query then return the query onclick*/}
          {subs.filter(searched(searchquery)).map((s) =>(
            <div className="alert alert-secondary" key={s._id}>
              {s.name} 
              <span onClick={() => handleRemove(s.slug)} 
              className="btn btn-sm float-right">
                <DeleteOutlined className="text-warning"/></span>
              <span className="btn btn-sm float-right">
                <Link to={`/admin/sub/${s.slug}`}>
                <EditOutlined className="text-warning"/>
              </Link>
              </span>
              
            </div>
          )    
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
