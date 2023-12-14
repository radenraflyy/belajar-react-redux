import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import ProductList from "./features/productList/ProductList"
import CartModal from "./features/cart/CartModal"
import Filter from "./features/filter/Filter"

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleShowModalCart = () => {
    setIsOpenModal(true)
  }

  const handleCloseModalCart = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      {isOpenModal && <CartModal handleCloseModalCart={handleCloseModalCart} />}
      <Header handleShowModalCart={handleShowModalCart} />
      <main className="max-w-7xl mx-auto px-4">
        <Filter/>
        <ProductList />
      </main>
    </>
  )
}

export default App
