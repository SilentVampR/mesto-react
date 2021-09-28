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
  return (
    props.cards.map((item) => (
      <div className="card" key={item._id}>
        <img src={item.link} alt={item.name} className="card__image" onClick={() => handleImageClick(item)} />
        <button className={`card__delete-button${item.owner._id === props.myId && ' card__delete-button_active'}`} type="button" onClick={() => handleDeleteClick(item._id)}></button>
        <div className="card__footer">
          <h2 className="card__title">{item.name}</h2>
          <div className="card__like-container">
            <button className={`card__like-button${searchLike(item.likes) ? ' card__like-button_active' : ' false_bitch'}`} type="button"></button>
            <p className="card__like-counter">{countLikes(item.likes)}</p>
          </div>
        </div>
      </div>
    ))
  );
}

export default Card;
