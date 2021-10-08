import React from 'react';
import { Form, Input, FormGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faCcStripe, faCcPaypal } from '@fortawesome/free-brands-svg-icons';

const CheckoutForm = ({ values, inputChangeHandler, submitHandler, purchasable }) => {
    const { fullname, email, phone, address } = values;
    return (
        <div className="col-lg-6">
            <Form onSubmit={submitHandler}>
                <div className="billing-details">
                    <h2 className="title"> <FontAwesomeIcon icon={faAddressCard} /> Billing Details</h2>

                    <FormGroup className="form-item">
                        <Label>Full Name</Label>
                        <Input type="text" name="fullname" value={fullname} placeholder="Enter Your Full Name" required onChange={inputChangeHandler} />
                    </FormGroup>
                    <FormGroup className="form-item">
                        <Label>Email Address</Label>
                        <Input type="email" name="email" value={email} placeholder="Enter Your Email Address" required onChange={inputChangeHandler} />
                    </FormGroup>
                    <FormGroup className="form-item">
                        <Label>Phone</Label>
                        <Input type="tel" name="phone" value={phone} placeholder="Enter Your Phone Number" required onChange={inputChangeHandler} />
                    </FormGroup>
                    <FormGroup className="form-item">
                        <Label>Address</Label>
                        <Input type="text" name="address" value={address} placeholder="Enter Your Address" required onChange={inputChangeHandler} />
                    </FormGroup>

                </div>
                <div className="payment-method">
                    <h2 className="title"><FontAwesomeIcon icon={faMoneyCheck} /> Payment Method</h2>
                    <FormGroup check className="payment-method-item">
                        <Label check>
                            <Input type="radio" name="paymentMethod" value="Mobile Banking" onChange={inputChangeHandler} required /> <p>Mobile Banking</p>
                        </Label>
                    </FormGroup>
                    <FormGroup check className="payment-method-item">
                        <Label check>
                            <Input type="radio" name="paymentMethod" value="Credit Card" onChange={inputChangeHandler} required /> <p>Credit Card</p>
                        </Label>
                        <div className="card-icons">
                            <FontAwesomeIcon icon={faCcMastercard} />
                            <FontAwesomeIcon icon={faCcVisa} />
                            <FontAwesomeIcon icon={faCcStripe} />
                            <FontAwesomeIcon icon={faCcPaypal} />
                        </div>
                    </FormGroup>
                    <FormGroup check className="payment-method-item">
                        <Label check>
                            <Input type="radio" name="paymentMethod" value="Cash On Delivery" onChange={inputChangeHandler} required /> <p>Cash On Delivery</p>
                        </Label>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Input type="submit" value="Place Order" className="placeOrder-btn" disabled={!purchasable} />
                </FormGroup>
            </Form>
        </div>
    )
}

export default CheckoutForm
