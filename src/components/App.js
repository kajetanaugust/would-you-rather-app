import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading'

import Login from "./Login";
import Navigation from "./Navigation";
import NewQuestion from "./NewQuestion";
import Question from "./Question";
import Result from "./Result";
import QuestionList from "./QuestionList";
import Leaderboard from "./Leaderboard";

import { handleInitialData } from "../actions/shared";
import authedUser from "../reducers/authedUser";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {

        const { loading } = this.props
        console.log(loading)
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                        <div className='container'>
                            {
                                loading === true
                                    ?
                                    null
                                    :
                                    <div>
                                        <Navigation id={authedUser}/>
                                        <Route exact path='/' component={QuestionList}/>
                                        <Route path='/login' component={Login} />
                                        <Route path='/new-question' component={NewQuestion} />
                                        <Route path='/leaderboard' component={Leaderboard} />
                                    </div>
                            }
                        </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        loading: authedUser === null
    }
}

export default connect()(App)
