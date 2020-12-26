import React, {useState, useEffect} from 'react';
import { Table } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import useSortingFilter from './useSortingFilter';
import './itemGrid.css';

function ItemGrid({term, newRec, getData, onItemSelected}) {
    const [itemList, updateList] = useState([]);
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState(false);
    const { items, requestSort, sortConfig } = useSortingFilter(itemList);
        const getClassNamesFor = (name) => {
            if (!sortConfig) {
            return;
            }
            return sortConfig.key === name ? sortConfig.direction : undefined;
        };

    useEffect(() => {
        updateLoading(true);
        getData()
            .then( (data) => {
              updateList(data);
              updateLoading(false);
             })
            .catch( () => updateError(true))
            }, [getData]);

    function searchItemInfo(idx) {
        let targetItem = visibleData[idx];
        onItemSelected(targetItem);
    };

    function itemSearch(items, searchKey) {
        if (searchKey.length === 0 ) {
          return items
        }
        return items.filter(obj => Object.values(obj).some(val => val?val.toString().toLowerCase().includes(searchKey.toString().toLowerCase()):false));
      }
    

   function renderItems(data) {
        
        return data.map((item, index) => {
            const {id, firstName, lastName, email, phone} = item;
        
            return (
                
                <tr className="pointer" key={index} onClick={() => searchItemInfo(index)}>
                    <th scope="row">{id}</th>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                </tr>
               
            )
        })
    }

    
        
        if (error) {
            return <ErrorMessage/>
        }

        if (!itemList || loading) {
            return <div className="load-box"><Spinner/></div> 
        }
        
        
        const visibleData = itemSearch([...newRec, ...items], term);
        if (visibleData.length === 0 ) {
            return <div className="load-box">
                <h4>По вашему запросу ничего не найдено</h4>
            </div> 
        }
        
        const finalItems = renderItems(visibleData);

        

        return (
            
            <Table>
            <thead>
              <tr>
                <th
                    onClick={() => requestSort('id')}
                    className={getClassNamesFor('id')}
                >id</th>
                <th
                    onClick={() => requestSort('firstName')}
                    className={getClassNamesFor('firstName')}
                >First Name</th>
                <th
                    onClick={() => requestSort('lastName')}
                    className={getClassNamesFor('lastName')}
                >Last Name</th>
                <th
                    onClick={() => requestSort('email')}
                    className={getClassNamesFor('email')}
                >Email</th>
                <th
                    onClick={() => requestSort('phone')}
                    className={getClassNamesFor('phone')}
                >Phone</th>
              </tr>
            </thead>
            <tbody>
              {finalItems}
            </tbody>
          </Table>
           
        );
    
}

export default ItemGrid;