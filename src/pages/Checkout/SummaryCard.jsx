import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const SummaryCard = ({ filteredIngredients, total, deliveryCharge }) => {
    return (
        <div className="col-lg-6 cart-summary-container">
            <div className="row cart-summary-card">
                <div className="col-lg-12">
                    <h2 className="summary-card-title"><FontAwesomeIcon icon={faShoppingCart} /> Cart Summary</h2>
                </div>
                <div className="col-lg-12 cart-summary-card-body">
                    {filteredIngredients.map(item => (
                        <p className="summary-card-item">
                            <span className="summary-card-item-name">
                                {item.type}
                            </span>
                            {` X ${item.amount} = ${item.amount * item.price} Taka`}
                        </p>
                    ))}
                    <p className="summary-card-item">
                        <span className="summary-card-item-name">Delivery Charge</span>
                        <span> = {deliveryCharge} Taka</span>
                    </p>
                </div>
                <div className="col-lg-12">
                    <h5 className="summary-card-footer-title">Total : {total + deliveryCharge} Taka</h5>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard
