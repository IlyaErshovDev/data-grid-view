import React, {Component} from 'react';
import Spinner from '../spinner';
import {Container} from 'reactstrap';
import ItemGrid from '../itemGrid';
import ItemDetails from '../itemDetails';
import ErrorMessage from '../errorMessage';
import DataService from '../../services/dataService';
import SearchPanel from '../searchPannel';


export default class SmallAmount extends Component {
    dataService = new DataService();
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            loading: false,
            selectedItem: null,
            term: '',
            error: false    
        };
        this._isMounted = false;
        this.onItemListLoaded = this.onItemListLoaded.bind(this);
        this.onError = this.onError.bind(this);
        this.onItemSelected = this.onItemSelected.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onAddNewRec = this.onAddNewRec.bind(this);
        this.itemSearch = this.itemSearch.bind(this);
        

    }
    
    onItemListLoaded = (itemList) => {
        this.setState({
            itemList,
            loading: false
        })
    }

    componentDidMount() {
        const {getSmallAmount} = this.dataService;
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({
                loading: true
            })
        getSmallAmount()
        .then( this.onItemListLoaded )
        .catch( () => this.onError())
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    onError() {
        this.setState({
            itemList: null,
            error: true
        })
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
    

    itemSearch(items, searchKey) {
        if (searchKey.length === 0 ) {
          return items
        }
        return items.filter(obj => Object.values(obj).some(val => val?val.toString().toLowerCase().includes(searchKey.toString().toLowerCase()):false));
      }

    onAddNewRec(val){
       
        let newRecord = {
                id: val.recId,
                firstName:  val.recFirstName,
                lastName:  val.recLastName,
                email:  val.recEmail,
                phone:  val.recPhone,
        }

        this.setState(({ itemList }) => ({
                itemList: [newRecord, ...itemList],
                }));    
    };
    render() {

        if(this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }
        if (!this.state.itemList || this.state.loading) {
            return <><Container>
                    <SearchPanel onUpdateSearch = { this.onUpdateSearch } onAddNewRec = { this.onAddNewRec }/>
                    </Container>
                     <div className="load-box"><Spinner/></div> </>
           }
            
        const {itemList, term} = this.state,
        visibleItems = this.itemSearch(itemList, term);
        
        return (
            <>
            <Container>
                <SearchPanel onUpdateSearch = { this.onUpdateSearch } onAddNewRec = { this.onAddNewRec }/>
            </Container>
            <Container>
            
                <ItemGrid  itemList = {visibleItems} term = {this.state.term}
                     onItemSelected={this.onItemSelected}/>
            </Container>
            
                <ItemDetails item={this.state.selectedItem}/>
            </>
        )
    }
}