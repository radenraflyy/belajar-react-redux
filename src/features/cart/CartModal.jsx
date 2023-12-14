/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import ReactStars from "react-rating-star-with-type"
import Modal from "../../components/Modal"
import {
  selectorCart,
  selectorTotalCart,
  selectorTotalPrice,
  setQuantity,
} from "./cartSlice"
const CartModal = ({ handleCloseModalCart }) => {
  const cartItems = useSelector(selectorCart)
  const totalItems = useSelector(selectorTotalCart)
  const totalPrice = useSelector(selectorTotalPrice)
  const dispatch = useDispatch()

  const handleCheckoutWhatsapp = () => {
    if (totalItems === 0) return

    const phoneNumber = "6283895938361"
    const message = encodeURIComponent(
      `Hallo Saya ingin membeli ${totalItems} barang dengan total harga ${totalPrice}`
    )

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`
    window.open(URL, "_blank")
  }

  const handleQuantity = (item, name) => {
    dispatch(setQuantity({ item, name }))
  }

  return (
    <Modal>
      <div className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
        <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
          {cartItems.map((el) => (
            <div key={el.id} className="w-full border-b-4 border-blue-200 pb-2">
              <div className="flex items-center w-full">
                <div className="w-[120px] h-auto overflow-hidden">
                  <img
                    src={el.image}
                    alt={el.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-10 w-[75%]">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold">{el.category}</h4>
                    <h3 className="text-sm">
                      <ReactStars
                        value={el.rating.rate}
                        edit={true}
                        activeColors={["orange"]}
                      />
                    </h3>
                  </div>
                  <h3 className="capitalize mt-3 text-lg">{el.title}</h3>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm">{el.price}</h4>
                    <h3 className="text-lg font-bold">{el.totalPrice}</h3>
                  </div>
                  <div className="flex items-center gap-4 mt-4 ml-auto">
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-full bg-blue-400 w-5 h-5 text-white "
                      onClick={() => handleQuantity(el, "minus")}
                    >
                      -
                    </button>
                    <h3 className="mx-2">{el.quantity}</h3>
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-full bg-blue-400 w-5 h-5 text-white"
                      onClick={() => handleQuantity(el, "add")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length !== 0 ? (
          <div>
            <h3 className="text-md font-bold">Total: {totalItems}</h3>
            <h3 className="text-md font-bold">Total Price: {totalPrice}</h3>
          </div>
        ) : (
          <div className="border-2 mx-auto rounded-md">
            <h2 className="text-center py-14 px-12 text-lg font-bold">NO CART!</h2>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
            onClick={handleCloseModalCart}
          >
            Close
          </button>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 font-bold px-4 py-2 rounded-lg text-white"
            onClick={handleCheckoutWhatsapp}
          >
            Checkout (WhatsApp)
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CartModal
