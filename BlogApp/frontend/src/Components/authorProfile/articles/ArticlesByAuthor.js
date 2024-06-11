import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../../../axiosWithTocken';

import '../articles/ArticleByauthor.css'
function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();
  let { currentUser } = useSelector(
    (state) => state.userAuthorLoginSlice
  );

  const getArticlesOfCurrentAuthor=async()=>{
    let res=await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
    setArticlesList(res.data.article)
  }

  let readArticle=(article)=>{
    
    navigate(`/authorprofile/articleById/${article.articleId}`,{state:article})
  }

    useEffect(()=>{
      getArticlesOfCurrentAuthor()
    },[])
  return (
    <div className="Articles" style={{height:"86vh"}}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-1 justify-content-center align-items-center" style={{height:"86vh"}}>
        {articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4" onClick={()=>readArticle(article)} >
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on  {article.dateOfModification.substring(0,10)} {article.dateOfModification.substring(11,19)}
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

export default ArticlesByAuthor