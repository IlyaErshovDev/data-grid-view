import React, {useState, useEffect} from 'react';
import { Table } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import HeadStatusFilter from '../headStatusFilter';
import './itemGrid.css'

function ItemGrid({term, newRec, getData, onItemSelected}) {
    const [itemList, updateList] = useState([]);
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState(false);

    useEffect(() => {
        // updateList([newRec, ...itemList]);
        
        updateLoading(true);
        getData()
            .then( (data) => {
              updateList(data);
              updateLoading(false);
             })
            .catch( () => updateError(true))
            }, [getData]);
    // const checkNewItem = (data) => {
    //     if (newRec) {
    //         updateList(newRec, ...data);
    //         updateLoading(false);
    //     } else {
    //         updateList(data);
    //         updateLoading(false);
    //     }
    // }
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
    
    function filterItems(items, filter) {
        if (filter === 'like') {
          return items.filter(item => item.like )
        } else {
          return items
        }
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
        
        const visibleData = itemSearch([...newRec, ...itemList], term);
        if (visibleData.length === 0 ) {
            return <div className="load-box">
                <h4>По вашему запросу ничего не найдено</h4>
            </div> 
        }
        const items = renderItems(visibleData);

        

        return (
            
            <Table>
            <HeadStatusFilter/>
            <tbody>
              {items}
            </tbody>
          </Table>
           
        );
    
}

export default ItemGrid;