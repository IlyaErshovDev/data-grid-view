import React from 'react';
import { Table } from 'reactstrap';
import useSortingFilter from './useSortingFilter';
import './itemGrid.css';

function ItemGrid({ itemList, onItemSelected}) {
   

    const { sortedItems, requestSort, sortConfig } = useSortingFilter(itemList);

        const getClassNamesFor = (name) => {
            if (!sortConfig) {
            return;
            }
            return sortConfig.key === name ? sortConfig.direction : undefined;
        };

    function searchItemInfo(idx) {
        let targetItem = sortedItems[idx];
        onItemSelected(targetItem);
    };

    

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

        if (itemList.length === 0 ) {
            return <div className="load-box">
                <h4>По вашему запросу ничего не найдено</h4>
            </div> 
        }
        
        
        const finalItems = renderItems(sortedItems);

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