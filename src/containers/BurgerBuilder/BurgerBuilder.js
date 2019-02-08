import React, { Component } from 'react'
import './BurgerBuilder.css'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false
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
    console.log(sum, sum2)
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
    console.log(this.state['totalPrice'])
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

  render () {
    const diabledInfo = {
      ...this.state.ingredients
    }
    for(let key in diabledInfo) {
      diabledInfo[key] = diabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
          disabled={diabledInfo}
          purchaseable={this.state.purchaseable}
          price={this.state.totalPrice}/>
      </Aux>
    )
  }
}

export default BurgerBuilder
