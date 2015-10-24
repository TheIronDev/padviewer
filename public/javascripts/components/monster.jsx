/**
 * An Element that displays some helpful monster-related data
 * Simple Component
 */

import React from 'react';

export default React.createClass({

	render() {
		return (<div className="padviewer-monster">
			Monster {this.props.name}
		</div>);
	}
});