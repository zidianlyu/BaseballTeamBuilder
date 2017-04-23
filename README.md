# BUILD YOUR DREAM ROSTER

[LIVE][roster]

[roster]: <https://zidianlyu.github.io/BaseballTeamBuilder/>

- Author: Zidian Lyu
- Apr-2017

## Overviews

### Introduction Page

```
- Page View

  <img src="https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/intro.png" align="center" width="400">
```

### BuildForm Page

- Page View

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/buildForm.png)

### PrintForm Page

- Page View

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/printForm.png)

## Plans & MVP

### Mockup Scratch (credit to: Nick Gassmann & The Harker School)

- Choosing Page

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/scratch_1.png)

- Final Form Page

  ![](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/scratch_2.png)

### Framework

- This project is built on [React.js](https://facebook.github.io/react/)

## Features && Implementations

### Styling

- Applied styling elements from [Bootstrap](http://getbootstrap.com/)
- Designed page icon

  ![page icon](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/favicon.png)

- Designed animation to give the user more guidelines

  ![page icon](https://github.com/zidianlyu/BaseballTeamBuilder/blob/master/asset/img/arrow_animation.png)

  the animation is done by implementing CSS:

  ```javascript
  @-webkit-keyframes bounceRight {
    0%, 20%, 60%, 100% {
        -webkit-transform: translateY(0);
    }
    ...
  }
  ```

## Future Implementations

### Database

- Apply MySQL or PostgreSQL to store the user information

### User Authentication

- The user can login or signup

### Real Time News

- Update the realtime news from the latest sport's report
