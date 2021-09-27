import tempImage from '../images/temp_image.jpg';

function ImagePopup() {
  return (
    <div className="popup popup_type_image-overlay">
      <figure className="popup__image-container">
        <img src={tempImage} alt="Нет изображения" className="popup__image" />
      </figure>
    </div>
  );
}

export default ImagePopup;
