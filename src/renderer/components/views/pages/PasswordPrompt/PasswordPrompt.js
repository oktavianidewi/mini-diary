import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { translations } from '../../../../helpers/i18n';
import Banner from '../../../elements/Banner';
import StartPage from '../StartPage';

const propTypes = {
	decryptErrorMsg: PropTypes.string.isRequired,
	decryptFile: PropTypes.func.isRequired,
	decryptStatus: PropTypes.string.isRequired
};

export default class PasswordPrompt extends PureComponent {
	constructor() {
		super();

		this.state = {
			password: ''
		};

		// Function bindings
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			isSubmitted: false,
			password: e.target.value
		});
	}

	/**
	 * Test decrypting the diary file with the provided password. On success, save the password and
	 * the decrypted diary entries to the Redux store. Otherwise, throw an error
	 */
	onSubmit(e) {
		e.preventDefault();
		const { decryptFile } = this.props;
		const { password } = this.state;

		// Try to decrypt the diary file - this.props.decryptStatus will be updated depending on whether
		// decryption was successful or unsuccessful
		decryptFile(password);

		// Display error if password is incorrect
		this.setState({
			isSubmitted: true
		});

		// Select entered password if it is incorrect
		this.input.select();
	}

	render() {
		const { decryptErrorMsg, decryptStatus } = this.props;
		const { isSubmitted, password } = this.state;

		return (
			<StartPage>
				<form className="password-prompt-form" onSubmit={this.onSubmit}>
					<input
						type="password"
						value={password}
						onChange={this.onChange}
						placeholder={translations.password}
						autoFocus // eslint-disable-line jsx-a11y/no-autofocus
						required
						ref={i => {
							this.input = i;
						}}
					/>
					<button type="submit" className="button button-main">
						{translations.unlock}
					</button>
				</form>
				<div className="password-prompt-banner">
					{isSubmitted && decryptStatus === 'error' && (
						<Banner type="error" message={decryptErrorMsg} />
					)}
				</div>
			</StartPage>
		);
	}
}

PasswordPrompt.propTypes = propTypes;
