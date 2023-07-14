import axios from "axios";


const REGISTRATION = 'REGISTRATION';
const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';
const CLEAR = 'CLEAR';
const CREATE_EMPTY_FIELDS_MSG = 'CREATE_EMPTY_FIELDS_MSG';
const DELETE_EMPTY_FIELDS_MSG = 'DELETE_EMPTY_FIELDS_MSG';
const CONFIRM_DATA_FOR_PROPERTY = 'CONFIRM_DATA_FOR_PROPERTY';
const SUCCESS_PROPERTY = 'SUCCESS_PROPERTY';
const CHANGE_LOADING = 'CHANGE_LOADING';
const EMAIL_VERIFICATION = 'EMAIL_VERIFICATION';
const DELETE_EMAIL_VERIFICATION = 'DELETE_EMAIL_VERIFICATION';
const ACTIVATION_SUCCESS = 'ACTIVATION_SUCCESS';
const ACTIVATION_FAIL = 'ACTIVATION_FAIL';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
const USER_LOADED_FAIL = 'USER_LOADED_FAIL';
const RESET_PASSWORD = 'RESET_PASSWORD';

const link = process.env.REACT_APP_MAIN_API;


// const {REACT_APP_MAIN_API} = process.env


const initialState = {
    user: null,
    token: null,
    role: 0,
    message: '',
    auth: false,
    resultMessage: '',
    result: null,
    emptyMessage: '',
    confirmDataProperty: '',
    resultMessageProperty: '',
    resultProperty: null,
    loading: false,
    verifyMessage: ''

};



// reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION: {
            console.log(action.payload.user.user.email);
            if(action.payload.user.user.role === 1) localStorage.setItem('ROLE', 'user');
            localStorage.setItem('USER', action.payload.user.user.email);
            return {
                ...state,
                user: action.payload.user,
                message: action.payload.message,
                role: action.payload.user.user.role,
                auth: true,
            }
        }


        // action  - синх - это флаг или сигнал
        case SAVE_TOKEN: {
            localStorage.setItem("ACCESS", JSON.stringify(action.payload.access));
            localStorage.setItem("REFRESH", JSON.stringify(action.payload.refresh));

            return {
                ...state,
                token: action.payload
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token');
            return initialState;

        }
        case ERROR: {
            return {
                ...state,
                resultMessage: action.payload + "!",
                result: 0
            }
        }

        case SUCCESS: {
            return {
                ...state,
                resultMessage: "Спасибо,  что используете Silkway! Для завершения регистрации введите код, отправленный  на указанный вами электронный адрес",
                result: 1

            }
        }
        case CLEAR: {
            return {
                ...state,
                resultMessage: null,
                result: null

            }
        }
        case CREATE_EMPTY_FIELDS_MSG: {
            return {
                ...state,
                emptyMessage: "Please enter your data"
            }
        }
        case DELETE_EMPTY_FIELDS_MSG: {
            return {
                ...state,
                emptyMessage: ""
            }
        }

        case CONFIRM_DATA_FOR_PROPERTY: {
            console.log("in action I catch" + action.payload)
            return {
                ...state,
                confirmDataProperty: action.payload
            }
        }

        case SUCCESS_PROPERTY: {
            return {
                ...state,
                resultProperty: 1,
                resultMessageProperty: 'Сообщение отправлено. Скоро наш менеджер свяжется с Вами!'

            }
        }

        case CHANGE_LOADING: {
            return {
                ...state,
                loading: !state.loading
            }
        }

        case EMAIL_VERIFICATION: {
            return {
                ...state,
                verifyMessage: action.payload
            }
        }

        case DELETE_EMAIL_VERIFICATION: {
            return {
                ...state,
                verifyMessage: '',
                resultMessageProperty: '',
                resultProperty: null
            }
        }

        case LOGIN_SUCCESS:{
            
            localStorage.setItem("ACCESS", JSON.stringify(action.payload.access));
            localStorage.setItem("REFRESH", JSON.stringify(action.payload.refresh));
            return {
                ...state,
            }
        }
        case USER_LOADED_SUCCESS:{
            console.log("UserInReducer", action.payload)
            return {
                ...state,
                user: action.payload
            }
        }
        // case PASSWORD_RESET_SUCCESS:
        // case PASSWORD_RESET_FAIL:
        // case PASSWORD_RESET_CONFIRM_SUCCESS:
        // case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default :
            return state

    }
}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

