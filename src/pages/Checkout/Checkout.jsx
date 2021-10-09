import { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import Form from './CheckoutForm';
import './Checkout.css';
import Header from '../../Component/Header/Header';
import { resetPurchasable } from '../../Redux/ActionCreator';
import { LoadUsers } from '../../Redux/AuthActionCreator';
import Spinner from '../../Component/Spinner/spinner';
import date from 'date-and-time';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../Component/Alert';
import { db } from '../../firebase';
import { useHistory } from 'react-router';

const MapState = state => ({
    ingredients: state.ingredients,
    total: state.total,
    purchasable: state.purchasable,
    docID: state.user.docID,
    user: state.user,
    orders: state.orderState.orders,
})

const initialCustomerInfo = {
    fullname: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: ''
}

const Checkout = () => {
    const { ingredients, total, purchasable, docID, user, orders } = useSelector(MapState);
    const [customerInfo, setCustomerInfo] = useState(initialCustomerInfo);
    const [loading, setLoading] = useState(false);
    const [alerts, setAlert] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const { fullname, email, phone, address } = customerInfo;
    const filteredIngredients = ingredients.filter(({ amount }) => amount !== 0);
    const DELIVERY_CHARGE = 60;

    useEffect(() => {
        document.title = 'Checkout || FoodPanda';
    }, [])

    const inputChangeHandler = e => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: e.target.value
        });
    }

    const resetForm = () => {
        setCustomerInfo(initialCustomerInfo);
    }

    const createOrder = (ingredients, total) => {
        return {
            customerDetails: customerInfo,
            ingredients: ingredients,
            totalPrice: total + DELIVERY_CHARGE,
            time: date.format(new Date(), 'DD MMM, YYYY')
        }
    }

    const submitOrder = (updatedUser, docID) => {
        setLoading(true);
        setAlert([]);
        db.ref().child('users').child(docID).set(updatedUser)
            .then(() => {
                resetForm();
                dispatch(resetPurchasable())
                dispatch(LoadUsers())
                setLoading(false);
                setAlert([{ message: 'Order has been placed', color: 'green' }])
                setTimeout(() => history.push('/home'), 5000);
            })
            .catch(() => {
                setLoading(false);
                setAlert([{ message: 'Action Failed', color: 'red' }])
            });
    }

    const submitHandler = e => {
        e.preventDefault();
        const filteredIngredients = ingredients.filter(({ amount }) => amount !== 0);
        if (filteredIngredients.length) {
            const order = createOrder(filteredIngredients, total);
            const updatedOrders = [...orders, order];
            const updatedUser = { ...user, orders: updatedOrders };
            submitOrder(updatedUser, docID);
        }
    }

    if (loading) return (
        <>
            <Header />
            <Spinner />
        </>
    )

    return (
        <>
            <Header />
            <div className="main-checkout-container">
                <div className="checkout-container">
                    <div className="row checkout-content">
                        <Alert alerts={alerts} remove={() => setAlert([])} />
                        <Form
                            values={{ fullname, email, phone, address }}
                            inputChangeHandler={inputChangeHandler}
                            submitHandler={submitHandler}
                            purchasable={purchasable}
                        />
                        <SummaryCard
                            filteredIngredients={filteredIngredients}
                            total={total}
                            deliveryCharge={DELIVERY_CHARGE}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;
