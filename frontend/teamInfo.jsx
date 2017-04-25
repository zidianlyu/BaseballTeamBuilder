import React from 'react';

export default class TeamInfo extends React.Component {
    constructor(props) {
        super(props);
        // debugger;
        let detail = this.props.detail;
        this.state = {
            name: detail.name,
            p_bool: detail.p_bool,
            p_inning: detail.p_inning,
            avd1: detail.avd_pos[0],
            avd2: detail.avd_pos[1],
            avd3: detail.avd_pos[2],
            total_innings: this.props.innings,
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

    removeAvd(turn, role_stack) {
        // debugger;
        let set = new Set([
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

        let infield = new Set([
          'P',
          'C',
          'SS',
          '1B',
          '2B',
          '3B'
        ]);

        let outfield = new Set([
          'LF',
          'CF',
          'RF'
        ]);

        // handle min rule 1 - outfield requirement first
        if(turn === 2){
          if(!role_stack.includes('LF')){
            if(!role_stack.includes('CF')){
              if(!role_stack.includes('RF')){
                return Array.from(outfield);
              }
            }
          }
        }

        // handle min rule 1 - infield requirement first
        if (turn === 3){
          let infield_check = 0;
          role_stack.map((el, i) => {
            if(infield.has(el)){
              infield_check += 1;
            }
          });
          if (infield_check === 0){
            if(role_stack[turn - 1] === 'P'){
              infield.delete('P');
            }
            return Array.from(infield);
          }
        }

        // handle min rule 1 - infield requirement second
        if (turn === 4){
          let infield_check = 0;
          role_stack.map((el, i) => {
            if(infield.has(el)){
              infield_check += 1;
            }
          });
          if (infield_check === 1){
            if(role_stack[turn - 1] === 'P'){
              infield.delete('P');
            }
            return Array.from(infield);
          }
        }



        // remove Picth role from not application player
        if (set.has(this.state.avd1)) {
            set.delete(this.state.avd1);
        }
        if (set.has(this.state.avd2)) {
            set.delete(this.state.avd2);
        }
        if (set.has(this.state.avd3)) {
            set.delete(this.state.avd3);
        }

        // pick from random
        let repeat = {};
        role_stack.map((el, i) => {
          if(repeat[el] > 0){
            repeat[el] += 1;
            if(repeat[el] === 2){
              set.delete(el);
            }
          } else {
            repeat[el] = 1;
          }
        });
        if(role_stack[turn - 1] === 'P'){
          set.delete('P');
        }
        return Array.from(set);
    }

    pickRandom(arr, role_stack, turn) {
        let num = Math.floor(Math.random() * (arr.length));
        role_stack.push(arr[num]);
        if(turn === 6){
          console.log(this.state.name);
          console.log("role stack: ", role_stack);
          // debugger;
        }
        return arr[num];
    }

    render() {
        // debugger;
        let role_stack = [];
        let innings_num = [];
        for (let i = 0; i < parseInt(this.state.total_innings); i++) {
            innings_num.push(i + 1);
        }

        let row = innings_num.map((turn, i) => {
            let pickableArr = this.removeAvd(turn, role_stack);

            if (parseInt(this.state.p_inning) === turn) {
                role_stack.push('P');
                return (
                    <td key={i}>
                        P
                    </td>
                );
            } else {
                return (
                    <td key={i}>
                        {this.pickRandom(pickableArr, role_stack, turn)}
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
