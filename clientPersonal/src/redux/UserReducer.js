const UserReducer = (
    state = {
        isLoggedIn: false,
        userName: "",
        id: ""

    },
    action
) => {
    switch (action.type) {
        case "CHECK_LOGIN_STATE_FULFILLED":
            state = {
                ...state,
                isLoggedIn: action.payload.email ? true : false,
                userName: action.payload.email,
                id: action.payload.id
            };
            break;
        case "LOGIN_USER_FULFILLED":
            state = {
                ...state,
                isLoggedIn: true
            };
            break;
        case "LOGOUT_USER_FULFILLED":
            state = {
                userName: "",
                id: "",
                isLoggedIn: false
            };
            break;
        default:
            return state;
    }
    return state;
};
export default UserReducer;