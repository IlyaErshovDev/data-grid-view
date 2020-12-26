import React, {Component} from 'react';
import ItemGrid from '../itemGrid';
import {Container} from 'reactstrap';
import ItemDetails from '../itemDetails';
import ErrorMessage from '../errorMessage';
import DataService from '../../services/dataService';
import SearchPanel from '../searchPannel';


export default class BigAmount extends Component {
    dataService = new DataService();
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            term: '',
            newRec: [],
            error: false    
        };
        this.onItemSelected = this.onItemSelected.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onAddNewRec = this.onAddNewRec.bind(this);

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

    onAddNewRec(val){
       
        let newRecord = {
                id: val.recId,
                firstName:  val.recFirstName,
                lastName:  val.recLastName,
                email:  val.recEmail,
                phone:  val.recPhone,
        }

        this.setState(({ newRec }) => ({
                    newRec: [newRecord, ...newRec],
                }));    
    };
    render() {

        if(this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }
      
        return (
            <>
            <Container>
                <SearchPanel onUpdateSearch = { this.onUpdateSearch } onAddNewRec = { this.onAddNewRec }/>
            </Container>
            <Container>
                <ItemGrid term = {this.state.term} newRec = {this.state.newRec} onItemSelected={this.onItemSelected}
                getData={this.dataService.getBigAmount}
                />
            </Container>
            
                <ItemDetails item={this.state.selectedItem}/>
            </>
        )
    }
}