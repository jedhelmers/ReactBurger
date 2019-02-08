import React from 'react'
import './Burger.css'
import BurderIngredient from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurderIngredient key={igKey + i} type={igKey} />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

    if(transformedIngredients.length === 0){
      transformedIngredients = <p>Please start adding ingredients</p>
    }

  // console.log(transformedIngredients)
    return (
      <div className="Burger">
        <BurderIngredient type="bread-top" />
        {transformedIngredients}
        <BurderIngredient type="bread-bottom" />
      </div>
    )
}

export default burger
