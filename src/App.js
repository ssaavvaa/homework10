import { hot } from 'react-hot-loader';
import React from 'react';
import utils from './utils/utils';


class App extends React.Component {
constructor(props){
  super(props);
  this.state = {
  background:localStorage.getItem('back'),
  color:localStorage.getItem('color')
  };
  this.changeBackground = this.changeBackground.bind(this);
}
changeBackground(){
  let back = localStorage.getItem('back') === '#212121'?"white":"#212121";
  let color = localStorage.getItem('color') === 'white'?"black":"white";
  localStorage.setItem('back', back);
  localStorage.setItem('color', color);
  this.setState({background:localStorage.getItem('back')});
  this.setState({color:localStorage.getItem('color')});
}

  render(){
  return (
    <div className='toolbar' style={{background:this.state.background,color:this.state.color}}>
      <button className='toolbar__button' onClick ={this.changeBackground}  data-action='theme-switch'>
        <i className='material-icons toolbar__icon'>
          brightness_3
        </i>

      </button>
      <ul className='menu' id='menu'>
        {utils.map( item =>
      <li key ={item.name} className='menu__item'>
        <div className='card'>
          <img src={item.image} alt={item.name} className='card__image'/>
          <div className='card__content'>
            <h2 className='card__name'>{item.name}</h2>
            <p className='card__price'>
              <i className='material-icons'>
                monetization_on
              </i>
              {item.price} кредитов
            </p>
            <p className='card__descr'>
             {item.description}
            </p>
            <ul className='tag-list'>
            {item.ingredients.map( (ing,idx) => <li key={idx}className='tag-list__item'>{ing}</li>)}
            </ul>
          </div>

          <button className='card__button button'>
            <i className='material-icons button__icon'>
              shopping_cart
            </i>
            В корзину
          </button>
        </div>
      </li>
        )}
      </ul>
    </div>
  );
        }
}

export default hot(module)(App);
