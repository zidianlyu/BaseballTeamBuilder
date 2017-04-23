import React from 'react';

export default class TeamInfo extends React.Component {
    constructor(props) {
        super(props);
        let detail = this.props.detail;
        // debugger;
        this.state = {
            name: detail.name,
            p_bool: detail.p_bool,
            p_inning: detail.p_inning,
            avd1: detail.avd_pos[0],
            avd2: detail.avd_pos[1],
            avd3: detail.avd_pos[2],
            total_innings: this.props.innings
        };
        // debugger;
        this.removeAvd = this.removeAvd.bind(this);
        this.pickRandom = this.pickRandom.bind(this);
    }

    componentWillUpdate() {
        let update = this.props.detail;
        this.state.name = update.name;
        this.state.p_bool = update.p_bool;
        this.state.p_inning = update.p_inning;
        this.state.avd1 = update.avd_pos[0];
        this.state.avd2 = update.avd_pos[1];
        this.state.avd3 = update.avd_pos[2];
        // debugger;
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
        if (parseInt(this.state.p_bool) !== i) {
            set.delete('P');
        }
        if (set.has(this.state.avd1)) {
            set.delete(this.state.avd1);
        }
        if (set.has(this.state.avd2)) {
            set.delete(this.state.avd2);
        }
        if (set.has(this.state.avd3)) {
            set.delete(this.state.avd3);
        }
        return Array.from(set);
    }

    pickRandom(arr) {
        let num = Math.floor(Math.random() * (arr.length));
        return arr[num];
    }

    render() {
        // debugger;
        let innings_num = []
        for (let i = 0; i < parseInt(this.state.total_innings); i++) {
            innings_num.push(i + 1);
        }

        let row = innings_num.map((el, i) => {
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
//
