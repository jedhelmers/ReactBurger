import React, { Component } from 'react'
import './BurgerBuilder.css'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: 1.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
      filler: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)

    const sum2 = Object.values(ingredients).reduce((some, el) => {
      return sum + el
    }, 0)
    this.setState({purchaseable: sum > 0})
    // console.log(sum, sum2)
    // console.log(Object.values(ingredients))
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = oldCount + 1
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    this.setState({totalPrice: oldPrice + priceAddition, ingredients: updatedIngredients})
    // console.log(this.state['totalPrice'])
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if(oldCount <= 0){
      return
    }
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = oldCount - 1
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    this.setState({totalPrice: oldPrice - priceAddition, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert('You continue!')
  }

  render () {
    const diabledInfo = {
      ...this.state.ingredients
    }
    for(let key in diabledInfo) {
      diabledInfo[key] = diabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
          />

        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
          disabled={diabledInfo}
          purchaseable={this.state.purchaseable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}/>
      </Aux>
    )
  }
}

export default BurgerBuilder
