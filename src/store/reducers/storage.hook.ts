export const withStorage = (reducer: (state:any, action:any)=>{}, initialState:any, key: string) => (state=initialState, action: any) => {
    if(action.type === '') {
        const savedState = localStorage.getItem(key);
        if(savedState) return JSON.parse(savedState);
        return state;
    }
    const newState = reducer(state, action);
    localStorage.setItem(key, JSON.stringify(newState));
    return newState;
};
