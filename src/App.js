import React from 'react';
import {Route, withRouter} from "react-router-dom";
import './App.css';
import './assets/fonts/fonts.css';
import './fontawesome-free-5.13.0-web/css/all.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Newsfeed from "./components/Newsfeed/Newsfeed";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import RightSidebarContainer from "./components/RightSidebar/RightSidebarContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className="mainContainer">
                <header>
                    <HeaderContainer/>
                </header>
                <main>
                    <article>
                        <div className="wrapper">
                            <aside className="left_sadiebar">
                                <Navbar/>
                            </aside>
                            <div className="content_part">
                                {/*<Route path='/' render={withSuspense(UsersContainer)}/>*/}
                                <Route path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                                <Route path='/Dialogs' render={withSuspense(DialogsContainer)}/>
                                <Route path='/users' render={withSuspense(UsersContainer)}/>
                                <Route path='/Newsfeed' render={() => <Newsfeed/>}/>
                                <Route path='/Music' render={() => <Music/>}/>
                                <Route path='/Settings' render={() => <Settings/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                            </div>
                            <aside className="right_sidebar">
                                <RightSidebarContainer/>
                            </aside>
                        </div>
                    </article>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
