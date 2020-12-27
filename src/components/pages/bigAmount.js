import React, {Component} from 'react';
import Spinner from '../spinner';
import {Container} from 'reactstrap';
import Pagination from '../pagination/pagination';
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
            currentItems: [],
            totalPages: null,
            currentPage: null,
            selectedItem: null,
            term: '',
            error: false    
        };
        this.pageLimit = 50;
        this._isMounted = true;
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
        const {getBigAmount} = this.dataService;
        
        if (this._isMounted) {
            this.setState({
                loading: true
            })
            getBigAmount()
        .then( this.onItemListLoaded )
        .catch( () => this.onError())
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onСhangingPageNum = (data) => {
        const {itemList, term } = this.state,
        visibleItems = this.itemSearch(itemList, term),
        // const targetItems = !visibleItems.length ? itemList : visibleItems;  
        
        { currentPage, totalPages, pageLimit } = data,
        offset = (currentPage - 1) * pageLimit,
        currentItems = visibleItems.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentItems, totalPages });
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
        const visibleItems = this.itemSearch(this.state.itemList, term);
        const currentItems = visibleItems.slice(0, this.pageLimit),
        totalPages =  Math.ceil(visibleItems.length / this.pageLimit);
        this.setState({ currentPage: 1, currentItems, totalPages });

        this.setState({term});

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

        this.setState(({ itemList, currentItems }) => ({
                itemList: [newRecord, ...itemList],
                currentItems: [newRecord, ...currentItems],
                totalPages: Math.ceil([newRecord, ...itemList].length / this.pageLimit)
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
            
            const {itemList, currentItems, currentPage, totalPages, term, } = this.state,
            visibleItems = this.itemSearch(itemList, term),
            totalItems = visibleItems.length;

        return (
            <>
            <Container>
                <SearchPanel onUpdateSearch = { this.onUpdateSearch } onAddNewRec = { this.onAddNewRec }/>
            </Container>
            <Container>
            <div className="w-100 px-2 py-3 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h3 className="text-dark py-2 pr-4 m-0 border-gray border-right">
                Всего записей: <strong className="text-secondary">{totalItems}</strong> 
              </h3>
              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Страница <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination term = {this.state.term} totalRecords={totalItems} pageLimit={this.pageLimit} pageNeighbours={1} onPageChanged={this.onСhangingPageNum} />
            </div>
          </div>
                <ItemGrid  itemList = {currentItems} 
                     onItemSelected={this.onItemSelected}/>
            </Container>
            
                <ItemDetails item={this.state.selectedItem}/>
            </>
        )
    }
}