import { set } from '../redux/product-modal/productModalSlice'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import productData from '../assets/fake-data/products'
import Helmet from '../components/Helmet'
import numberWithCommas from '../utils/numberWithCommas'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import CartItem from '../components/CartItem'

const Cart = () => {

    const cartItems = useSelector((state) => state.cartItems.value)

    console.log(cartItems);

    const [cartProducts, setCartProducts] = useState(productData.getCartItemsDetail(cartItems))

    const [tottalProducts, setTottalProducts] = useState(0)

    const [tottalPrice, setTottalPrice] = useState(0)

    useEffect(() => {
        setCartProducts(productData.getCartItemsDetail(cartItems))
        setTottalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
        setTottalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) *
            Number(item.price)), 0))
    }, [cartItems])

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có {tottalProducts} sản phẩm
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền</span>
                            <span>{numberWithCommas(tottalPrice)}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">đặt hàng</Button>
                        <Link to="/catalog">
                            <Button size="block">tiếp tục mua hàng</Button>
                        </Link>
                    </div>
                </div>
                <div className="cart__list">
                    {cartProducts.map((item, index) => (
                        <CartItem item={item} key={index} />
                    ))}
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
