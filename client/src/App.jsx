import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './layouts/Header'
import Main from './layouts/Main'
import ProductLists from './products/ProductList'
import ProductInfo from './products/ProductInfo'
import AddProduct from './products/AddProduct'
import UpdateProduct from './products/UpdateProduct'

function App() {

  return (
    <>
      <section className="app">
        <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/products' element={<ProductLists/>}></Route>
          <Route path='/products/:id' element={<ProductInfo/>}></Route>
          <Route path='/addproduct' element={<AddProduct/>}></Route>
          <Route path='/products/update/:id' element={<UpdateProduct/>}></Route>
        </Routes>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
