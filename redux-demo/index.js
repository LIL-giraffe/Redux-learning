const redux=require('redux')
const createStore=redux.createStore


const CAKE_ORDER= 'CAKE_ORDER'

// an action always return an object and is basically a js function
function cakeOrder(){
    return{
        type: CAKE_ORDER,
        quantity: 1
    }
}

// restocking our state
function restock(qty=1){
    return{
        type: CAKE_RESTOCKED,
        quantity:qty
    }
}

// a reducer function takes initialstate and action as args and returns new state depending on action performed
const initialState={
    numOfCakes:10,
    some: 0    
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case CAKE_ORDER:
            return{
                ...state,
                numOfCakes:state.numOfCakes-1
            }

        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes:state.numOfCakes+action.quantity
            }    
        default:
            return state    
    }
}

// creating a store 
const store=createStore(reducer)
console.log('initial sate', store.getState())

const unsubscribe= store.subscribe(()=>
  console.log("update state", store.getState())
)

store.dispatch(cakeOrder())
store.dispatch(cakeOrder())
store.dispatch(restock(3))

unsubscribe()