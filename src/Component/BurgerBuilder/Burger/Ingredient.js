import React from 'react';
import TopBread from '../../../assets/images/top.png';
import Cheese from '../../../assets/images/cheese.png';
import Meat from '../../../assets/images/meat.png';
import Salad from '../../../assets/images/salad.png';
import BottomBread from '../../../assets/images/bottom.png';
import './Ingredient.css';

const Ingredient = props => {
    let ingredient;
    switch (props.type) {
        case 'top-bread':
            ingredient = <div className="ingredient"><img src={TopBread} alt="top-bread" width="300px" /></div>
            break;

        case 'cheese':
            ingredient = <div className="ingredient"><img src={Cheese} alt="cheese" width="300px" /></div>
            break;

        case 'meat':
            ingredient = <div className="ingredient"><img src={Meat} alt="meat" width="300px" /></div>
            break;

        case 'salad':
            ingredient = <div className="ingredient"><img src={Salad} alt="salad" width="300px" /></div>
            break;

        case 'bottom-bread':
            ingredient = <div className="ingredient"><img src={BottomBread} alt="bottom-bread" width="300px" /></div>
            break;

        default: ingredient = <div className="ingredient"></div>
    }

    return (
        <>{ingredient}</>
    )
}

export default Ingredient;
