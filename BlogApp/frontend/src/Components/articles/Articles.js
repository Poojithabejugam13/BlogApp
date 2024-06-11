import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../../axiosWithTocken';
import '../articles/Article.css'
import { MdOutlineReadMore } from "react-icons/md";
import { MdUpdate } from "react-icons/md";

function Articles() {
    const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();
  let { currentUser } = useSelector(
    (state) => state.userAuthorLoginSlice
  );
  const getArticles=async()=>{
    let res=await axiosWithToken.get(`http://localhost:4000/user-api/articles`)
    setArticlesList(res.data.article)
  }

  let readArticle=(article)=>{
    
    navigate(`/userprofile/articleById/${article.articleId}`,{state:article})
  }

    useEffect(()=>{
      getArticles()
    },[])
  return (
    <div className='Article' style={{height:"87vh"}}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-1 justify-content-center ">
        {articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4" onClick={()=>readArticle(article)} >
                  <span>Read More <MdOutlineReadMore /></span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on  <MdUpdate /> {article.dateOfModification.substring(0,10)} {article.dateOfModification.substring(11,19)}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default Articles