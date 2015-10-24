/**
 * An Element displays a list of compared monsters
 * Simple Component
 */

import React from 'react';

import Monster from './monster.jsx';

export default React.createClass({

	render() {
		return (<div className="padviewer-monsterWrapper">
			{this.props.monsterList.map((monsterProps)=> <Monster key={monsterProps.id} {...monsterProps} />)}
		</div>);
	}
});