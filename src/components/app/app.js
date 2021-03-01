import React, {Component} from 'react';
import {Jumbotron, Container} from 'reactstrap';
import Header from '../header';
import {SmallAmount, BigAmount} from '../pages';
import ErrorMessage from '../errorMessage';
import DataService from '../../services/dataService';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './app.css';



const InfoBlock = () => {
    return (

        <Jumbotron>
        <h1 className="display-3">Добро пожаловать!</h1>
        <p className="lead">Это страница для отображения данных в виде таблицы. Доступна сортировка по столбцам, клиентская пагинация, фильтрация, вывод подробной информации по клику на элемент, добавление новых записей.</p>
        <hr className="my-2" />
        <p>Выберите объем данных в меню.</p>
        <p className="lead">
        </p>
        </Jumbotron>
    )
}


export default class App extends Component{
    dataService = new DataService();

    state = {
       
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }


   

    render() {

        if(this.state.error) {
            return <Container><ErrorMessage></ErrorMessage></Container>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                         <Switch>
                                    <Route path='/' exact component={InfoBlock}/>
                                    <Route path='/smallAmount' component={SmallAmount} />
                                    <Route path='/bigAmount' component={BigAmount} />
              
                        </Switch>
                    </Container>
                   
                </div>
            </Router>
        );
    }
 
};

