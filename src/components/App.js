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
  let isConfirmPopupOpen = false;
  /* END CONFIRM */

  /* ALL POPUPS */
  const closeAllPopups = (e) => {
    if(e.target === e.currentTarget){
      setAvatarState(false);
      setProfileState(false);
      setAddPlaceState(false);
      //document.querySelector('.popup_opened').classList.remove('popup_opened')
    }
  }
  /* END ALL POPUPS */
  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />
      <PopupWithForm
        children=""
        title="Редактировать аватар"
        type="avatar-edit"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups} />
      <PopupWithForm
        children=""
        title="Редактировать профиль"
        type="profile-edit"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        children=""
        title="Новое место"
        type="new-place"
        buttonText="Добавить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        children=""
        title="Вы уверены?"
        type="confirm"
        buttonText="Да"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
      />
      <ImagePopup />
    </>
  );
}

export default App;