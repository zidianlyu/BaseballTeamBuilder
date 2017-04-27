# BUILD YOUR DREAM ROSTER

[LIVE][roster]

- Author: Zidian Lyu
- Apr-2017
- Credit to: Nick Gassmann && The Harker School

## Overviews

### Introduction

- Page View

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/intro.png)

### BuildForm

- Page View

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/build_form.png)

### PrintForm

- Page View

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/print_form.png)

## Features && Implementations

### Framework

- This project is built on [React.js](https://facebook.github.io/react/)
- Webpack dependencies

  ```javascript
  "babel-core": "^6.24.1",
  "babel-loader": "^7.0.0",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-react": "^6.24.1",
  "lodash": "^4.17.4",
  "react": "^15.5.4",
  "react-dom": "^15.5.4",
  "react-redux": "^5.0.4",
  "react-router": "^4.1.1",
  "redux": "^3.6.0",
  "webpack": "^2.4.1",
  "webpack-dev-server": "^2.4.2"
  ```

### Page Structure

- Homepage

  - loader
  - navbar
  - main content

    - intro section
    - build form section
    - print form section

### Component Managements

- Add event listener on DOM content

  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Root/>, document.getElementById('main'));
  });
  ```

- Build Component By Part: Separate the table into parts to make the codes easily to read and update

  ```html
  <PlayerInfo/>
  <TeamInfo/>
  <NumSelector/>
  ...
  ```

### Logic and Tests

#### Selector

- Update the player number and inning number from user input

- Pass Back to the parent elements

- Update the parent state (props)

```javascript
//trigger the update in option tag
<select
className="selectpicker"
data-style="btn-primary"
value={numPlayers()}
onChange={updateSelectPlayer}>
//child component
const updateSelectPlayer = (event) => {
    props.updateSelectPlayer(event.target.value);
}
//update the parent and related state
updateSelectPlayer = () => {
    return ((value) => {
        let playerLists = this.state.playerLists;
        playerLists = this.constructTeamLists(parseInt(value));
        this.setState({playerNum: value, playerLists: playerLists});
    });
}
```

#### Build Player Form

- Assign Pitcher

  - if yes, then active the Inning Pitching
  - if no, return "Not Applicable"
  - Selection-exclude algorithm

    - update the selected pitching

    - update the available pitch innings stack

    - display the current selection at the top

    - put the remaining at the bottom and sort

    ```javascript
    return ((newSelection) => {
        const newPlayers = this.state.playerLists;
        let newInnings = [...this.state.availablePitchInnings];

        if (newSelection !== 'Not Applicable') {
            newSelection = parseInt(newSelection);
            let oldIndex = this.state.availablePitchInnings.indexOf(newSelection);
            newInnings = [
                ...newInnings.slice(0, oldIndex),
                ...newInnings.slice(oldIndex + 1)
            ];
        }

        if (newPlayers[idx].selectedPitchInning !== 'Not Applicable') {
            newInnings.push(newPlayers[idx].selectedPitchInning);
        }

        newPlayers[idx].selectedPitchInning = newSelection;

        this.setState({playerLists: newPlayers, availablePitchInnings: newInnings.sort()});
    });
    ```

    - exclude taken options

    ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/select_exclude.png)

- Initialize the player form by assigning random preferred roles and avoid rules

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/build_form_1.png)

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/build_form_2.png)

this is achieve by random select role from array for each player exclude it from stack if picked to ensure no repeat can happen

```javascript
  const allPositions = ['P','C',...];
  let prePos = allPositions[Math.floor(Math.random() * allPositions.length)];
  allPositions.splice(allPositions.indexOf(prePos), 1);
```

- For Updates on specific position

  - Locate the change; return the index and content

  - update the state

```javascript
  const fieldName = this.getPositionField(type);
  return ((fieldIdx, selection) => {
      const playerLists = this.state.playerLists;
      playerLists[rowIdx][`${fieldName}`][fieldIdx] = selection;
      this.setState({playerLists});
  })
```

- Ensure the modified data is updated

  - update the playerLists in BuildForm
  - update according to the input data change
  - construct the team lists with player details

    ```javascript
    updateSelectPlayer = () => {
        return ((value) => {
            let playerLists = this.state.playerLists;
            playerLists = this.constructTeamLists(parseInt(value));
            this.setState({playerNum: value, playerLists: playerLists});
        });
    }
    ```


#### Generate Print Form

- handle the minimum rule 1
  - Applying Pigeon Hole Principle:
    - satisfy the outfield minimum requirement
      - up to inning turn 2, if the player still not have a outfield role, assign it to the player

    - satisfy the infield minimum requirement
      - up to inning turn 3, if the player still not have any infield role, assign one to him
      - up to inning turn 4, if the player have less than 2 infield roles, assign one more

    - sample code:

    ```javascript
    if (turn === 2) {
      if (!playerPositionHistory.includes('LF')) {
        if (!playerPositionHistory.includes('CF')) {
          if (!playerPositionHistory.includes('RF')) {
            return Array.from(outfield);
          }
        }
      }
    }
    ```

- handle the minimum rule 2
  - check the player's previous innings role
  - if find a role that was assign by twice, then remove that role from the assignable list

  ```javascript
  let repeat = {};
  playerPositionHistory.map((el, i) => {
      if (repeat[el] > 0) {
          repeat[el] += 1;
          if (repeat[el] === 2) {
              assignableList.delete(el);
          }
      } else {
          repeat[el] = 1;
      }
  });
  ```

- handle the option rule 1
  - check the bench inning in player's previous role, if bench role exists for more than twice, then remove it from the assignable list

- handle the option rule 2
  - check the player's previous assigned role, if the last role is 'BN', then remove it from the assignable list


### Styling

- Applied styling elements from [Bootstrap](http://getbootstrap.com/)

- Designed page icon

- Designed page loader and pick random random page-loader

  ```html
        <div className="object-animation-one" id="first_object"></div>
        <div className="object-animation-one" id="second_object"></div>
        <div className="object-animation-one" id="third_object"></div>
        <div className="object-animation-one" id="forth_object"></div>
  ```

  ```javascript
    loader[Math.floor(Math.random() * loader.length)]
  ```

- Designed animation to give the user more guidelines

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/arrow_animation.png)

  the animation is done by implementing CSS:

  ```javascript
  @-webkit-keyframes bounceRight {
    0%, 20%, 60%, 100% {
        -webkit-transform: translateY(0);
    }
    ...
  }
  ```

- Read and hide component

  - assign component to variable and switch them base on condition

    ```javascript
    // JS
    if (originForm !== "") {
      selector = "";
      buildOriginFormBtn = ...;
    }
    ```

    ```javascript
    // HTML
    <div>
    {selector}
    {originForm}
    {buildOriginFormBtn}
    <div>
    ```

## Future Implementations

### Database

- Apply MySQL or PostgreSQL to store the user information

### User Authentication

- The user can login or signup

### Real Time News

- Update the realtime news from the latest sport's report

[roster]: https://zidianlyu.github.io/BaseballTeamBuilder/
