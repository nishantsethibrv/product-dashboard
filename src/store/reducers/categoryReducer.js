const initialState = {
    categories: []
}

const categoryReducer = (state = initialState, action) => {
    // console.log(action, "action")
    switch(action.type){
        case 'STORE_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
            };
            default: return state;
    }
}

export default categoryReducer;