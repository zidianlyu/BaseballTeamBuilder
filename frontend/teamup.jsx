import React from 'react';

import PlayerInfo from './playerInfo';
import TeamInfo from './teamInfo';
import NumSelector from './numSelector';

export default class TeamUp extends React.Component {
    state = {
        playerNum: '',
        inningNum: '',
        originInfo: false,
        finalInfo: false,
        availablePitchInnings: [],
        playerLists: this.constructTeamLists(0)
    };

    updateSelectPlayer = () => {
        return ((value) => {
            let playerLists = this.state.playerLists;
            playerLists = this.constructTeamLists(parseInt(value));
            this.setState({playerNum: value, playerLists: playerLists});
        });
    }
    updateSelectInning = () => {
        return ((value) => {
            let availablePitchInnings = this.state.availablePitchInnings;
            availablePitchInnings = Array.from(new Array(parseInt(value)), (val, idx) => (idx + 1));
            this.setState({inningNum: value, availablePitchInnings: availablePitchInnings});
        });
    }

    buildOriginForm = () => {
        return ((event) => {
            this.setState({originInfo: event.target.value});
        });
    }

    buildFinalForm() {
        return ((event) => {
            this.setState({finalInfo: event.target.value});
        });
    }

    handleClick(event) {
        window.print();
    }

    constructTeamLists(playerLists) {
        let teamLists = [];

        for (let i = 0; i < playerLists; i++) {
            let pattern = {
                name: `Player ${i + 1}`,
                isPitcher: false,
                selectedPitchInning: `Not Applicable`,
                preferredPositions: [],
                avoidPositions: []
            };
            const allPositions = [
                'C',
                'SS',
                '1B',
                '2B',
                '3B',
                'LF',
                'CF',
                'RF'
            ];
            for (let j = 0; j < 3; j++) {
                let prePos = allPositions[Math.floor(Math.random() * allPositions.length)];
                allPositions.splice(allPositions.indexOf(prePos), 1);
                pattern['preferredPositions'].push(prePos)

                // if (allPositions.includes('P')) {
                //     allPositions.splice(allPositions.indexOf('P'), 1);
                // }
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
            const playerLists = this.state.playerLists;
            playerLists[rowIdx][`${fieldName}`][fieldIdx] = selection;
            this.setState({playerLists});
        })
    }

    updateName = (idx) => {
        return ((newName) => {
            const newPlayers = this.state.playerLists;
            newPlayers[idx].name = newName;
            this.setState({playerLists: newPlayers});
        });
    }

    updateIsPitcher = (idx) => {
        return ((value) => {
            const playerLists = this.state.playerLists;
            const availablePitchInnings = this.state.availablePitchInnings;

            playerLists[idx].isPitcher = value;

            if (!value) {
                availablePitchInnings.push(playerLists[idx].selectedPitchInning);
                playerLists[idx].selectedPitchInning = 'Not Applicable';
            } else {
                playerLists[idx].selectedPitchInning = availablePitchInnings[0];
                availablePitchInnings.shift();
            }

            this.setState({playerLists, availablePitchInnings});
        })
    }

    updatePitchInning = (idx) => {
        return ((newSelection) => {
            const newPlayers = this.state.playerLists;
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

            this.setState({
                playerLists: newPlayers,
                availablePitchInnings: newInnings.sort((a, b) => a - b)
            });
        });
    }

    minRules() {
        return (
            <div className="min-rules">
                <h1>Minimum Play Rules</h1>
                <p className="min-rules toggle">
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
                    <input type="checkbox" name="" value=""></input>
                    No more than two innings on bench
                </p>
                <p>
                    <input type="checkbox" name="" value=""></input>
                    No innings consecutively on bench
                </p>
                <p>
                    <input type="checkbox" name="" value=""></input>
                    No innings consecutively in outfield
                </p>
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
        const playersInfo = this.state.playerLists.map((el, rowIdx) => (<PlayerInfo key={rowIdx} availablePitchInnings={this.state.availablePitchInnings} updatePitchInning={this.updatePitchInning(rowIdx)} updatePreferredPosition={this.updatePosition(rowIdx, "preferred")} updateAvoidPosition={this.updatePosition(rowIdx, "avoid")} updateName={this.updateName(rowIdx)} updateIsPitcher={this.updateIsPitcher(rowIdx)} {...this.state.playerLists[rowIdx]}/>));

        return (
            <div>
                <h1>Build Your Roster</h1>

                <div className="roles-header">
                    <h3>Baseball Roles</h3>
                </div>
                <table className="table table-striped">
                    <tbody>
                        <tr className="info">
                            <th>P: Pitcher</th>
                            <th>C: Catcher</th>
                            <th>1B: First Baseman</th>
                            <th>2B: Second Baseman</th>
                            <th>3B: Third Baseman</th>
                        </tr>
                        <tr className="warning">
                            <th>SS: Short Stop</th>
                            <th>LF: Left Fielder</th>
                            <th>CF: Center Fielder</th>
                            <th>RF: Right Fielder</th>
                            <th>BN: Bench Player</th>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Pitcher?</th>
                            <th>Inning Pitching</th>
                            <th>Preferred Position(s)</th>
                            <th>Positions to Avoid</th>
                        </tr>
                        {playersInfo}
                    </tbody>
                </table>
                <div className="roles-img">
                    <img className="roles-img one" src="asset/img/baseball_field.png"></img>
                    <img className="roles-img two" src="asset/img/baseball_field_fun.jpg"></img>
                </div>
                {rules}
            </div>
        );
    }

    finalForm() {
        let inningTurn = Array.from(new Array(parseInt(this.state.inningNum)), (val, idx) => idx + 1);

        const finalInfo = (<TeamInfo playerLists={this.state.playerLists} innings={inningTurn}/>);

        return (
            <div>
                <div className="build-page-header">
                    <h1>Your Lineups</h1>
                    <a className="btn btn-primary" href="index.html">Build Again</a>
                </div>
                {finalInfo}
            </div>
        );
    }

    render() {
        // console.log("Rerendering Teamup: ", this.state);

        let buildOriginFormBtn = "";
        if (this.state.playerNum !== '' && this.state.inningNum !== '') {
            buildOriginFormBtn = (
                <div className="build-player-output">
                    <div className="build-player-btn">
                        <span className="fa fa-arrow-down"></span>
                        <button className="btn btn-primary" value={true} onClick={this.buildOriginForm()}>Build Player Form</button>
                    </div>
                </div>
            );
        }

        let selector = (
            <div>
                <div className="jumbotron">
                    <h1>Baseball Roster Builder</h1>

                    <blockquote className="blockquote">
                        <div className="intro-page-motto">
                            <img src="./asset/img/baseball_coach.png"></img>
                            <p className="mb-0">We help your lovely daughter to build a baseball roster</p>
                        </div>
                        <footer className="blockquote-footer">Zidian Lyu from
                            <cite title="Source Title"> Sport School</cite>
                        </footer>
                    </blockquote>
                    <NumSelector updateSelectPlayer={this.updateSelectPlayer()} updateSelectInning={this.updateSelectInning()} numPlayers={this.state.playerNum} numInnings={this.state.inningNum}/>
                    <div>
                        {buildOriginFormBtn}
                    </div>
                </div>
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
                        <button className="btn btn-primary" value={true} onClick={this.buildFinalForm()}>Build Your Lineups</button>
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
