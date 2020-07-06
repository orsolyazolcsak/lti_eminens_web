import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import Login from "./Login";
import Test from "./Test";
import Exam from "./components/Exam";
import StartedExam from "./components/StartedExam";
import CurrentQuestion from "./components/CurrentQuestion";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from '@material-ui/core/Menu';

const useStylesAppBar = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

function App() {
    const classesAppBar = useStylesAppBar();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Router>
                <div className={classesAppBar.root}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton edge="start" className={classesAppBar.menuButton} color="inherit"
                                        aria-label="menu" onClick={handleClick}>
                                <MenuIcon/>
                            </IconButton>
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={NavLink} to="/" onClick={handleClose}>Főoldal</MenuItem>
                                <MenuItem component={NavLink} to="/test" onClick={handleClose}>Tesztek</MenuItem>
                                <MenuItem component={NavLink} to="/logout"
                                          onClick={handleClose}>Kijelentkezés</MenuItem>
                            </Menu>
                            <Typography variant="h6" className={classesAppBar.title}>
                                Legyél Te is Eminens
                            </Typography>
                            <Button color="inherit" href="/login">Bejelentkezés</Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.offset} />

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/logout">
                            <Logout/>
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
        </div>
    );
}

function Home() {
    return <h2>Üdvözöllek a főoldalon! Sok sikert! :)</h2>;
}

function Logout() {
    localStorage.clear();
    window.location.href = '/';
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
