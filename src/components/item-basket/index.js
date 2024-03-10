import {memo, useCallback} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import {useLanguage} from '../../localization/language-context'
import texts from '../../localization/texts';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const store = useStore();
  const {language} = useLanguage();

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/info/${props.item._id}`} onClick={callbacks.closeModal}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{texts[language].remove}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  closeModal: propTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  closeModal: () => {}
}

export default memo(ItemBasket);
