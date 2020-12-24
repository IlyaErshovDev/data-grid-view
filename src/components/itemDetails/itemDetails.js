import React, {Component} from 'react';
import Spinner from '../spinner';
import './itemDetails.css';

const Fields = ({item}) => {
    const {description} = item,
    {streetAddress, city, state, zip} = item.address;
    return (
        <ul className="list-group list-group-flush">
            <li className="dark list-group-item d-flex justify-content-between">
                <span className="select-err">Описание</span> <b>:  {description}</b>
            </li>
            <li className="dark list-group-item d-flex justify-content-between">
                <span className="select-err">Адрес проживания: </span> <b> {streetAddress}</b>
            </li>
            <li className="dark list-group-item d-flex justify-content-between">
                <span className="select-err">Город: </span> <b> {city}</b>
            </li>
            <li className="dark list-group-item d-flex justify-content-between">
                <span className="select-err">Провинция/штат: </span> <b> {state}</b>
            </li>
            <li className="dark list-group-item d-flex justify-content-between">
                <span className="select-err">Индекс: </span> <b> {zip}</b>
            </li>
        </ul>
       
    )
};


export default class ItemDetails extends Component {

    constructor() {
        super();
    
        this.state = {
            item: null,
            loading: true,
            error: true,
        }
        this._isMounted = false;
      }
    

    componentDidMount() {
        this.updateItem();
    }

    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {item} = this.props;
        if (!item) {
            return;
        }
       
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({
                loading: true
            })
            this.onItemDetailsLoaded(item);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.item !== prevProps.item) {
            this.updateItem();
        }
    } 
    componentWillUnmount() {
        this._isMounted = false;
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    render() {

        if(!this.state.item) {
            return <span className="select-err">Please, select an item</span>
        }

        const {item} = this.state,
        {firstName, lastName} = item;
        
        if (this.state.loading) {
            return (
                <div className="info-block">
                <Spinner/>
                </div>
            )
        }

        return (
            <div className="info-block">
             <h4>Выбран пользователь:  {firstName} {lastName}</h4>
                
                   <Fields item={item}/>
                
            </div>
        );
    }
}

              