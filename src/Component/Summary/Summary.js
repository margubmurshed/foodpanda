import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import './Summary.css';

const Summary = ({ ingredients, isOpen, total, pushToCheckout, toggleSummary }) => {
    let filteredIngredients = ingredients.filter(({ amount }) => amount !== 0);
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader className="summary-heading">Order Summary</ModalHeader>
            <ModalBody>
                <div className="container">
                    <div className="summary-ingredients">
                        {filteredIngredients.map(({ type, amount, price }) => <h6 key={type}>{`${type} X ${amount} = ${price * amount} Taka`}</h6>)}
                    </div>
                    <h6 className="summary-total-price">Total Price : {total} Taka</h6>
                </div>
            </ModalBody>
            <ModalFooter className="m-auto">
                <button className="btn btn-danger summary-btn" onClick={toggleSummary}>Return To Builder</button>
                <button className="btn btn-success summary-btn" onClick={pushToCheckout}>
                    Proceed To Checkout
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default Summary;
