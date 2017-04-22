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
            avd_pos: ''
        };
        this.updateName = this.updateName.bind(this);
        this.updateBool = this.updateBool.bind(this);
        this.updateInning = this.updateInning.bind(this);
        this.getTeamInfo = this.getTeamInfo.bind(this);
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

    getTeamInfo(teamDetail) {
        for (let i = 0; i < teamDetail.length; i++) {
            return (<TeamInfo roles={this.props.roles} detail={teamDetail[i]} innings={6}/>);
        }
    }

    render() {
        let teamDetail = this.props.teaminfo.map((el, i) => {
            return (<PlayerInfo key={i} name={el.name} p_bool={el.p_bool} p_inning={el.p_inning} pre={el.pre_pos} avd={el.avd_pos}/>);
        });
        // debugger;
        let arr = [
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ];

        let finalForm = arr.map((el, i) => {
          return (<TeamInfo key={i} roles={this.props.roles} detail={teamDetail[i]} innings={6}/>);
        });

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Picth?</th>
                            <th>Picth Inning</th>
                            <th>Preferred Position</th>
                            <th>Position to Avoid</th>
                        </tr>
                        {teamDetail}
                    </tbody>
                </table>
                <br/>
                <br/>
                <br/>

                <table>
                    <tbody>
                        <tr>
                            <th>Player's Name</th>
                            <th>Inning 1</th>
                            <th>Inning 2</th>
                            <th>Inning 3</th>
                            <th>Inning 4</th>
                            <th>Inning 5</th>
                            <th>Inning 6</th>
                        </tr>
                        {finalForm}
                    </tbody>
                </table>

            </div>
        )
    }
}
