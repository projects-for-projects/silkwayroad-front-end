import React from 'react';
import {AiFillCheckCircle} from "react-icons/ai";
import {FaBabyCarriage} from "react-icons/fa";
import Carousel from "react-elastic-carousel";
import {useSelector} from "react-redux";
import star1 from "../icons/1star.svg";
import star2 from "../icons/2star.svg";
import star3 from "../icons/3star.svg";
import star4 from "../icons/4star.svg";
import star5 from "../icons/5star.svg";
import {GiHotMeal} from "react-icons/gi";
import translate from "../i18n/translate";
import {BsCheckAll} from "react-icons/bs";
import {BsFillCaretRightFill} from "react-icons/bs";


const Hotel = () => {
    const currentHotel = useSelector(state => state.searchReducer.chosenHotel);
    let lan = localStorage.getItem('lan');

    let  room_id =  [
        {
            "id": 2,
            "room_name_ru": "Двухместный номер Standard",
            "room_name_en": "Standard double room",
            "room_description_ru": null,
            "room_description_en": null,
            "price": [
                {
                    "id": 2,
                    "price": 36000,
                    "start_date": "2022-05-02",
                    "end_date": "2022-05-31"
                }
            ],
            "category_id": [
                {
                    "id": 1,
                    "room_category_name_ru": "Собственная ванная комната",
                    "room_category_name_en": "Private bathroom"
                },
                {
                    "id": 2,
                    "room_category_name_ru": "Бесплатный Wi-Fi",
                    "room_category_name_en": "Free Wi-Fi"
                },
                {
                    "id": 3,
                    "room_category_name_ru": "Для некурящих",
                    "room_category_name_en": "For non-smokers"
                }
            ],
            "characteristics_id": [],
            "child_capacity": 0
        },
        {
            "id": 1,
            "room_name_ru": "Standard",
            "room_name_en": "Standard",
            "room_description_ru": null,
            "room_description_en": null,
            "price": [
                {
                    "id": 1,
                    "price": 32000,
                    "start_date": "2022-01-01",
                    "end_date": "2022-12-31"
                }
            ],
            "category_id": [
                {
                    "id": 1,
                    "room_category_name_ru": "Собственная ванная комната",
                    "room_category_name_en": "Private bathroom"
                },
                {
                    "id": 2,
                    "room_category_name_ru": "Бесплатный Wi-Fi",
                    "room_category_name_en": "Free Wi-Fi"
                },
                {
                    "id": 3,
                    "room_categoryname_ru": "Для некурящих",
                    "room_category_name_en": "For non-smokers"
                }
            ],
            "characteristics_id": [
                {
                    "id": 1,
                    "name_ru": "Одна кровать",
                    "name_en": "One bad",
                    "capacity": 1
                }
            ],
            "child_capacity": 0
        }
    ]

    return (
        <div className="hotel">
            <div className="container">
                <div className="hotel__container">
                    <h3 className="hotel__title">{lan === 'ru' ? currentHotel?.hotel_name_ru : currentHotel?.hotel_name_en}</h3>
                    <img alt="raiting..." className="hotelCard__raiting"
                         src={currentHotel?.hotel_category[0]?.hotel_category_stars === 1 ?
                             star1 :
                             currentHotel?.hotel_category[0]?.hotel_category_stars === 2 ?
                                 star2 :
                                 currentHotel?.hotel_category[0]?.hotel_category_stars === 3 ?
                                     star3 :
                                     currentHotel?.hotel_category[0]?.hotel_category_stars === 4 ?
                                         star4 :
                                         currentHotel?.hotel_category[0]?.hotel_category_stars === 5 ?
                                             star5 : ''}/>
                    <p className="hotel__address">{lan === 'ru' ? currentHotel?.hotel_address_ru : currentHotel.hotel_address_en}</p>
                    <p className="hotel__description">
                        {lan === 'ru' ? currentHotel?.hotel_description_ru : currentHotel?.hotel_description_en}
                    </p>
                </div>

                <div className="hotel__container hotel__container-fac">

                    {currentHotel?.images.length ?
                        <Carousel className="hotel__carousel" itemsToShow={3} pagination={true}  style={{position: 'relative', width: '60%', padding: '0 !important'}}>
                            {currentHotel?.images?.map((el) => {
                                return <img className="hotel__img" src={`https://silk-travel.herokuapp.com${el.image_url}`} alt="image"/>

                            })}

                        </Carousel> : ''

                    }



                </div>
                <div className="hotel__container hotel__container-fac">


                    <div className="hotel__facilities">
                        <h3 className="hotel__subtitle">{translate('Удобства отеля')}</h3>
                        {
                            currentHotel?.category_id.map((el) => {
                                return <div className="hotel__facility">
                                    <AiFillCheckCircle className ="hotel__room-icon"/> {lan === 'ru' ? el.hotel_category_name_ru : el.hotel_category_name_en}
                                </div>

                            })}
                    </div>

                    <div className="hotel__facilities">
                        <h3 className="hotel__subtitle">{translate('Для детей')}</h3>
                        {
                            currentHotel?.child_service_id.map((el) => {
                                return <div className="hotel__facility">
                                    <FaBabyCarriage className ="hotel__room-icon"/> {lan === 'ru' ? el.name_ru : el.name_en}</div>

                            })}
                    </div>

                    <div className="hotel__facilities">
                        <h3 className="hotel__subtitle">{translate('Питание')}</h3>
                        {currentHotel?.food_category.map((el) => {
                            return <div className="hotel__facility">
                                <GiHotMeal className ="hotel__room-icon"/>{lan === 'ru' ? el.food_category_name_ru : el.food_category_name_en}</div>

                        })}
                    </div>

                    {/*<div className="hotel__facilities">*/}
                    {/*    <h3 className="hotel__subtitle">Ознакомьтесь с отзывами об отеле</h3>*/}
                    {/*    <button className="hotel__comment-btn">Читать все отзывы</button>*/}

                    {/*</div>*/}

                </div>

                <div className="hotel__container">
                    <h3 className="hotel__subtitle">Номера</h3>



                    {currentHotel?.room_id?.map((room)=>{
                        return  <div className="hotel__room-div">
                            <h3 className="hotel__room-title">{lan === 'ru' ? room.room_name_ru : room.room_name_en }</h3>
                            <p className="hotel__price">{translate('Цена')} - {room?.price[0].price}</p>
                            <p>{lan === 'ru' ? room.room_description_ru : room.room_description_en }</p>


                            <div className="hotel__room-fac-div">
                                <div className="hotel__room-fac" style={{display: room?.category_id.length ? 'block' : 'none'}}>
                                    <h3 className="hotel__room-subtitle">{translate('Удобства комнаты')}</h3>
                                    {room?.category_id.map((category)=>{
                                        return <p><BsCheckAll className ="hotel__room-icon"/>{lan==='ru' ? category.room_category_name_ru : category.room_category_name_en }</p>
                                    })}
                                </div>

                                <div className="hotel__room-fac" style={{display: room?.characteristics_id?.length ? 'block' : 'none'}}>
                                    <h3 className="hotel__room-subtitle">{translate('Дополнительное описание')}</h3>
                                    {room?.characteristics_id.map((category)=>{
                                        return <p><BsFillCaretRightFill className ="hotel__room-icon"/>{lan==='ru' ? category.name_ru : category.name_en}</p>
                                    })}
                                </div>

                                    <button className="hotel__book-btn">{translate('Забронировать')}</button>
                            </div>





                        </div>
                    })}


                </div>


            </div>

        </div>
    );
};

export default Hotel;