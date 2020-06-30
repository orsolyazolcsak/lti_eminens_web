import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route, useRouteMatch,
    Link, useParams
} from "react-router-dom";
import Login from "./Login";
import Test from "./Test";
import Exam from "./components/Exam";
import StartedExam from "./components/StartedExam";
import CurrentQuestion from "./components/CurrentQuestion";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/test">Test</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/test">
                        <Test/>
                    </Route>
                    <Route path="/exam">
                        <Topics/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function Topics() {
    let match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${match.path}/currentQuestion/:examId`}>
                    <CurrentQuestionHelper />
                </Route>
                <Route path={`${match.path}/new/start/:examId`}>
                    <StartedExamHelper/>
                </Route>
                <Route path={`${match.path}/new/:topicId`}>
                    <Topic/>
                </Route>
            </Switch>
        </div>
    )
}

function CurrentQuestionHelper(){
    let {examId} = useParams();
    return <CurrentQuestion examId={examId}/>;
}
function StartedExamHelper(){
    let {examId} = useParams();
    return <StartedExam examId={examId}/>;
}

function Topic() {
    let {topicId} = useParams();
    return <Exam testId={topicId}/>;
}

export default App;
