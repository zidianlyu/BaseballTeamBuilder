import React from 'react';

import PlayerInfo from './playerInfo';
import TeamInfo from './teamInfo';

export default class TeamUp extends React.Component {
    state = {
        playerNum: '',
        inningNum: '',
        originInfo: false,
        finalInfo: false,
        availablePitchInnings: [
            1,
            2,
            3,
            4,
            5,
            6
        ],
        playerLists: this.constructTeamLists(3)
    };

    // updatePlayerNum(event) {
    //     debugger;
    //     // this.state.playerLists = this.constructTeamLists(parseInt(event.target.value));
    //     this.setState({player_num: event.target.value});
    // }
    //
    // updateInningNum(event) {
    //     debugger;
    //     // this.state.availablePitchInnings = Array.from(new Array(parseInt(event.target.value)), (val, idx) => idx + 1);
    //     this.setState({inning_num: event.target.value});
    // }
    //
    // buildFinalForm(event) {
    //     this.setState({finalInfo: true});
    // }
    //
    // buildOriginForm(event) {
    //     this.setState({originInfo: true});
    // }

    handleClick(event) {
        window.print();
    }

    constructTeamLists(playerLists) {
        let teamLists = [];

        for (let i = 0; i < playerLists; i++) {
            let pattern = {
                name: `Player ${i + 1}`,
                isPitcher: true,
                selectedPitchInning: `${i + 1}`,
                preferredPositions: [],
                avoidPositions: []
            };
            const allPositions = [
                'P',
                'C',
                'SS',
                '1B',
                '2B',
                '3B',
                'LF',
                'CF',
                'RF',
                'BN'
            ];
            for (let j = 0; j < 3; j++) {
                let prePos = allPositions[Math.floor(Math.random() * allPositions.length)];
                allPositions.splice(allPositions.indexOf(prePos), 1);
                pattern['preferredPositions'].push(prePos)

                let avdPos = allPositions[Math.floor(Math.random() * allPositions.length)];
                allPositions.splice(allPositions.indexOf(avdPos), 1);
                pattern['avoidPositions'].push(avdPos)
            }
            teamLists.push(pattern);
        }
        return teamLists;
    }

    getPositionField(type) {
        switch (type) {
            case "preferred":
                return "preferredPositions";
            case "avoid":
                return "avoidPositions";
            default:
                throw `Error in TeamUp#getPositionField: given type '${type}' does not match a case`;
        }
    }

    updatePosition = (rowIdx, type) => {
        const fieldName = this.getPositionField(type);

        return ((fieldIdx, selection) => {
            const players = this.state.players;
            players[rowIdx][`${fieldName}`][fieldIdx] = selection;

            this.setState({players});
        })
    }

    updateName = (idx) => {
        return ((newName) => {
            const newPlayers = this.state.players;
            newPlayers[idx].name = newName;
            this.setState({players: newPlayers});
        });
    }

    updatePlayerNum = (event) => {
        debugger;
        return ((playerNumber) => {
          debugger;
            this.setState({playerNum: playerNumber});
        });
    }
    updateInningNum = (event) => {
        debugger;
        return ((inningNumber) => {
            this.setState({inningNum: inningNumber});
        });
    }

    updateIsPitcher = (idx) => {
        return ((value) => {
            const players = this.state.players;
            const availablePitchInnings = this.state.availablePitchInnings;

            players[idx].isPitcher = value;

            if (!value) {
                availablePitchInnings.push(players[idx].selectedPitchInning);
                players[idx].selectedPitchInning = 'Not Applicable';
            } else {
                players[idx].selectedPitchInning = availablePitchInnings[0];
                availablePitchInnings.shift();
            }

            this.setState({players, availablePitchInnings});
        })
    }

    updatePitchInning = (idx) => {
        return ((newSelection) => {
            const newPlayers = this.state.players;
            let newInnings = [...this.state.availablePitchInnings];

            if (newSelection !== 'Not Applicable') {
                newSelection = parseInt(newSelection);
                let oldIndex = this.state.availablePitchInnings.indexOf(newSelection);
                newInnings = [
                    ...newInnings.slice(0, oldIndex),
                    ...newInnings.slice(oldIndex + 1)
                ];
            }

            if (newPlayers[idx].selectedPitchInning !== 'Not Applicable') {
                newInnings.push(newPlayers[idx].selectedPitchInning);
            }

            newPlayers[idx].selectedPitchInning = newSelection;

            this.setState({players: newPlayers, availablePitchInnings: newInnings.sort()});
        });
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
                <select className="selectpicker" data-style="btn-primary" value={this.state.playerNum} onChange={this.updatePlayerNum}>
                    <option value="">Please Select</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
        );
    }

    selectInning() {
        debugger;
        return (
            <div className="selector">
                <label>#Innings:
                </label>
                <select className="selectpicker" data-style="btn-primary" value={this.state.inningNum} onChange={this.updateInningNum}>
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

    originForm() {
        let rules = (
            <div className="rules">
                {this.minRules()}
                {this.optRules()}
            </div>
        );

        const playersInfo = this.state.players.map((el, rowIdx) => (<PlayerInfo key={rowIdx} availablePitchInnings={this.state.availablePitchInnings} updatePitchInning={this.updatePitchInning(rowIdx)} updatePreferredPosition={this.updatePosition(rowIdx, "preferred")} updateAvoidPosition={this.updatePosition(rowIdx, "avoid")} updateName={this.updateName(rowIdx)} updateIsPitcher={this.updateIsPitcher(rowIdx)} {...this.state.players[rowIdx]}/>));

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
        const finalInfo = this.state.playerLists.map((el, i) => (<TeamInfo key={i} detail={el} innings={innings}/>));

        const tableheader = Array.from(new Array(parseInt(this.state.inning_num)), (val, idx) => idx + 1).map((el, i) => (
            <th key={i}>Inning {el}</th>
        ));

        return (
            <div>
                <div className="build-page-header">
                    <h1>Your Lineups</h1>
                    <a className="btn btn-primary" href="index.html">Build Again</a>
                </div>
                <div className="final-form reset-btn"></div>
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
        debugger;
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
