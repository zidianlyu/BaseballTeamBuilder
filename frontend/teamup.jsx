import React from 'react';

import PlayerInfo from './playerinfo';
import TeamInfo from './teaminfo';

export default class TeamUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            p_bool: '',
            p_inning: '',
            pre_pos: '',
            avd_pos: '',
            originInfo: false,
            finalInfo: false,
            player_num: '',
            inning_num: ''
        };
        this.updateName = this.updateName.bind(this);
        this.updateBool = this.updateBool.bind(this);
        this.updateInning = this.updateInning.bind(this);
        this.updatePlayerNum = this.updatePlayerNum.bind(this);
        this.updateInningNum = this.updateInningNum.bind(this);
        this.buildOriginForm = this.buildOriginForm.bind(this);
        this.buildFinalForm = this.buildFinalForm.bind(this);
        this.originForm = this.originForm.bind(this);
        this.finalForm = this.finalForm.bind(this);
        this.selectPlayer = this.selectPlayer.bind(this);
        this.selectInning = this.selectInning.bind(this);
        this.minRules = this.minRules.bind(this);
        this.optRules = this.optRules.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    updateName(event) {
        this.setState({name: event.target.value});
    }

    updateBool(event) {
        this.setState({p_bool: event.target.value});
    }

    updateInning(event) {
        this.setState({p_inning: event.target.value});
    }

    updatePlayerNum(event) {
        this.setState({player_num: event.target.value});
    }

    updateInningNum(event) {
        this.setState({inning_num: event.target.value});
    }

    buildFinalForm(event) {
        this.setState({finalInfo: true});
    }

    buildOriginForm(event) {
        this.setState({originInfo: true});
    }

    handleClick(event) {
        window.print();
    }

    minRules() {
        return (
            <div className="min-rules">
                <h1>Minimum Play Rules</h1>
                <p>
                    <span className="fa fa-toggle-on"></span>
                    AA Division
                </p>

                <p>
                    <span className="fa fa-dot-circle-o"></span>
                    Rule 1 Players must play a minimum of 2 innings in the infield and 1 inning in the outfield for games lasting 4+ innings
                </p>

                <p>
                    <span className="fa fa-dot-circle-o"></span>
                    Rule 2 Players cannot play in the same position more than two times in a game
                </p>
            </div>
        );
    }

    optRules() {
        return (
            <div className="opt-rules">
                <h1>Optional Roster Rules</h1>
                <p>
                    <span className="fa fa-check-square-o"></span>
                    No more than two innings on bench
                </p>
                <p>
                    <span className="fa fa-check-square-o"></span>
                    No innings consecutively on bench
                </p>
                <p>
                    <span className="fa fa-square-o"></span>
                    No innings consecutively in outfield
                </p>
            </div>
        );
    }

    selectPlayer() {
        return (
            <div>
                <label>How Many Players</label>
                <select value={this.state.player_num} onChange={this.updatePlayerNum}>
                    <option value="">Please Select</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
        );
    }

    selectInning() {
        return (
            <div>
                <label>How Many Innings</label>
                <select value={this.state.inning_num} onChange={this.updateInningNum}>
                    <option value="">Please Select</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
        );
    }

    originForm() {
        let rules = (
            <div>
                {this.minRules()}
                {this.optRules()}
            </div>
        );
        const playersInfo = [];
        this.props.teaminfo.map((el, i) => {
            playersInfo.push(<PlayerInfo key={i} name={el.name} p_bool={el.p_bool} p_inning={el.p_inning} pre={el.pre_pos} avd={el.avd_pos}/>);
        });
        return (
            <div>
                <h1>Build Your Roster</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Picth?</th>
                            <th>Picth Inning</th>
                            <th>Preferred Position</th>
                            <th>Position to Avoid</th>
                        </tr>
                        {playersInfo}
                    </tbody>
                </table>
                {rules}
            </div>
        );
    }

    finalForm() {
        const finalInfo = [];

        let players_num = Array.apply(null, {
            length: parseInt(this.state.player_num)
        }).map(Number.call, Number);

        let innings_num = Array.apply(null, {
            length: parseInt(this.state.inning_num)
        }).map(Number.call, Number);

        let detail = this.originForm().props.children[1].props.children.props.children[1];

        players_num.map((el, i) => {
            finalInfo.push(<TeamInfo key={i} detail={detail[i]} innings={parseInt(this.state.inning_num)}/>);
        });

        let tableheader = [];
        innings_num.map((el, i) => {
            tableheader.push(
                <th key={i}>Inning {el + 1}</th>
            );
        });

        return (
            <div>
                <h1>Your Lineups</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Player's Name</th>
                            {tableheader}
                        </tr>
                        {finalInfo}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        // debugger;
        let selectPlayer = this.selectPlayer();
        let selectInning = this.selectInning();
        let selector = (
            <div>
                <h1>Build Your Roster</h1>
                {selectPlayer}
                {selectInning}
            </div>
        );

        let originForm = "";
        if (this.state.originInfo !== false) {
            originForm = this.originForm();
        }

        let finalForm = "";
        if (this.state.finalInfo !== false) {
            finalForm = this.finalForm();
        }

        let buildOriginFormBtn = "";
        if (this.state.player_num !== '' && this.state.inning_num !== '') {
            buildOriginFormBtn = (
                <button onClick={this.buildOriginForm}>Build Player Form</button>
            );
        }

        let buildFinalFormBtn = "";
        if (originForm !== '') {
            buildFinalFormBtn = (
                <button onClick={this.buildFinalForm}>Build Your Lineups</button>
            );
        }

        if (originForm !== "") {
            selector = "";
            buildOriginFormBtn = "";
        }

        let printBtn;
        if (finalForm !== "") {
            originForm = "";
            buildFinalFormBtn = "";
            printBtn = (
                <button onClick={this.handleClick}>Print Your Lineups</button>
            );
        }

        return (
            <div>
                <nav>
                    <div className="navbar-left">
                        <p>
                            <a href="index.html">Home</a>
                        </p>
                    </div>
                    <div className="navbar-right">
                        <p>
                            <a href="index.html">Sign Up</a>
                            <a href="index.html">Login</a>
                        </p>
                    </div>
                </nav>
                <div>
                    {selector}
                </div>

                <div>
                    {buildOriginFormBtn}
                    {originForm}
                </div>

                <div>
                    {buildFinalFormBtn}
                    {finalForm}
                    {printBtn}
                </div>
            </div>
        )
    }
}
