import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import registration, {clearData, deleteVerMessage, sendMsgForEmpty, signUp} from "../redux/reducer/authReducer";
import {Link, useNavigate} from "react-router-dom";
import Individual from "../components/registration/Individual";
import Entity from "../components/registration/Entity";
import switchRegTypes, {showEntity, showIndividual, showProperty} from "../redux/reducer/SwitchRegTypesReducer";
import Property from "../components/registration/Property";
import translate from "../i18n/translate";
import {setLocale} from "../redux/reducer/lanReducer";
import {LOCALES} from "../i18n";


// const signUp = async (firstname, lastname, email, password) => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/users/', {
//         // Request payload or data
//         email: email,
//         first_name: firstname,
//         last_name: lastname,
//         password: password
//       });
//       // Handle the response
//       console.log(response.data); // Assuming the server returns JSON data
//     } catch (error) {
//       // Handle error
//       console.error(error);
//     }
//   };

const SignUp = () => {
    const isMenuShown = useSelector(state=>state.store.isMenuShown);


    useEffect(()=>{
        dispatch(showIndividual());
        dispatch(deleteVerMessage());
    },[]);

    const dispatch =  useDispatch();
    const showIndividualFlag = useSelector(state =>state.switchRegTypes.showIndividual);

    useEffect(() => {
        if (localStorage.getItem('lan') === 'ru') {
            dispatch(setLocale(LOCALES.RUSSIAN));
            document.getElementById('lang-small').value = 'RU';
            document.getElementById('lang').value = 'RU'
        } else {
            document.getElementById('lang-small').value = 'ENG';
            document.getElementById('lang').value = 'ENG';
            dispatch(setLocale(LOCALES.ENGLISH))
        }

    }, [showIndividualFlag]);


    return (
        <div className="signup" style={{display : isMenuShown ? 'none' : 'block'}}>
            <h2 className="signup__title">{translate('Выберите тип регистрации :')}</h2>

            <div className="signup__choice">

                <div className="signup__labels">

                    <label className="signup__label">
                        <input type="radio" name="radio"
                               defaultChecked={showIndividualFlag}
                               checked={showIndividualFlag} onClick={()=>dispatch(showIndividual())}/>
                        <span className="signup__span">{translate('Физ лицо')} </span>
                    </label>

                    <label className="signup__label">
                        <input type="radio" name="radio" onClick={()=>dispatch(showEntity())}/>
                        <span className="signup__span">{translate('Юридическое лицо')}</span>
                    </label>

                </div>
            </div>
            <hr className="signup__devide-line"/>

            <Individual/>
            <Entity/>

            <div className="signup__entity-form" style={{display: 'none'}}>
                <input type="text" placeholder="email" className="signup__input"/>
                <input type="text" placeholder="password" className="signup__input"/>
                <button className="signup__btn" onClick={signUp()}>Sign Up</button>
            </div>





        </div>
    );
};

export default SignUp;