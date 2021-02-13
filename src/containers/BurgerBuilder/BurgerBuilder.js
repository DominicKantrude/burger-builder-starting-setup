import React, {Component} from 'react';

import Aux from '../../hoc/Aux/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES ={
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
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
    purchaseable: false,
    purchasing: false
}

updatePurchaseState (ingredients){
    
    const sum = Object.keys(ingredients)
    .map(igKey =>{
        return ingredients[igKey]
    })
    .reduce((sum, el)=>{
        return sum + el;
    },0);
    this.setState({purchaseable: sum > 0})
}

purchaseHandler = () => {
    this.setState({purchasing: true})
}

purchaseCancelHandler = () => {
    this.setState({purchasing: false})
}

purchaseContinueHandler = () => {
   alert('You continue!');
}


addIngredientHandler = (type) =>{
    const updatedCount  = this.state.ingredients[type] + 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
}

removeIngredientHandler = (type) =>{
    let updatedCount = 0;
    if(this.state.ingredients[type]!==0){
         updatedCount  = this.state.ingredients[type] - 1;
    }
    
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
}

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                    purchaseCanceled ={this.purchaseCancelHandler}
                    price={this.state.totalPrice}
                    purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}/>
                  
            </Aux>
        )
    }
}

export default BurgerBuilder;