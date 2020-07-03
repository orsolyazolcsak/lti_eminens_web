import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Login from "./Login";
import Test from "./Test";
import Exam from "./components/Exam";
import StartedExam from "./components/StartedExam";
import CurrentQuestion from "./components/CurrentQuestion";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <List component="nav">
                    <ListItem button component="a" href="/">
                        <ListItemText primary="Főoldal"/>
                    </ListItem>
                    <ListItem button component="a" href="/login">
                        <ListItemText primary="Bejelentkezés"/>
                    </ListItem>
                    <ListItem button component="a" href="/test">
                        <ListItemText primary="Tesztek"/>
                    </ListItem>
                </List>

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
                    <CurrentQuestionHelper/>
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

function CurrentQuestionHelper() {
    let {examId} = useParams();
    return <CurrentQuestion examId={examId}/>;
}

function StartedExamHelper() {
    let {examId} = useParams();
    return <StartedExam examId={examId}/>;
}

function Topic() {
    let {topicId} = useParams();
    return <Exam testId={topicId}/>;
}

export default App;
