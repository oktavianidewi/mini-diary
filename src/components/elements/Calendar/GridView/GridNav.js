/* eslint react/forbid-prop-types: 0 */
/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import SimpleSvg from 'react-simple-svg';
import moment from 'moment';

import iconNext from '../../../../assets/icons/arrow-right.svg';
import iconPrev from '../../../../assets/icons/arrow-left.svg';


const propTypes = {
	month: PropTypes.instanceOf(Date),
	onPreviousClick: PropTypes.func,
	onNextClick: PropTypes.func
};

export default function GridNav(props) {
	const {
		month: monthDate,
		onPreviousClick,
		onNextClick
	} = props;

	const today = moment();
	const month = moment(monthDate);

	// Determine name of current month
	const monthStr = month.format('MMMM YYYY');

	// Disable "next" button if current month is reached
	const firstDayOfCurrentMonth = today.startOf('month');
	const disableNextButton = month.isSameOrAfter(firstDayOfCurrentMonth);

	return (
		<div className="calendar-nav">
			<button
				type="button"
				className="button-invisible"
				onClick={() => onPreviousClick()}
			>
				<SimpleSvg src={iconPrev} title="Prev. month" height={20} width={20} />
			</button>
			<h1 className="month-name">{monthStr}</h1>
			<button
				type="button"
				className="button-invisible"
				disabled={disableNextButton}
				onClick={() => onNextClick()}
			>
				<SimpleSvg src={iconNext} title="Next month" height={20} width={20} />
			</button>
		</div>
	);
}

GridNav.propTypes = propTypes;