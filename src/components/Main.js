import React, {useEffect, useState} from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [author, getAuthor] = useState([]);
  useEffect(() => {
    api.getUserInfo().then(res => getAuthor(res));
  }, []);
  let myId = author._id;
  const [cards, getCards] = useState([]);
  useEffect(() => {
    api.getInitialCards().then(res => getCards(res))
  }, [])
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__edit-avatar" onClick={props.onEditAvatar}></div>
          <img src={author.avatar} alt={`Аватар пользователя ${author.name}`} className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{author.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__about">{author.about}</p>
        </div>
        <button className="add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        <Card cards={cards} myId={myId} onCardClick={props.onCardClick} onDeleteClick={props.onDeleteClick} />
      </section>
    </main>
  );
}

export default Main;
