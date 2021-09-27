import tempImage from '../images/temp_image.jpg';
import React, {useEffect, useState} from 'react';
import api from '../utils/api';

function Main({onEditAvatar, onEditProfile, onAddPlace, isOpen}) {
  const [author, getAuthor] = useState([]);
  useEffect(() => {
    api.getUserInfo().then(response => getAuthor(response));
  }, []);
  let myId = author._id;
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__edit-avatar" onClick={onEditAvatar}></div>
          <img src={author.avatar} alt={`Аватар пользователя ${author.name}`} className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{author.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__about">{author.about}</p>
        </div>
        <button className="add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <template id="cardTemplate">
          <div className="card">
            <img src={tempImage} alt="Нет изображения" className="card__image" />
          </div>
        </template>
      </section>
    </main>
  );
}

export default Main;
