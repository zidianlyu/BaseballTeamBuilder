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

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/buildForm.png)

### PrintForm

- Page View

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/printForm.png)

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

- 1. Update the player number and inning number from user input

- 1. Pass Back to the parent elements

- 1. Update the parent state (props)

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

- Initialize the player form by assigning random preferred roles and avoid rules

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/build_form_1.png)

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/build_form_2.png)
```javascript

```





- Ensure the modified data is updated

  - update the player_lists in BuildForm

    ```javascript
    componentWillUpdate() {
      let update = this.props.detail;
      this.state... = update....;
    }
````

- Use algorithm to assign roles to player

  - make 'P' a must:

    ```javascript
    if (parseInt(this.state.p_bool) !== i) {
      set.delete('P');
    }
    // render()
      if (parseInt(this.state.p_inning) === el) {
        return (
            <td key={i}>
                P
            </td>
        );
    }
    ```

  - exclude avoid positions:

    ```javascript
    if (set.has(avoid_position)) {
      set.delete(avoid_position);
    }
    ```

  - assign position by random:

    ```javascript
    pickRandom(available_positions) {
        let num = Math.floor(Math.random() * (available_positions.length));
        return available_positions[num];
    }
    ```

#### Generate Print Form

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
