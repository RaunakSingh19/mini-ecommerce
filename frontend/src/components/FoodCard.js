import "./FoodCard.css";

const FoodCard = ({ food }) => {
  return (
    <div className="food-card">
      <div className="food-image-container">
        <img src={food.image} alt={food.name} />
        <div className="food-badge">★ 4.5</div>
      </div>

      <div className="food-info">
        <div className="food-header">
          <h3>{food.name}</h3>
          <span className="food-category">Main Course</span>
        </div>
        
        <div className="food-footer">
          <p className="food-price">₹{food.price}</p>
          <button className="add-btn">
            <span>+</span> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;