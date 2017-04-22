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
        this.infoForm = this.infoForm.bind(this);
        this.finalForm = this.finalForm.bind(this);
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

    infoForm(){
      const playersInfo = [];
      this.props.teaminfo.map((el, i) => {
        playersInfo.push(<PlayerInfo key={i} name={el.name} p_bool={el.p_bool} p_inning={el.p_inning} pre={el.pre_pos} avd={el.avd_pos}/>);
      });
      return playersInfo;
    }

    finalForm(){
      const finalInfo = [];
      let innings = [
          1,
          2,
          3,
          4,
          5,
          6,
          7
      ];
      innings.map((el, i) => {
        finalInfo.push(<TeamInfo key={i} detail={this.infoForm()[i]} innings={6}/>);
      });
      return finalInfo;
    }



    render() {
        // debugger;


        return (
            <div>
                <table >
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Picth?</th>
                            <th>Picth Inning</th>
                            <th>Preferred Position</th>
                            <th>Position to Avoid</th>
                        </tr>
                        {this.infoForm()}
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
                        {this.finalForm()}
                    </tbody>
                </table>

            </div>
        )
    }
}
