import React, {useState, useEffect} from 'react';
import { Table } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import './itemGrid.css'

function ItemGrid({getData, onItemSelected}) {
    const [itemList, updateList] = useState([]);
    const [loading, updateLoading] = useState(false);
    const [error, updateError] = useState(false);

    useEffect(() => {
      
        updateLoading(true);
        getData()
            .then( (data) => {
                updateList(data);
                updateLoading(false);
             })
            .catch( () => updateError(true))
            }, [getData])

   
    function searchItemInfo(idx) {
        let targetItem = itemList[idx];
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

    
        
        if (error) {
            return <ErrorMessage/>
        }

        if (!itemList || loading) {
            return <div className="load-box"><Spinner/></div> 
        }

        const items = renderItems(itemList);

        

        return (
            
            <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </Table>
           
        );
    
}

export default ItemGrid;