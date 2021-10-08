import Ingredient from './Ingredient';

const Burger = ({ ingredients }) => {
    const showElements = ingredients.map(item => {
        if (item.amount) {
            return [...Array(item.amount).keys()].map(_ => <Ingredient type={item.type} key={Math.random()} />)
        } else return [];
    }).reduce((prev, current) => [...prev, ...current]);;

    return (
        <>
            <div className="container">
                <div className="d-flex flex-column text-center align-items-center">
                    <Ingredient type="top-bread" />
                    {showElements.length ? showElements : <h4>Add Some Ingredients</h4>}
                    <Ingredient type="bottom-bread" />
                </div>
            </div>
        </>
    )
}

export default Burger;
