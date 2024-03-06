import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({item, onAddInCart}) {

  // Счётчик товара в корзине
  const [count, setCount] = useState(0);

  const callbacks = {
    onAddInCart: () => {
      setCount(count + 1);
      item.count += 1;
      onAddInCart(item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-price'>{item.price.toLocaleString()} ₽</div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddInCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAddInCart: PropTypes.func,
};

Item.defaultProps = {
  onAddInCart: () => {
  }
}

export default React.memo(Item);
