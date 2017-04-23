import React from 'react';
import ReactDOM from 'react-dom';

import TeamUp from './teamup';

let navbar = (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-headert">
                <button type="button" className="navbar-toggle collapsed">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="index.html">
                    <span className="fa fa-home"></span>
                </a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="index.html">Sign Up</a>
                    </li>
                    <li>
                        <a href="index.html">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

class Root extends React.Component {
    render() {
        return (
            <div className="team">
                {navbar}
                <TeamUp/>
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Root/>, document.getElementById('main'));
});
