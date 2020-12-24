import React, {Component} from 'react';
import ItemGrid from '../itemGrid';
import ItemDetails from '../itemDetails';
import ErrorMessage from '../errorMessage';
import DataService from '../../services/dataService';
import SearchPanel from '../searchPannel';


export default class SmallAmount extends Component {
    dataService = new DataService();

    state = {
        selectedItem: null,
        term: '',
        error: false    
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (item) => {
        this.setState({
            selectedItem: item
        })
    }

    onUpdateSearch(term) {
        this.setState({term})
      }

    render() {

        if(this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }
       
        return (
            <>
            <SearchPanel onUpdateSearch = { this.onUpdateSearch }/>
            <ItemGrid onItemSelected={this.onItemSelected}
            getData={this.dataService.getSmallAmount}
            />
            <ItemDetails item={this.state.selectedItem}/>
            </>
        )
    }
}