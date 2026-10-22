import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './layouts/Header'
import Main from './layouts/Main'
import ProductLists from './products/ProductList'
import ProductInfo from './products/ProductInfo'
import AddProduct from './products/AddProduct'
import UpdateProduct from './products/UpdateProduct'
import SignIn from './users/SignIn'
import { useState } from 'react'
import SignUp from './users/SignUp'
import AdminPage from './users/AdminPage'

function App() {
  
  //로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //로그인 한 사용자 아이디
  const [username, setUsername] = useState("");

  //로그인 핸들러 함수
  const handleLogin = (username, role) => {
      setIsLoggedIn(true);
      setUsername(username);
      setUserRole(role);
  }

  //로그인한 사용자의 권한 관리
  const [userRole, setUserRole] = useState("");

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername(""); // 로그아웃시 사용자 선택 초기화
        setUserRole("");
    }

  return (
    <>
      <section className="app">
        <BrowserRouter>
        <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
        userRole={userRole}
        ></Header>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/products' element={<ProductLists/>}></Route>
          <Route path='/products/:id' element={<ProductInfo/>}></Route>
          <Route path='/products/new' element={<AddProduct/>}></Route>
          <Route path='/products/update/:id' element={<UpdateProduct/>}></Route>
          <Route path='/signin' element={<SignIn setUserName={handleLogin}/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/AdminPage' element={<AdminPage userRole={userRole}/>}></Route>
        </Routes>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
