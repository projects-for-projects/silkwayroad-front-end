import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import translate from '../i18n/translate';

const MyArea = () => {
  const isMenuShown = useSelector((state) => state.store.isMenuShown);
  const user = useSelector((state) => state.registration.user); // Access the user data from the Redux store

  console.log("UserInMyArea", user)

  let bookings = [
    // ...
  ];

  return (
    <div className="myarea">
      <div className="myarea__nav" style={{ display: isMenuShown ? 'none' : 'block' }}>
        <ul className="myarea__ul">
          <li className="myarea__first-li">
            <IoPersonCircle className="myarea__person" />
            <p>Личный кабинет</p>
            <p>{user ? `${user.email} (${user.first_name} ${user.last_name})` : ''}</p> {/* Display the user's email, first name, and last name */}
          </li>
          <li className="myarea__li">Мои бронирования</li>
        </ul>
      </div>

      <div className="myarea__bookings">
        {bookings.map((hotel) => {
          return (
            <div className="myarea__booking">
              <h4 className="myarea__hotel-name">
                <span className="myarea__bold">{translate('Отель')}:</span> {hotel.hotel_name}
              </h4>
              <p className="myarea__hotel-dates">
                <span className="myarea__bold">{translate('Даты')}:</span> {hotel.checkin_date}-{hotel.checkout_date}
              </p>
              <p className="myarea__room">
                <span className="myarea__bold">{translate('Номер')}:</span> {hotel.room_name}
              </p>
              <p className="myarea__people-number">
                <span className="myarea__bold">{translate('Количество гостей')}:</span> {hotel.number_of_people}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyArea;
