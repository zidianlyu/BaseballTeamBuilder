import React from 'react';

import PlayerInfo from './playerinfo';
import TeamInfo from './teaminfo';

export default class TeamUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originInfo: false,
            finalInfo: false,
            player_num: '',
            inning_num: '',
            player_lists:  ''
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
        this.teamLists = this.teamLists.bind(this);
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

    teamLists(players) {
        let teamLists = [];

        for (let i = 0; i < players; i++) {
            let pattern = {
                'name': 'Player',
                'p_bool': 'Yes',
                'p_inning': '1',
                'pre_pos': [
                    'P', 'C', 'SS'
                ],
                'avd_pos': ['1B', '2B', '3B']
            };
            pattern['name'] += i + 1;
            pattern['p_inning'] = i + 1;
            teamLists.push(pattern);
        }
        return teamLists;
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
            <div className="selector">
                <label>#Players:
                </label>
                <select className="selectpicker" data-style="btn-primary" value={this.state.player_num} onChange={this.updatePlayerNum}>
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
            <div className="selector">
                <label>#Innings:
                </label>
                <select className="selectpicker" data-style="btn-primary" value={this.state.inning_num} onChange={this.updateInningNum}>
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
            <div className="rules">
                {this.minRules()}
                {this.optRules()}
            </div>
        );

        const playersInfo = [];
        this.state.player_lists = this.teamLists(parseInt(this.state.player_num));
        this.state.player_lists.map((el, i) => {
            // debugger;
            playersInfo.push(<PlayerInfo key={i} info={this.state.player_lists} idx={i}/>);
        });

        return (
            <div>
                <h1>Build Your Roster</h1>
                <table className="table table-striped">
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

        let details = this.state.player_lists;
        details.map((el, i) => {
            finalInfo.push(<TeamInfo key={i} detail={el} innings={parseInt(this.state.inning_num)}/>);
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
                <table className="table table-striped">
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
        let buildOriginFormBtn = "";
        if (this.state.player_num !== '' && this.state.inning_num !== '') {
            buildOriginFormBtn = (
                <div className="build-player-output">
                    <div className="build-player-btn">
                        <span className="fa fa-arrow-down"></span>
                        <button className="btn btn-primary" onClick={this.buildOriginForm}>Build Player Form</button>
                    </div>
                </div>
            );
        }

        let arrowRightAnimationPlayer = "";

        let arrowRightAnimationInning = "";

        if (this.state.player_num === '') {
            arrowRightAnimationPlayer = (
                <span className="fa fa-arrow-right"></span>
            );
            selectInning = "";
        }

        if (this.state.player_num !== '' && this.state.inning_num === '') {
            arrowRightAnimationPlayer = "";
            arrowRightAnimationInning = (
                <span className="fa fa-arrow-right"></span>
            );
            selectInning = this.selectInning();
        }

        if (this.state.inning_num !== '') {
            arrowRightAnimationInning = "";
        }

        let selector = (
            <div className="jumbotron">
                <h1>Baseball Team Builder</h1>
                <p>This is a gift for the lovely daughter who has a big baseball fans dad</p>
                <div className="select-player">{arrowRightAnimationPlayer}{selectPlayer}</div>
                <div className="select-inning">{arrowRightAnimationInning}{selectInning}</div>
                {buildOriginFormBtn}
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

        let buildFinalFormBtn = "";
        if (originForm !== '') {
            buildFinalFormBtn = (
                <div className="build-final-form-output">
                    <div className="origin-form print-btn">
                        <span className="fa fa-arrow-down"></span>
                        <button className="btn btn-primary" onClick={this.buildFinalForm}>Build Your Lineups</button>
                    </div>
                </div>
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
                <div className="build-print-output">
                    <div className="final-form print-btn">
                        <span className="fa fa-arrow-down"></span>
                        <button className="btn btn-primary" onClick={this.handleClick}>Print Your Lineups</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <div>
                    {selector}
                </div>

                <div className="origin-form">
                    {originForm}
                    {buildFinalFormBtn}
                </div>

                <div className="final-form">
                    {finalForm}
                    {printBtn}
                </div>

                <footer className="footer">
                    <p>© 2017 Zidian Lyu</p>
                </footer>
            </div>
        )
    }
}
