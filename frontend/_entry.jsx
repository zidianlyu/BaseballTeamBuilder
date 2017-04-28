import React from 'react';
import ReactDOM from 'react-dom';

import TeamUp from './teamup';

const navbar = (
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

const loader = [(
        <div id="loading">
            <div id="loading-center">
                <div id="loading-center-absolute">
                    <div className="object-animation-one" id="first_object"></div>
                    <div className="object-animation-one" id="second_object"></div>
                    <div className="object-animation-one" id="third_object"></div>
                    <div className="object-animation-one" id="forth_object"></div>
                </div>
            </div>
        </div>
    ), (
        <div id="loading">
            <div id="loading-center">
                <div id="loading-center-absolute">
                    <div className="object-animation-two" id="object_one"></div>
                    <div className="object-animation-two" id="object_two"></div>
                    <div className="object-animation-two" id="object_three"></div>
                    <div className="object-animation-two" id="object_four"></div>
                </div>
            </div>
        </div>
    ), (
      <div id="loading">
          <div id="loading-center">
              <div id="loading-center-absolute-three">
                  <div className="object-animation-three" id="object_uno"></div>
                  <div className="object-animation-three" id="object_dos"></div>
                  <div className="object-animation-three" id="object_tre"></div>
                  <div className="object-animation-three" id="object_qua"></div>
              </div>
          </div>
      </div>
    )];

class Root extends React.Component {
    render() {
        return (
            <div className="team">
                {loader[Math.floor(Math.random() * loader.length)]}
                {navbar}
                <TeamUp loader={loader}/>
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Root/>, document.getElementById('main'));
})
