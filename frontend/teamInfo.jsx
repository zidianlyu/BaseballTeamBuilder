import React from 'react';

export default class TeamInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.detail.props.name,
            p_inning: this.props.detail.props.p_inning,
            innings: this.props.innings
        };
        this.removeAvd = this.removeAvd.bind(this);
        this.pickRandom = this.pickRandom.bind(this);
    }

    removeAvd(i) {
        let set = new Set([
            'P',
            'C',
            'SS',
            '1B',
            '2B',
            '3B',
            'LF',
            'CF',
            'RF'
        ]);

        // remove Picth role from not application player
        if (parseInt(this.state.p_inning) !== i) {
            set.delete('P');
        }
        if (set.has(this.props.detail.props.avd[0])) {
            set.delete(this.props.detail.props.avd[0]);
        }
        if (set.has(this.props.detail.props.avd[1])) {
            set.delete(this.props.detail.props.avd[1]);
        }
        if (set.has(this.props.detail.props.avd[2])) {
            set.delete(this.props.detail.props.avd[2]);
        }
        return Array.from(set);
    }

    pickRandom(arr) {
        let num = Math.floor(Math.random() * (arr.length));
        return arr[num];
    }

    render() {
        let inning_th = [
            1,
            2,
            3,
            4,
            5,
            6
        ];
        let row = inning_th.map((el, i) => {
            let pickableArr = this.removeAvd(el);
            if (parseInt(this.state.p_inning) === el) {
                return (
                    <td key={i}>
                        P
                    </td>
                );
            } else {
                return (
                    <td key={i}>
                        {this.pickRandom(pickableArr)}
                    </td>
                );
            }
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
