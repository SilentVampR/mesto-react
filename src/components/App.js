import React, {useEffect, useState} from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './addPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
  const [currentUser, setCurentUser] = useState({name: '', about : ''});
  useEffect(() => {
    api.getUserInfo()
    .then(res => setCurentUser(res))
    .catch(err => {
      console.log(err);
    });
  }, []);

  /* CARDS */

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getInitialCards()
    .then(res => setCards(res))
    .catch(err => {
      console.log(err);
    });
  }, [])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleDeleteCard = (id) => {
    api.removeCard(id)
      .then(() => {
          const newCards = cards.filter((card) => {
            return card._id !== id;
          });
          setCards(newCards);
        })
      .catch(err => {
        console.log(err);
      });
    closeAllPopups();
  }

  /* END CARDS */

  /* AVATAR */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  /* END AVATAR*/

  /* PROFILE */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  /* END PROFILE */

  /* ADD PLACE */
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  /* END ADD PLACE */

  /* CONFIRM */

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState({cardId:''});
  const handleDeleteClick = (id) => {
    setIsConfirmPopupOpen(true);
    setDeleteId({cardId: id})
  }

  /* END CONFIRM */

  /* IMAGE POPUP */
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name:'', link: ''});
  const handleCardClick = (item) => {
    setIsImagePopupOpen(true);
    setSelectedCard({name: item.name, link: item.link});
  }
  /* END IMAGE POPUP */

  /* ALL POPUPS */

  const handleOverlayClick = (e) => {
    if(e.target === e.currentTarget){
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name:'', link: ''});
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
  }
  /* END ALL POPUPS */

  /* EDIT USER */
  const handleUpdateUser = (data) => {
    api.editUserInfo(data)
      .then(res => setCurentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  /* END EDIT USER */

  /* EDIT AVATAR */

  const handleUpdateAvatar = (url) => {
    api.editAvatar(url)
      .then(res => setCurentUser(res))
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  /* END EDIT AVATAR */

  /* ADD PLACE */
  const handleAddPlace = (data) => {
    api.addNewPlace(data)
      .then(res => setCards([res, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  /* END EDIT AVATAR */


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteClick={handleDeleteClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard}
      />
      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onAddPlace={handleAddPlace}
      />
      <DeleteCardPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        onCardDelete={handleDeleteCard}
        deleteId={deleteId}
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
        onOverlayClick={handleOverlayClick}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
