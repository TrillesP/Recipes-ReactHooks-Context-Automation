import { useNavigate } from 'react-router-dom';
import drinkIcon from '../images/cocktail.png';
import mealIcon from '../images/food.png';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer data-testid="footer">
      <img
        src={ drinkIcon }
        alt="drinks"
        data-testid="drinks-bottom-btn"
        onClick={ () => navigate('/drinks') }
        aria-hidden="true"
        style={ { maxWidth: '50px' } }
      />

      <img
        src={ mealIcon }
        alt="foods"
        data-testid="meals-bottom-btn"
        onClick={ () => navigate('/meals') }
        aria-hidden="true"
        style={ { maxWidth: '50px' } }
      />
    </footer>
  );
}