// action creator - асинх
export const signUp = (payload,) => {
    return (dispatch) => {
            

            // axios.post(`http://127.0.0.1:8000/auth/users/`, payload)
            axios
            .post(`http://127.0.0.1:8000/auth/users/`, payload)
            .then(({data}) => {
                console.log("rDAta",JSON.stringify(data))
                dispatch({type: REGISTRATION, payload: data});
                dispatch({type: SUCCESS});
                dispatch(getToken(payload));
                dispatch(changeLoading());

            })
            .catch((e) => {
                if (e.message === 'Request failed with status code 400') {
                    console.log("aaa")
                    dispatch({type: ERROR, payload: e})
                    dispatch(changeLoading());


                }
            })
    }
};

export const getToken = (data) => (dispatch) => {
    axios.post(`http://127.0.0.1:8000/auth/token`, data)
        .then(({data}) => {
            console.log(data);
            dispatch({type: SAVE_TOKEN, payload: data})
        })

};

export const logout = () => ({
    type: LOGOUT
});

export const clearData = () => ({
    type: CLEAR
});

export const sendMsgForEmpty = () => ({
    type: CREATE_EMPTY_FIELDS_MSG
});

export const deleteMsgForEmpty = () => ({
    type: DELETE_EMPTY_FIELDS_MSG
});


export const regConfirmProperty = (data) => (dispatch) => {
    console.log("function 2");

    axios.post(`http://127.0.0.1:8000/auth/request-to-register/`, data)
        .then(({data}) => {
            if (data === 'Sent') {
                console.log(data);
                dispatch({type: CONFIRM_DATA_FOR_PROPERTY, payload: data})
                dispatch(changeLoading());
                dispatch({type: SUCCESS_PROPERTY})
            }
        })

};

export const changeLoading = () => ({
    type: CHANGE_LOADING
});


export const confirmEmail = (code) => {
    // let access = localStorage.getItem("ACCESS");
    // access = access.slice(1, (access.length - 1))
    // return (dispatch) => {
    //     axios.get(`http://127.0.0.1:8000/auth/email-verify/${code}/`, {
    //         headers: {'AUTHORIZATION': `JWT ${access}`}
    //     })
    //         .then(({data}) => {
    //             console.log(data.user.email);
    //             if (data.user.email === 'Successfully activated') {
    //                 dispatch({type: EMAIL_VERIFICATION, payload: "Ваш Email был успешно подтвержден!"})
    //             }

    //         })
    //         .catch((e) => {
    //             console.log(e.message)

    //         })
    // }
};

export const deleteVerMessage =()=>({
    type: DELETE_EMAIL_VERIFICATION
})

export const load_user = () => async dispatch => {
    console.log("load_user called", localStorage.getItem('ACCESS'))
    if (localStorage.getItem('ACCESS')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('ACCESS').replace(/"/g, '')}`,
                'Accept': 'application/json'
            }
        }; 

        console.log("ProfileDataRequest", config)

        try {
            const res = await axios.get(`http://127.0.0.1:8000/auth/users/me/`, config);

            const prof = res.data
            console.log("Profile", prof)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: prof
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ email, password });
  
    axios
      .post(`http://127.0.0.1:8000/auth/jwt/create`, body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
  
        dispatch(load_user());
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAIL
        });
      });
  };
  

export const logoutUser =(payload)=>{
    let access = localStorage.getItem("ACCESS");
    access = access.slice(1, (access.length - 1))
    return(dispatch)=>{
        axios.post(`http://127.0.0.1:8000/auth/logout/`, payload, {
            headers: {'AUTHORIZATION': `Bearer ${access}`}
        })
            .then(({data})=>{
                console.log(data)


            })
            .catch((e)=>{
                console.log(e.message)
            })
    }

};


export const resetPassword =(email)=>{
    let obj = {
        "email": email
    };
    return(dispatch)=>{
        axios.post(`http://127.0.0.1:8000/auth/request-reset-password-by-email/`, obj)
            .then(({data})=>{
                console.log(data)
                // dispatch({type:LOGIN, data: data})
                // dispatch(changeLoading());

            })
            .catch((e)=>{
                console.log(e.message)
                // dispatch(changeLoading());

            })
    }
};






