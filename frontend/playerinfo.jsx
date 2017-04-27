import React from 'react';

const PlayerInfo = (props) => {
    const positions = [
        'P',
        'C',
        'SS',
        '1B',
        '2B',
        '3B',
        'LF',
        'CF',
        'RF'
    ];

    const updateName = (event) => {
        props.updateName(event.target.value);
    }

    const updateIsPitcher = (event) => {
        const parsedBool = JSON.parse(event.target.value);
        props.updateIsPitcher(parsedBool);
    }

    const updatePitchInning = (event) => {
        props.updatePitchInning(event.target.value);
    }

    const updatePreferredPosition = (fieldIdx) => {
        return ((event) => {
            props.updatePreferredPosition(fieldIdx, event.target.value);
        });
    }

    const updateAvoidPosition = (fieldIdx) => {
        return ((event) => {
            props.updateAvoidPosition(fieldIdx, event.target.value);
        })
    }

    const positionPreferences = (type, fieldIdx) => {
        const set = new Set(positions);

        props.preferredPositions.forEach((position) => {
            set.delete(position);
        })

        props.avoidPositions.forEach((position) => {
            set.delete(position);
        })
        const options = Array.from(set).sort();

        if (type === "preferred")
            options.unshift(props.preferredPositions[fieldIdx]);
        if (type === "avoid")
            options.unshift(props.avoidPositions[fieldIdx]);

        return options.map((position, idx) => (
            <option key={idx} value={position}>{position}</option>
        ));
    }

    const preferredPositions = (fieldIdx) => {
        return (
            <select value={props.preferredPositions[fieldIdx]} onChange={updatePreferredPosition(fieldIdx)}>
                {positionPreferences("preferred", fieldIdx)}
            </select>
        );
    }

    const avoidPositions = (fieldIdx) => {
        return (
            <select value={props.avoidPositions[fieldIdx]} onChange={updateAvoidPosition(fieldIdx)}>
                {positionPreferences("avoid", fieldIdx)}
            </select>
        );
    }

    const mapBoolToYesNo = (bool) => {
        if (bool)
            return "Yes";
        return "No";
    }

    const availablePitchInnings = () => {
        const innings = [
            props.selectedPitchInning, ...props.availablePitchInnings
        ].sort((a, b) => (a - b));



        return (innings.map((inning, idx) => (
            <option key={idx} value={inning}>{inning}</option>
        )));
    }

    // Returns 'Not Applicable' if props.selectedPitchInning is 'Not Applicable'.
    // Else renders a dropdown selection of available innings.
    const pitchInningComponent = () => {
        if (props.selectedPitchInning === 'Not Applicable') {
            return "Not Applicable";
        }

        return (
            <select value={props.selectedPitchInning} onChange={updatePitchInning}>
                {availablePitchInnings()}
            </select>
        );
    }

    // console.log(mapBoolToYesNo(props.isPitcher));

    return (
        <tr>
            <td>
                <input type="text" value={props.name} onChange={updateName} placeholder="Enter name"></input>
            </td>
            <td>
                <select value={props.isPitcher} onChange={updateIsPitcher}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </td>
            <td>
                {pitchInningComponent()}
            </td>

            <td>
                {preferredPositions(0)}
                {preferredPositions(1)}
                {preferredPositions(2)}
            </td>
            <td>
                {avoidPositions(0)}
                {avoidPositions(1)}
                {avoidPositions(2)}
            </td>
        </tr>
    );
}

export default PlayerInfo;
