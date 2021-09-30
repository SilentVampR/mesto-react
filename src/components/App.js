import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  /* AVATAR */
  const [isEditAvatarPopupOpen, setAvatarState] = useState(false);
  const handleEditAvatarClick = () => {
    setAvatarState(true);
  }
  /* END AVATAR*/

  /* PROFILE */
  const [isEditProfilePopupOpen, setProfileState] = useState(false);
  const handleEditProfileClick = () => {
    setProfileState(true);
  }
  /* END PROFILE */

  /* ADD PLACE */
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const handleAddPlaceClick = () => {
    setAddPlaceState(true);
  }
  /* END ADD PLACE */

  /* CONFIRM */
  const handleChangeId = (evt) => {
    setDeletedCardId(evt.target.value);
  }

  const [isConfirmPopupOpen, setConfirmPopupState] = useState(false);
  const [deletedCard, setDeletedCardId] = useState({cardId: ''});
  const handleDeleteClick = (id) => {
    setConfirmPopupState(true);
    setDeletedCardId({cardId: id});
  }

  /* END CONFIRM */

  /* IMAGE POPUP */
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [selectedCard, setSelectedCardId] = useState({name:'', link: ''});
  const handleCardClick = (item) => {
    setImagePopupState(true);
    setSelectedCardId({name: item.name, link: item.link});
  }
  /* END IMAGE POPUP */

  /* ALL POPUPS */

  const handleOverlayClick = (e) => {
    if(e.target === e.currentTarget){
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setAvatarState(false);
    setProfileState(false);
    setAddPlaceState(false);
    setImagePopupState(false);
    setSelectedCardId({name:'', link: ''});
    setConfirmPopupState(false);
  }
  /* END ALL POPUPS */
  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать аватар"
        type="avatar-edit"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
      >
        <div className="popup__input-container">
          <input type="url" name="avatarUrl" className="popup__input popup__avatar-url" placeholder="Ссылка на изображение" required />
          <span className="popup__text-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm
        title="Редактировать профиль"
        type="profile-edit"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
      >
        <div className="popup__input-container">
          <input type="text" name="profileUserName" className="popup__input popup__input_author_name" placeholder="Имя" required minLength="2" maxLength="40" />
          <span className="popup__text-error"></span>
        </div>
        <div className="popup__input-container">
          <input type="text" name="profileUserAbout" className="popup__input popup__input_author_about" placeholder="О себе" required minLength="2" maxLength="200" />
          <span className="popup__text-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        type="new-place"
        buttonText="Добавить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
      >
        <div className="popup__input-container">
          <input type="text" name="placeName" className="popup__input popup__input_place_name" placeholder="Название" required minLength="2" maxLength="40" />
          <span className="popup__text-error"></span>
        </div>
        <div className="popup__input-container">
          <input type="url" name="placeUrl" className="popup__input popup__input_place_url" placeholder="Ссылка на изображение" required />
          <span className="popup__text-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm
        title="Вы уверены?"
        type="confirm"
        buttonText="Да"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
      >
        <input type="text" name="placeId" className="popup__input popup__input_place_id" value={deletedCard.cardId} onChange={handleChangeId} hidden />
      </PopupWithForm>
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
        onOverlayClick={handleOverlayClick}
      />
    </>
  );
}

export default App;
