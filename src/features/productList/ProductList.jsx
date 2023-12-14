import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItemToCart } from "../cart/cartSlice"
import "../../App.css"
import {
  selectorParamsAbjad,
  selectorParamsCategory,
  selectorParamsUrutkan
} from "../filter/filterSlice"

const ProductList = () => {
  const [productList, setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispacth = useDispatch()
  const params = useSelector(selectorParamsCategory)
  const paramsAbjad = useSelector(selectorParamsAbjad)
  const paramsUrutkan = useSelector(selectorParamsUrutkan);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        let response
        if (params.length === 0) {
          response = await fetch(
            `https://fakestoreapi.com/products?sort=${paramsAbjad.toLowerCase()}`
          )
        } else {
          response = await fetch(
            `https://fakestoreapi.com/products/category/${params}?sort=${paramsAbjad.toLowerCase()}`
          )
        }

        const data = await response.json()
        let sortedData = data
        if (paramsUrutkan && typeof paramsUrutkan === 'function') {
          sortedData = data.sort(paramsUrutkan);
        }
        setProductList(sortedData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params, paramsAbjad, paramsUrutkan])

  const handleClickBuyNow = (product) => {
    dispacth(addItemToCart(product))
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-4">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border shadow p-4 w-full"
            >
              <div className="group relative w-[80%] h-[300px] mx-auto overflow-hidden">
                <img
                  className="w-full h-full object-contain rounded-xl group-hover:scale-110 transition-all duration-500 ease-in-out"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="flex flex-col gap-6 mt-8">
                <button
                  type="button"
                  className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8"
                  onClick={() => handleClickBuyNow(product)}
                >
                  BUY NOW
                </button>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <h3 className="text-gray-600">{product.price}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ProductList
