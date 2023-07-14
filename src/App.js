import './App.scss';
import Header from "./images/Header";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Ways from "./pages/Ways";
import SmallMenu from "./components/SmallMenu";
import { I18Provider, LOCALES } from "./i18n";
import onError from "./i18n/error";
import { setLocale } from "./redux/reducer/lanReducer";
import axios from 'axios';

function App() {
  const showLogin = useSelector(state => state.store.showLogin);
  const dispatch = useDispatch();
  console.log(showLogin);
  const loading = useSelector(state => state.registration.loading);
  const locale = useSelector(state => state.lanReducer.locale);
  const [details, setDetails] = useState([]);

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

    axios.get('http://127.0.0.1:8000/users/')
      .then(res => {
        setDetails(res.data);
      })
      .catch(console.error());
  }, []);

  return (
    <I18Provider locale={locale} onError={onError}>
      <div className="App"
        style={{
          opacity: loading ? '50%' : '',
        }}>
        <Header />
        <SmallMenu />
        {/* <header>Users From Django</header>
        <hr></hr>
        <div>
          {details.map((output, id) => (
            <div key={id}>
              <div>
                <h4>{output.first_name}</h4>
                <h5>{output.email}</h5>
              </div>
            </div>
          ))}
        </div> */}

        <Ways />
      </div>
    </I18Provider>
  );
}

export default App;
