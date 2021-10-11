import React, {useEffect, useState} from 'react';
import api from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getInitialCards()
    .then(res => setCards(res))
    .catch(err => {
      console.log(err);
    });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__edit-avatar" onClick={props.onEditAvatar}></div>
          <img src={currentUser.avatar} alt={`Аватар пользователя ${currentUser.name}`} className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((item) => (
          <Card card={item} onCardClick={props.onCardClick} onDeleteClick={props.onDeleteClick} key={item._id} onCardLike={handleCardLike} />
        ))}
      </section>
    </main>
  );
}

export default Main;
