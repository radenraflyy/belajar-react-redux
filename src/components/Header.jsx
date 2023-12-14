import { useDispatch, useSelector } from "react-redux"
import Cart from "../assets/cart.svg"
import Search from "../assets/search.svg"
import { selectorTotalCart } from "../features/cart/cartSlice"
import { selectorSearchKeyword } from "../features/filter/filterSlice"
// eslint-disable-next-line react/prop-types
const Header = ({ handleShowModalCart }) => {
  const dispacth = useDispatch()
  const cartTotalItems = useSelector(selectorTotalCart)
  const searchKeyword = useSelector(selectorSearchKeyword)

  const handleChangeSearch = (e) => {
    console.log(e.target.value)
    dispacth(searchKeyword(e.target.value))
  }
  return (
    <header className="bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex items-center justify-between h-20">
          <div className="text-xl md:text-3xl font-bold text-gray-100">
            Simple Ecomerce
          </div>
          <div className="flex items-center gap-5">
            <div className="sm:flex bg-white rounded-md hidden">
              <input
                type="search"
                className="py-1 rounded-md px-2 border-none outline-none"
                placeholder="Search"
                onChange={handleChangeSearch}
              />
              <button className="px-1" type="submit">
                <img src={Search} alt="..." />
              </button>
            </div>
            <button
              type="button"
              className="relative rounded-full bg-blue-800 p-2 text-gray-100"
              onClick={handleShowModalCart}
            >
              {cartTotalItems !== 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-sm">
                  {cartTotalItems}
                </span>
              )}
              <img src={Cart} alt="..." />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
