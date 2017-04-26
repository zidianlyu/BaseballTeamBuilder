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

    const removeAvd = (turn, playerPositionHistory) => {
        // handle min rule 1 - outfield requirement first
        if (turn === 2) {
            if (!playerPositionHistory.includes('LF')) {
                if (!playerPositionHistory.includes('CF')) {
                    if (!playerPositionHistory.includes('RF')) {
                        return Array.from(outfield);
                    }
                }
            }
        }

        // handle min rule 1 - infield requirement first
        if (turn === 3) {
            let infield_check = 0;
            playerPositionHistory.map((el, i) => {
                if (infield.has(el)) {
                    infield_check += 1;
                }
            });
            if (infield_check === 0) {
                if (playerPositionHistory[turn - 1] === 'P') {
                    infield.delete('P');
                }
                return Array.from(infield);
            }
        }

        // handle min rule 1 - infield requirement second
        if (turn === 4) {
            let infield_check = 0;
            playerPositionHistory.map((el, i) => {
                if (infield.has(el)) {
                    infield_check += 1;
                }
            });
            if (infield_check === 1) {
                if (playerPositionHistory[turn - 1] === 'P') {
                    infield.delete('P');
                }
                return Array.from(infield);
            }
        }

        // remove Picth role from not application player
        props.detail.avoidPositions.forEach(el => {
            set.delete(el);
        });

        // pick from random
        let repeat = {};
        playerPositionHistory.map((el, i) => {
            if (repeat[el] > 0) {
                repeat[el] += 1;
                if (repeat[el] === 2) {
                    set.delete(el);
                }
            } else {
                repeat[el] = 1;
            }
        });
        if (playerPositionHistory[turn - 1] === 'P') {
            set.delete('P');
        }
        return Array.from(set);
    }

    const pickRandom = (arr, playerPositionHistory, turn) => {
        let num = Math.floor(Math.random() * (arr.length));
        playerPositionHistory.push(arr[num]);
        return arr[num];
    }

    const row = () => {
        // debugger;
        let playerPositionHistory = [];

        return (props.innings.map((turn, i) => {
            let pickableArr = removeAvd(turn, playerPositionHistory);

            if (parseInt(props.detail.selectedPitchInning) === turn) {
                playerPositionHistory.push('P');
                return (
                    <td key={i}>
                        P
                    </td>
                );
            } else {
                return (
                    <td key={i}>
                        {pickRandom(pickableArr, playerPositionHistory, turn)}
                    </td>
                );
            }
        }));
    }

    return (
        <tr>
            <td>
                {props.detail.name}
            </td>
            {row()}
        </tr>
    );

}

export default TeamInfo;
