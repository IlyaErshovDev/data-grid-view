import React, {Component} from 'react';
import {Collapse, Button, Input, Form, FormGroup, Label} from 'reactstrap';
import './searchPannel.css';

export default class SearchPanel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchKey: '',
        recId: '',
        recFirstName: '',
        recLastName: '',
        recEmail: '',
        recPhone: '',
        isOpen: false,
        disabled: true
      }
      this.onUpdateSearch = this.onUpdateSearch.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.onToggle = this.onToggle.bind(this);
      this.handleFormChange = this.handleFormChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);


    }
    onToggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    handleFormChange() {
        const {recId, recFirstName, recLastName, recEmail, recPhone} = this.state;
        if (recId !== '' && recFirstName !== '' && recLastName !== '' 
        && recEmail !== '' && recPhone !== ''){
            this.onToggleVisible(false);
        } else {
            this.onToggleVisible(true);
        }
      };
    onToggleVisible(val) {
        this.setState({
            disabled: val
        })
    };
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        this.handleFormChange();
    };
     onFormSubmit(e) {
        e.preventDefault();
        const {recId, recFirstName, recLastName, recEmail, recPhone} = this.state;
          this.props.onAddNewRec({recId, recFirstName, recLastName, recEmail, recPhone});
          this.setState({
            recId: '',
            recFirstName: '',
            recLastName: '',
            recEmail: '',
            recPhone: '',
          });
          this.onToggle();
          this.onToggleVisible(true);
    };

    onUpdateSearch(e){
        e.preventDefault();
        this.props.onUpdateSearch(this.state.searchKey);
        this.setState({
            searchKey: ''
        })
    }

    render() {
       
      return (
          <>
            <Form className="search-panel d-flex" onSubmit = {this.onUpdateSearch}>
                <Input
                type = "text"
                name="searchKey"
                className="search-input"
                placeholder = "Поиск"
                onChange = {this.handleInputChange}
                value = {this.state.term}
                //   
                />
                <Button color="secondary" type="submit">Найти</Button>
                <Button color="success" onClick={this.onToggle}>Добавить</Button>
            </Form>
             <Collapse isOpen={this.state.isOpen}>
             <Form className="search-panel input-form d-flex" onSubmit = {this.onFormSubmit}>
             <FormGroup>
                <Label for="Id">id</Label>
                <Input type="number" name="recId" id="Id" placeholder="Идентификатор"
                    value={this.state.recId}  onChange = {this.handleInputChange} />
             </FormGroup>
             <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input type="text" name="recFirstName" id="firstName" placeholder="Имя"
                value={this.state.recFirstName}  onChange = {this.handleInputChange}/>
             </FormGroup>
             <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input type="text" name="recLastName" id="lastName" placeholder="Фамилия"
                value={this.state.recLastName}  onChange = {this.handleInputChange}/>
             </FormGroup>
             <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="recEmail" id="exampleEmail" placeholder="Email"
                value={this.state.recEmail}  onChange = {this.handleInputChange}/>
             </FormGroup>
             <FormGroup>
                <Label for="phone">Phone</Label>
                <Input type="text" name="recPhone" id="phone" placeholder="phone"
                value={this.state.recPhone}  onChange = {this.handleInputChange}/>
             </FormGroup>
             <div className="break"></div>
             <Button disabled={this.state.disabled} className="sub-btn" color="success" type="submit">Добавить в таблицу</Button>
            </Form>
           </Collapse>
            
        </>
      )
    }
}