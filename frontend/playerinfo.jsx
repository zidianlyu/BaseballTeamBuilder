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
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="SS">SS</option>
                <option value="1B">1B</option>
                <option value="2B">2B</option>
                <option value="3B">3B</option>
                <option value="LF">LF</option>
                <option value="CF">CF</option>
                <option value="RF">RF</option>
            </select>
        );

        let preShow2 = (
            <select value={this.state.pre2} onChange={this.updatePre2}>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="SS">SS</option>
                <option value="1B">1B</option>
                <option value="2B">2B</option>
                <option value="3B">3B</option>
                <option value="LF">LF</option>
                <option value="CF">CF</option>
                <option value="RF">RF</option>
            </select>
        );

        let preShow3 = (
            <select value={this.state.pre3} onChange={this.updatePre3}>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="SS">SS</option>
                <option value="1B">1B</option>
                <option value="2B">2B</option>
                <option value="3B">3B</option>
                <option value="LF">LF</option>
                <option value="CF">CF</option>
                <option value="RF">RF</option>
            </select>
        );

        let avdShow1 = (
            <select value={this.state.avd1} onChange={this.updateAvd1}>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="SS">SS</option>
                <option value="1B">1B</option>
                <option value="2B">2B</option>
                <option value="3B">3B</option>
                <option value="LF">LF</option>
                <option value="CF">CF</option>
                <option value="RF">RF</option>
            </select>
        );

        let avdShow2 = (
            <select value={this.state.avd2} onChange={this.updateAvd2}>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="SS">SS</option>
                <option value="1B">1B</option>
                <option value="2B">2B</option>
                <option value="3B">3B</option>
                <option value="LF">LF</option>
                <option value="CF">CF</option>
                <option value="RF">RF</option>
            </select>
        );

        let avdShow3 = (
            <select value={this.state.avd3} onChange={this.updateAvd3}>
                <option value="P">P</option>
                <option value="C">C</option>
                <option value="SS">SS</option>
                <option value="1B">1B</option>
                <option value="2B">2B</option>
                <option value="3B">3B</option>
                <option value="LF">LF</option>
                <option value="CF">CF</option>
                <option value="RF">RF</option>
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
