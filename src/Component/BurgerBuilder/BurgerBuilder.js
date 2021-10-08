import { useState, useEffect } from 'react';
import { addIngredient, removeIngredient, updatePurchasable } from '../../Redux/ActionCreator';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Burger from './Burger/Burger';
import Control from './Control/Control';
import OrderSummary from '../Summary/Summary';
import Header from '../Header/Header';
import './BurgerBuilder.css';

const BurgerBuilder = () => {
    const [orderSummary, setOrderSummary] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { ingredients, total } = useSelector(({ ingredients, total }) => ({ ingredients, total }));

    useEffect(() => {
        document.title = "Home || FoodPanda";
    }, [])

    const toggleSummary = () => {
        setOrderSummary(prevState => !prevState);
    }

    const addBurgerIngredient = id => {
        dispatch(addIngredient(id))
        dispatch(updatePurchasable())
    }

    const removeBurgerIngredient = id => {
        dispatch(removeIngredient(id));
        dispatch(updatePurchasable());
    }

    const pushToCheckout = () => {
        history.push({
            pathname: '/checkout',
            state: {
                ingredients,
                total
            }
        })
    }

    return (
        <>
            <Header />
            <div className="burger-builder-container pt-3">
                <div className="row">
                    <div className="col-lg-4 side-ingredients-container">
                        <div className="header-side-ingredients">
                            <p>Ingredients</p>
                        </div>
                        <div className="side-ingredients-container-flex">
                            {ingredients.map(({ id, img, type }) => (
                                <div
                                    className="sideIngredient flex flex-col items-center justify-center"
                                    onClick={() => addBurgerIngredient(id)}
                                    key={Math.random()}
                                >
                                    <img src={img} alt={type} width="80px" />
                                    <h6 style={{ textTransform: "uppercase" }}>
                                        {type}
                                    </h6>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-4 burger-container">
                        <Burger ingredients={ingredients} />
                    </div>
                    <div className="col-lg-4 pt-3">
                        <Control
                            ingredients={ingredients}
                            total={total}
                            addIngredient={addBurgerIngredient}
                            removeIngredient={removeBurgerIngredient}
                            toggleSummary={toggleSummary}
                        />
                    </div>
                </div>
            </div>
            <OrderSummary
                isOpen={orderSummary}
                ingredients={ingredients}
                total={total}
                pushToCheckout={pushToCheckout}
                toggleSummary={toggleSummary}
            />
        </>
    )
}

export default BurgerBuilder;
