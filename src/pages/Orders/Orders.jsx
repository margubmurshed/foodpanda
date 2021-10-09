import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadUsers } from '../../Redux/AuthActionCreator';

import Spinner from '../../Component/Spinner/spinner';
import OrderItem from './OrderItem';
import { Table } from 'reactstrap';
import Header from '../../Component/Header/Header';
import './Orders.css';

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, isLoading } = useSelector(({ orderState: { orders }, isLoading }) => ({ orders, isLoading }));

    useEffect(() => {
        document.title = "Orders || FoodPanda";
        dispatch(LoadUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const orderElements = orders.length ? orders.map(item => <OrderItem order={item} key={Math.random()} />) : [];

    if (isLoading) return (
        <>
            <Header />
            <Spinner />
        </>
    )

    return (
        <>
            <Header />
            <div className="Orders">
                <p className="Ordertitle">Orders</p>
                <div className="OrdersTable">
                    {orderElements.length ? (
                        <div className="table-responsive">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Method</th>
                                        <th>Ingredients</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderElements}
                                </tbody>
                            </Table>
                        </div>
                    ) : <div className="not-found"><p>No Order Found</p></div>}
                </div>
            </div>
        </>
    )
}

export default Orders;
