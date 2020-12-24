import React, {Component} from 'react';
import { Button, Input, Form} from 'reactstrap';
import './searchPannel.css';

export default class SearchPanel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        term: ''
      }
      this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }
    onValChange(e) {
        this.setState({
            term: e.target.value
        })
    } 
    onUpdateSearch(e) {
        e.preventDefault();
        if (this.state.term) {
          this.props.onUpdateSearch(this.state.term);
          this.setState({
            term: ''
          })
        }
    }
    render() {
      return (
          
            <Form className="search-panel d-flex" onSubmit = {this.onUpdateSearch}>
                <Input
                type = "text"
                name="search-input"
                className="search-input"
                placeholder = "Поиск"
                onChange = {this.onValChange}
                value = {this.state.term}
                //   
                />
                <Button color="secondary" type="submit">Найти</Button>
                <Button color="success">Добавить</Button>
            </Form>
            
        
      )
    }
}