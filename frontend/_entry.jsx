import React from 'react';
import ReactDOM from 'react-dom';

import TeamUp from './teamup';

let teamLists=[
  {
    'name':'Jack',
    'p_bool':'Yes',
    'p_inning':'2',
    'pre_pos':['P', '1B', '2B'],
    'avd_pos':['C', 'RF','LF']
  },
  {
    'name':'James',
    'p_bool':'No',
    'p_inning':'no',
    'pre_pos':['P', '3B', 'CF'],
    'avd_pos':['1B', 'C','LF']
  },
  {
    'name':'Jully',
    'p_bool':'Yes',
    'p_inning':'3',
    'pre_pos':['C', 'RF', ''],
    'avd_pos':['2B', 'CF','LF']
  },
  {
    'name':'Eric',
    'p_bool':'Yes',
    'p_inning':'6',
    'pre_pos':['SS', '2B', 'RF'],
    'avd_pos':['1B', 'C','LF']
  },
  {
    'name':'Kevin',
    'p_bool':'Yes',
    'p_inning':'1',
    'pre_pos':['2B', '3B', '1B'],
    'avd_pos':['RF', 'C','LF']
  },
  {
    'name':'Austin',
    'p_bool':'Yes',
    'p_inning':'4',
    'pre_pos':['P', 'C', 'SS'],
    'avd_pos':['1B', '2B','3B']
  },
  {
    'name':'Clara',
    'p_bool':'No',
    'p_inning':'no',
    'pre_pos':['C', '3B', 'RF'],
    'avd_pos':['1B', '2B','LF']
  },
];

let roles = new Set([
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


class Root extends React.Component{
  render(){
    return(
      <div className="team">
        <TeamUp teaminfo={teamLists} roles={roles}/>
      </div>
    );
  }
}



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
