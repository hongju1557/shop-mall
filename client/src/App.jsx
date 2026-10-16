import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './layouts/Header'
import Main from './layouts/Main'
import ProductLists from './products/ProductList'
import ProductInfo from './products/ProductInfo'

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
        </Routes>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
