import React from 'react';

const TeamInfo = (props) => {
    const set = new Set([
        'P',
        'C',
        'SS',
        '1B',
        '2B',
        '3B',
        'LF',
        'CF',
        'RF',
        'BN'
    ]);

    const infield = new Set([
        'P',
        'C',
        'SS',
        '1B',
        '2B',
        '3B'
    ]);

    const outfield = new Set(['LF', 'CF', 'RF']);

    //build the printForm into a two dimensional array
    let printForm = [];
    props.playerLists.map((row, i) => {
        printForm.push(Array.from(new Array(props.innings.length), (el, i) => '.'));
    });

    // update the 'P' position from the selection
    props.playerLists.map((row, i) => {
        if (row.isPitcher) {
            printForm[i][parseInt(row.selectedPitchInning) - 1] = 'P';
        }
    });

    // debugger;
    const shuffleArray = (arr) => {
        for (let i = arr.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [
                arr[i - 1],
                arr[j]
            ] = [
                arr[j],
                arr[i - 1]
            ];
        }
        return arr;
    };

    const isValid = (board, i, j, c) => {
        // rowCheck, In each inning the role cannot be duplicate
        for (let row = 0; row < props.playerLists.length; row++) {
            if (board[row][j] == c) {
                return false;
            }
        }

        //colCheck min rule 1
        if (j === 3) {
            // console.log("board is: ", board[i]);
            // console.log("c is: ", c);
            // debugger;
            let min1CheckIn = 0;
            let min1CheckOut = 0;
            let min1CheckBn = 0;
            for (let col = 0; col < 3; col++) {
                if (infield.has(board[i][col])) {
                    min1CheckIn += 1;
                }
                if (outfield.has(board[i][col])) {
                    min1CheckOut += 1;
                }
                // if (board[i][col] === 'BN') {
                //     min1CheckBn += 1;
                // }
            }
            if (infield.has(c)) {
                min1CheckIn += 1;
            }
            if (outfield.has(c)) {
                min1CheckOut += 1;
            }
            // if (c === 'BN') {
            //     min1CheckBn += 1;
            // }
            if (min1CheckIn > 1) {
                min1CheckIn = 2;
            }
            if (min1CheckOut > 0) {
                min1CheckOut = 1;
            }
            if (min1CheckIn + min1CheckOut < 3) {
                return false;
            }
            // console.log("pass check");
        }

        // colCheck min rule 2
        let min2Check = 0;
        for (let col = 0; col < props.innings.length; col++) {
            if (board[i][col] == c) {
                min2Check += 1;
            }
            if (min2Check === 2) {
                return false;
            }
        }

        // colCheck opt rule 1
        let opt1check = 0;
        for (let col = 0; col < props.innings.length; col++) {
            if (board[i][col] === 'BN') {
                opt1check += 1;
            }
            if (opt1check > 2) {
                return false;
            }
        }

        // colCheck opt rule 2
        for (let col = 1; col < props.innings.length; col++) {
            if (board[i][col] == 'BN' && board[i][col - 1] == 'BN') {
                return false;
            }
        }

        // colCheck opt rule 3
        for (let col = 1; col < props.innings.length; col++) {
            if (outfield.has(board[i][col]) && outfield.has(board[i][col - 1])) {
                return false;
            }
        }
        return true;
    }

    // let message;

    let update = (printForm) => {
        // console.log("update printForm: ", printForm);
        // debugger;
        for (let row = 0; row < props.playerLists.length; row++) {
            for (let col = 0; col < props.innings.length; col++) {
                if (printForm[row][col] === '.') {
                    let available = [
                        'C',
                        'SS',
                        '1B',
                        '2B',
                        '3B',
                        'LF',
                        'CF',
                        'RF',
                        'BN'
                    ];
                    available.splice(available.indexOf(props.playerLists[row]['avoidPositions'][0]), 1);
                    available.splice(available.indexOf(props.playerLists[row]['avoidPositions'][1]), 1);
                    available.splice(available.indexOf(props.playerLists[row]['avoidPositions'][2]), 1);
                    available = shuffleArray(available);
                    for (let idx = 0; idx < available.length; idx++) {
                        if (isValid(printForm, row, col, available[idx])) {
                            printForm[row][col] = available[idx];
                            if (update(printForm)) {
                                // console.log(`cood: [${row}][${col}]`);

                                if (row === 0 && col === 1) {
                                    // debugger;
                                    // console.log("finish! at [0][1]");
                                    return printForm;

                                }
                                if (row === 0 && col === 0) {
                                    //here ends the backtracking
                                    // console.log("finish! at [0][0]");
                                    return printForm;
                                }

                                return true;
                            } else {
                                printForm[row][col] = '.';
                            }
                        }
                    }
                    // return false if the entire line is wrong
                    return false;
                }
            }
        }
        return true;
    };

    printForm = update(printForm);
    // debugger;

    let entireTable = [];
    printForm.map((row, i) => {
        let sub = [];
        row.map((col, j) => {
            sub.push(
                <td key={j}>{col}</td>
            );
        });
        // debugger;
        entireTable.push(
            <tr key={i}>
                <td>{props.playerLists[i].name}</td>
                {sub}
            </tr>
        );
    });

    const tableheader = props.innings.map((el, i) => (
        <th key={i}>Inning {el}</th>
    ));

    // debugger;

    return (
        <table className="table table-striped">
            <tbody>
                <tr>
                    <th>Player's Name</th>
                    {tableheader}
                </tr>
                {entireTable}
            </tbody>
        </table>
    );

}

export default TeamInfo;
