import React, {Component} from 'react';
import ItemGrid from '../itemGrid';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import DataService from '../../services/dataService';
// import RowBlock from '../rowBlock'


export default class SmallAmount extends Component {
    dataService = new DataService();

    state = {
        selectedItem: 0,
        error: false    
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }
    render() {

        if(this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }

        const itemsList = (
            <ItemGrid onItemSelected={this.onItemSelected}
            getData={this.dataService.getSmallAmount}
            />
        );

       
        return (
            <>
            <ItemGrid onItemSelected={this.onItemSelected}
            getData={this.dataService.getSmallAmount}
            />
            <ItemDetails itemId={this.state.selectedItem}>
                <Field field = 'firstName' label = 'Выбран пользователь'/>
                <Field field = 'description' label = 'Описание'/>
                <Field field = 'adress.streetAddress' label = 'Адрес проживания'/>
                <Field field = 'culture' label = 'Город'/>
                <Field field = 'culture' label = 'Провинция/штат'/>
                <Field field = 'culture' label = 'Индекс'/>
            </ItemDetails>
            </>
        )
    }
}