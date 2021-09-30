import React, {useEffect, useState} from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    api.getUserInfo()
    .then(res => setUser(res))
    .catch(err => {
      console.log(err);
    });
  }, []);
  let myId = user._id;
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getInitialCards()
    .then(res => setCards(res))
    .catch(err => {
      console.log(err);
    });
  }, [])
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__edit-avatar" onClick={props.onEditAvatar}></div>
          <img src={user.avatar} alt={`Аватар пользователя ${user.name}`} className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{user.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__about">{user.about}</p>
        </div>
        <button className="add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((item) => (
          <Card card={item} myId={myId} onCardClick={props.onCardClick} onDeleteClick={props.onDeleteClick} key={item._id} />
        ))}
      </section>
    </main>
  );
}

export default Main;
