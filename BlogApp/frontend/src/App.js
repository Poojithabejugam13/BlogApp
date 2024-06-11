import  'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter,Navigate,RouterProvider } from "react-router-dom";
import RootLaout from "./RootLaout";
import SignIn from './Components/signIn/SignIn';
import SignUp from './Components/signUp/SignUp';
import Home from './Components/home/Home';
import UserProfile from './Components/userProfile/UserProfile';
import AuthorProfile from './Components/authorProfile/AuthorProfile';
import AddNew from './Components/authorProfile/addnew/AddNew';
import ArticlesByAuthor from './Components/authorProfile/articles/ArticlesByAuthor';
import Article from './Components/Article/Article';
import Articles from './Components/articles/Articles';
function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<RootLaout></RootLaout>,
      children:[
        {
          path:'',
          element:<Home></Home>
        },
        {
          path:'Home',
          element:<Home></Home>
        },
        {
          path:'/signin',
          element:<SignIn></SignIn>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        },
        {
          path:'/userprofile',
          element:<UserProfile></UserProfile>,
          children:[
            {
              path:'articles',
              element:<Articles></Articles>

            },
            {
              path:'articleById/:articleId',
              element:<Article></Article>

            },
          ]
          
        },
        {
          path:'/authorprofile',
          element:<AuthorProfile></AuthorProfile>,
          children:[
            {
              path:`articles/:username`,
              element:<ArticlesByAuthor></ArticlesByAuthor>
            },
            {
              path:'addnew',
              element:<AddNew></AddNew>
            },
            {
              path:'articleById/:articleId',
              element:<Article></Article>
            },
            {
              path:'',
              element:<Navigate to="articles/:username"/>
            }
          ]
        }
        // ,
        // {
        //   path:'/articles',
        //   element:<Articles></Articles>
        // },
        // {
        //   path:'/addnew',
        //   element:<AddNew></AddNew>
        // }
    ]

    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
