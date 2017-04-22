import React from 'react';

export default class TeamInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.detail.props.name,
            innings: this.props.innings,
        };
        this.removeAvd = this.removeAvd.bind(this);
        this.pickRandom = this.pickRandom.bind(this);
    }

    removeAvd() {
        let set = this.props.roles;
        set.delete(this.props.detail.props.avd[0]);
        set.delete(this.props.detail.props.avd[1]);
        set.delete(this.props.detail.props.avd[2]);
        return Array.from(set);
    }

    pickRandom(arr) {
        let num = Math.floor(Math.random() * (arr.length));
        return arr[num];
    }

    render() {

        let pickableArr = this.removeAvd();

        let arr = [1, 2, 3, 4, 5, 6];
        let row = arr.map((el, i) => {
          return(
            <td key={i}>
                {this.pickRandom(pickableArr)}
            </td>
          );
        });



        return (
            <tr>
                <td>
                    {this.state.name}
                </td>
                {row}
            </tr>
        )
    }
}
