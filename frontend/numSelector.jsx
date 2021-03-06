import React from 'react';

const NumSelector = (props) => {
    const updateSelectPlayer = (event) => {
        props.updateSelectPlayer(event.target.value);
    }

    const updateSelectInning = (event) => {
        props.updateSelectInning(event.target.value);
    }

    const numPlayers = () => {
        return props.numPlayers === ""
            ? "Please Select"
            : props.numPlayers;
    }

    const availablePlayerCounts = () => {
        const availablePlayerCountsArray = [6, 7, 8, 9].map((num) => String(num));
        if (props.numPlayers === "") {
            return [
                "Please Select", ...availablePlayerCountsArray
            ];
        }

        const removeIdx = availablePlayerCountsArray.indexOf(props.numPlayers);
        return [
            props.numPlayers, ...availablePlayerCountsArray.splice(0, removeIdx),
            ...availablePlayerCountsArray.splice(removeIdx + 1)
        ];
    }

    const playerOptions = () => {
        return availablePlayerCounts().map((value, idx) => (
            <option value={value} key={idx}>{value}</option>
        ));
    }

    const selectPlayer = () => {
        return (
            <div className="selector">
                <label>#Players:
                </label>
                <select className="selectpicker" data-style="btn-primary" value={numPlayers()} onChange={updateSelectPlayer}>
                    {playerOptions()}
                </select>
            </div>
        );
    }

    const numInnings = () => {
        return props.numInnings === ""
            ? "Please Select"
            : props.numInnings;
    }

    const availableInningCounts = () => {
        let minNum = parseInt(props.numPlayers);
        // debugger;
        let availableInningCountsArray;
        if (minNum === 6) {
            availableInningCountsArray = [
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12'
            ];
        } else if (minNum === 7) {
            availableInningCountsArray = [
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10'
            ];
        } else if (minNum === 8) {
            availableInningCountsArray = [
                '4',
                '5',
                '6',
                '7',
                '8',
                '9'
            ];
        } else if (minNum === 9) {
            availableInningCountsArray = ['4', '5', '6', '7', '8'];
        }
        // console.log("availableInningCountsArray is: ", availableInningCountsArray);
        if (props.numInnings === "") {
            return [
                "Please Select", ...availableInningCountsArray
            ];
        }

        const removeIdx = availableInningCountsArray.indexOf(props.numInnings);
        return [
            props.numInnings, ...availableInningCountsArray.splice(0, removeIdx),
            ...availableInningCountsArray.splice(removeIdx + 1)
        ];
    }

    const inningOptions = () => {
        return availableInningCounts().map((value, idx) => (
            <option value={value} key={idx}>{value}</option>
        ));
    }

    const selectInning = () => {
        return (
            <div className="selector">
                <label>#Innings:
                </label>
                <select className="selectpicker" data-style="btn-primary" value={numInnings()} onChange={updateSelectInning}>
                    {inningOptions()}
                </select>
            </div>
        );
    }

    let firstPop = selectPlayer();
    let firstPopAnimation = (
        <span className="fa fa-arrow-right"></span>
    );

    let secondPop = "";
    let secondPopAnimation = "";

    if (props.numPlayers !== '') {
        firstPop = (
            <label>#Players: {props.numPlayers}</label>
        );
        firstPopAnimation = "";
        // debugger;
        secondPopAnimation = (
            <span className="fa fa-arrow-right"></span>
        );
        secondPop = selectInning();
    }

    if (props.numInnings !== '' && props.numPlayers !== '') {
        firstPopAnimation = "";
        secondPopAnimation = "";
        secondPop = (
            <label>#Innings: {props.numInnings}</label>
        );
    }

    return (
        <div>
            <div className="select-player">{firstPopAnimation}{firstPop}</div>
            <div className="select-inning">{secondPopAnimation}{secondPop}</div>
        </div>
    );

}

export default NumSelector;
