import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    changeLoading,
    clearData,
    confirmEmail,
    deleteVerMessage,
    sendMsgForEmpty,
    signUp
} from "../../redux/reducer/authReducer";
import HotelCard from "../hotels_page/HotelCard";
import translate from "../../i18n/translate";

const Individual = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showIndividual = useSelector(state => state.switchRegTypes.showIndividual);


    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: 'vr3243q44t4g4',
        re_password: 'vr3243q44t4g4'
        // role: 0
    });
    let message = useSelector(state => state.registration.resultMessage);
    let verifyMessage = useSelector(state => state.registration.verifyMessage);
    let result = useSelector(state => state.registration.result);


    useEffect(() => {
        dispatch(clearData());
    }, []);

    // useEffect(() => {
    //     dispatch(setData({email: '', password: '', role:0}));
    // }, [showIndividual]);

    const changeHandler = (e) => {
        setData((pref) => {
            return {
                ...pref, [e.target.name]: e.target.value
            }
        })
    };


    //console.log("my error" + error);
    const emptyMessage = useSelector(state => state.registration.emptyMessage);

    const sendData = (e) => {
        console.log(data);
        if (data.email === '' || data.password === '') {
            dispatch(sendMsgForEmpty());
        } else if (!data.email.includes('@')) {
            console.log("incorrect input")
        } else {
            e.preventDefault();
            // data.role = showIndividual ? 1 : 0;
            dispatch(redirect());
            dispatch(signUp(data))
            console.log("DATA", data)
        }

    };

    const redirect = () => {
        navigate("/")
    }

    console.log('result' + result)
    const loading = useSelector(state => state.registration.loading);



    const emailVerify =(e)=>{
        e.preventDefault();
        const code = document.getElementById('code').value;
        dispatch(confirmEmail(code));
    };

    const redirectHome =()=>{
        dispatch(deleteVerMessage());
        navigate('/')
    }


    return (
        <div style={{display: showIndividual ? 'block' : 'none'}}>
            <h3 className="signup__ind-title">{translate('Регистрация для физического лица')}</h3>
            <form className="signup__user-form">
                <img src={require("../../images/loading.gif")} alt="loading..."
                     style={{display: loading ? 'block' : 'none'}}
                     className="loading"/>

                <p style={{
                    display: result === 0 && data.email !== '' && data.password !== '' ? 'block' : 'none',
                    color: 'red'
                }} className="signup__message">{message}</p>


                <div className="signup__inputs-div">
                    <input required type="text" placeholder="First Name" className="signup__input" value={data.first_name}
                           name="first_name"
                           onChange={changeHandler}/>
                    <input required type="text" placeholder="Last Name" className="signup__input" value={data.last_name}
                           name="last_name"
                           onChange={changeHandler}/>
                    <input required type="email" placeholder="Email" className="signup__input" value={data.email}
                           name="email"
                           onChange={changeHandler}/>
                    <input required type="password" placeholder="Password" className="signup__input" value={data.password}
                           name="password" onChange={changeHandler}/>
                    <input required type="password" placeholder="Confirm Password" className="signup__input" value={data.re_password}
                    name="re_password" onChange={changeHandler}/>
                </div>

                <div className="signup__btn-div">
                    <button onClick={(e) => sendData(e)} type={'submit'} className="signup__btn">{translate('Регистрация')}</button>

                </div>
            </form>

            <div className="signup__message-div"
                 style={{display: result === 0 || result === null || verifyMessage.length ? 'none' : 'block'}}>
                <p className="signup__message" style={{color: result === 1 ? 'green' : 'red'}}>{message}</p>

                <form className="signup__code-div">
                    <input type="text" className="signup__code-input" placeholder="введите код" id='code'/>
                    <button type="submit" className="signup__btn signup__confirm-btn"
                    onClick={(e)=>emailVerify(e)}>{translate('Подтвердить')}</button>
                </form>

            </div>
            <div className="signup__ver-message-div" style={{display : verifyMessage.length ? 'block' : 'none',}}>
                <p style={{color: 'green'}}>{verifyMessage}</p>
                <button className="signup__home-btn"
                onClick={()=>redirectHome()}>{translate('Вернуться на главную')}</button>

            </div>


        </div>
    );
};

export default Individual;