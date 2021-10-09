import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import './Control.css';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Control = props => {
    const { ingredients, total, addIngredient, removeIngredient, toggleSummary } = props;
    const totalAmountFinder = () => {
        let sumAmount = 0;
        ingredients.forEach(({ amount }) => sumAmount += amount);
        return sumAmount;
    }
    const totalAmount = totalAmountFinder();
    return (
        <>
            <Card style={{ borderRadius: "10px" }}>
                <CardHeader style={{ backgroundColor: "#D82270", color: "#ffffff", textAlign: "center", fontWeight: "700" }}>
                    List Of Item {totalAmount ? `(${totalAmount})` : ''}
                </CardHeader>
                <CardBody>
                    <div className="control-container">
                        <div className="row">
                            {totalAmount ? (
                                ingredients.map(({ amount, type, price, id }) => {
                                    if (amount) {
                                        return (
                                            <div className="col-lg-12" key={Math.random()}>
                                                <div className="control-item flex justify-between gap-3">
                                                    <span>{type} X <strong>{amount}</strong> = {price * amount} Taka</span>
                                                    <div className="control-item-buttons">
                                                        <button className="changeBtn" onClick={() => addIngredient(id)}>+</button>
                                                        <button className="changeBtn" onClick={() => removeIngredient(id)}>-</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else return null;
                                })
                            ) : 'No Item To Show'}
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <h6 className="text-center">{`Total: ${total} BDT`}</h6>
                </CardFooter>
            </Card>
            <button
                className="btn btn-secondary enabled-checkout-btn mb-10"
                disabled={!totalAmount}
                onClick={toggleSummary}
            > Procced To Checkout <FontAwesomeIcon icon={faLongArrowAltRight} />
            </button>
        </>
    )
}

export default Control;