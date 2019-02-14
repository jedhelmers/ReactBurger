import React from 'react'
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Aux'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey, index) => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}: </span>
        {props.ingredients[igKey]}
      </li>
    )
  })

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients: </p>
      {ingredientSummary}
      <p>Total price: <strong>${props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseCancel} btnType="Danger">Cancel</Button>
      <Button clicked={props.purchaseContinue} btnType="Success">Continue</Button>
    </Aux>
  )
}

export default orderSummary
