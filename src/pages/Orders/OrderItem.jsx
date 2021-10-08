const OrderItem = ({ order }) => {
    const { customerDetails, ingredients, totalPrice, time } = order;
    return (
        <tr>
            <td className="time">{time}</td>
            <td className="paymentMehod">{customerDetails.paymentMethod}</td>
            <td className="ingredients">
                {ingredients.map(({ amount, type }) => <p><span className="ingredient-amount">{amount}</span> X {type}</p>)}
            </td>
            <td className="total">{totalPrice} Taka</td>
            <td className="total">
                <button className="order-status-btn" disabled>Pending</button>
            </td>
        </tr>
    )
}

export default OrderItem;
