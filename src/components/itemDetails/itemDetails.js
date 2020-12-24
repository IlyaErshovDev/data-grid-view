import React, {Component} from 'react';
import Spinner from '../spinner';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="select-err">{label}</span>
            <span>{item[field]}</span>
         </li>
    )
};

export {
    Field
}

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

    onCharDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {getData, itemId} = this.props;
        if (!itemId) {
            return;
        }
       
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({
                loading: true
            })
        getData(itemId)
            .then( this.onCharDetailsLoaded )
            .catch( () => this.onError())
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
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
        {name} = item;
        
        if (this.state.loading) {
            return (
                <div className="info-block">
                <Spinner/>
                </div>
            )
        }

        return (
            <div className="info-block">
             <h4>Имя</h4>
                <ul className="list-group list-group-flush">
                   {
                       React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                       })
                   }
                </ul>
            </div>
        );
    }
}