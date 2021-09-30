function Card(props) {
  const countLikes = (array) => {
    return array.length;
  }
  const searchLike = (array) => {
    for(let i = 0; i < array.length; i ++){
      if(array[i]._id === props.myId){
        return true;
      }
    }
  }
  const handleImageClick = (item) => {
    props.onCardClick(item);
  }
  const handleDeleteClick = (id) => {
    props.onDeleteClick(id);
  }
  const card = props.card;
  return (
    <div className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={() => handleImageClick(card)} />
      <button className={`card__delete-button${card.owner._id === props.myId && ' card__delete-button_active'}`} type="button" onClick={() => handleDeleteClick(card._id)}></button>
      <div className="card__footer">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={`card__like-button${searchLike(card.likes) ? ' card__like-button_active' : ' false_bitch'}`} type="button"></button>
          <p className="card__like-counter">{countLikes(card.likes)}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
