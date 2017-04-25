import React from 'react';

export default class PlayerInfo extends React.Component {
    constructor(props) {
        super(props);
        // debugger;
        this.state = {
            name: this.props.info[this.props.idx].name,
            p_bool: this.props.info[this.props.idx].p_bool,
            p_inning: this.props.info[this.props.idx].p_inning,
            pre1: this.props.info[this.props.idx].pre_pos[0],
            pre2: this.props.info[this.props.idx].pre_pos[1],
            pre3: this.props.info[this.props.idx].pre_pos[2],
            avd1: this.props.info[this.props.idx].avd_pos[0],
            avd2: this.props.info[this.props.idx].avd_pos[1],
            avd3: this.props.info[this.props.idx].avd_pos[2]
        };
        this.updateName = this.updateName.bind(this);
        this.updateBool = this.updateBool.bind(this);
        this.updateInning = this.updateInning.bind(this);
        this.updatePre1 = this.updatePre1.bind(this);
        this.updatePre2 = this.updatePre2.bind(this);
        this.updatePre3 = this.updatePre3.bind(this);
        this.updateAvd1 = this.updateAvd1.bind(this);
        this.updateAvd2 = this.updateAvd2.bind(this);
        this.updateAvd3 = this.updateAvd3.bind(this);
    }

    updateName(event) {
        this.props.info[this.props.idx].name = event.target.value;
        this.setState({name: event.target.value});
    }

    updateBool(event) {
        this.props.info[this.props.idx].p_bool = event.target.value;
        this.setState({p_bool: event.target.value});
    }

    updateInning(event) {
        this.props.info[this.props.idx].p_inning = event.target.value;
        this.setState({p_inning: event.target.value});
    }

    updatePre1(event) {
        this.props.info[this.props.idx].pre_pos[0] = event.target.value;
        this.setState({pre1: event.target.value});
    }

    updatePre2(event) {
        this.props.info[this.props.idx].pre_pos[1] = event.target.value;
        this.setState({pre2: event.target.value});
    }

    updatePre3(event) {
        this.props.info[this.props.idx].pre_pos[2] = event.target.value;
        this.setState({pre3: event.target.value});
    }

    updateAvd1(event) {
        // debugger;
        this.props.info[this.props.idx].avd_pos[0] = event.target.value;
        this.setState({avd1: event.target.value});
    }
    updateAvd2(event) {
        // debugger;
        this.props.info[this.props.idx].avd_pos[1] = event.target.value;
        this.setState({avd2: event.target.value});
    }
    updateAvd3(event) {
        // debugger;
        this.props.info[this.props.idx].avd_pos[2] = event.target.value;
        this.setState({avd3: event.target.value});
    }

    pre1() {
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
        if (set.has(this.state.pre2)) {
            set.delete(this.state.pre2);
        }
        if (set.has(this.state.pre3)) {
            set.delete(this.state.pre3);
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
        let remain = Array.from(set);
        let result = [];
        remain.map((el, i) => {
            result.push(
                <option key={i} value={el}>{el}</option>
            );
        });
        return result;
    }

    pre2() {
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
        if (set.has(this.state.pre1)) {
            set.delete(this.state.pre1);
        }
        if (set.has(this.state.pre3)) {
            set.delete(this.state.pre3);
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
        let remain = Array.from(set);
        let result = [];
        remain.map((el, i) => {
            result.push(
                <option key={i} value={el}>{el}</option>
            );
        });

        return result;
    }

    pre3() {
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
        if (set.has(this.state.pre1)) {
            set.delete(this.state.pre1);
        }
        if (set.has(this.state.pre2)) {
            set.delete(this.state.pre2);
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
        let remain = Array.from(set);
        let result = [];
        remain.map((el, i) => {
            result.push(
                <option key={i} value={el}>{el}</option>
            );
        });
        return result;
    }

    avd1() {
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
        if (set.has(this.state.pre1)) {
            set.delete(this.state.pre1);
        }
        if (set.has(this.state.pre2)) {
            set.delete(this.state.pre2);
        }
        if (set.has(this.state.pre3)) {
            set.delete(this.state.pre3);
        }
        if (set.has(this.state.avd2)) {
            set.delete(this.state.avd2);
        }
        if (set.has(this.state.avd3)) {
            set.delete(this.state.avd3);
        }
        let remain = Array.from(set);
        let result = [];
        remain.map((el, i) => {
            result.push(
                <option key={i} value={el}>{el}</option>
            );
        });
        return result;
    }

    avd2() {
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
        if (set.has(this.state.pre1)) {
            set.delete(this.state.pre1);
        }
        if (set.has(this.state.pre2)) {
            set.delete(this.state.pre2);
        }
        if (set.has(this.state.pre3)) {
            set.delete(this.state.pre3);
        }
        if (set.has(this.state.avd1)) {
            set.delete(this.state.avd1);
        }
        if (set.has(this.state.avd3)) {
            set.delete(this.state.avd3);
        }
        let remain = Array.from(set);
        let result = [];
        remain.map((el, i) => {
            result.push(
                <option key={i} value={el}>{el}</option>
            );
        });
        return result;
    }

    avd3() {
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
        if (set.has(this.state.pre1)) {
            set.delete(this.state.pre1);
        }
        if (set.has(this.state.pre2)) {
            set.delete(this.state.pre2);
        }
        if (set.has(this.state.pre3)) {
            set.delete(this.state.pre3);
        }
        if (set.has(this.state.avd1)) {
            set.delete(this.state.avd1);
        }
        if (set.has(this.state.avd2)) {
            set.delete(this.state.avd2);
        }
        let remain = Array.from(set);
        let result = [];
        remain.map((el, i) => {
            result.push(
                <option key={i} value={el}>{el}</option>
            );
        });
        return result;
    }

    render() {
        // debugger;

        let pitchInning;
        if (this.state.p_bool === 'No') {
            pitchInning = "Not Applicable";
        } else {
            pitchInning = (
                <select value={this.state.p_inning} onChange={this.updateInning}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            );
        }

        let preShow1 = (
            <select value={this.state.pre1} onChange={this.updatePre1}>
              {this.pre1()}
            </select>
        );

        let preShow2 = (
            <select value={this.state.pre2} onChange={this.updatePre2}>
              {this.pre2()}
            </select>
        );

        let preShow3 = (
            <select value={this.state.pre3} onChange={this.updatePre3}>
              {this.pre3()}
            </select>
        );

        let avdShow1 = (
            <select value={this.state.avd1} onChange={this.updateAvd1}>
              {this.avd1()}
            </select>
        );

        let avdShow2 = (
            <select value={this.state.avd2} onChange={this.updateAvd2}>
              {this.avd2()}
            </select>
        );

        let avdShow3 = (
            <select value={this.state.avd3} onChange={this.updateAvd3}>
              {this.avd3()}
            </select>
        );

        return (
            <tr>
                <td>
                    <input type="text" value={this.state.name} onChange={this.updateName} placeholder={"Enter name"}></input>
                </td>
                <td>
                    <select value={this.state.p_bool} onChange={this.updateBool}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </td>
                <td>
                    {pitchInning}
                </td>

                <td>
                    {preShow1}
                    {preShow2}
                    {preShow3}
                </td>
                <td>
                    {avdShow1}
                    {avdShow2}
                    {avdShow3}
                </td>
            </tr>
        )
    }
}
