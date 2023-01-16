import PropTypes from 'prop-types';
import React from 'react';
import {
	Button,
	Form,
	FormFeedback,
	Input,
	InputGroup,
	InputGroupAddon,
	Row,
	Col,
} from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { MdChevronRight, MdLock, MdPerson } from 'react-icons/md';
import R from '../../lib/constants/R';
import SourceLink from '../Utils/SourceLink';

class AuthForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			usernameInvalid: false,
			passwordInvalid: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event, submit) {
		event.preventDefault();

		const { password, email } = this.state;

		if (password === '' && email === '') {
			this.setState({ usernameInvalid: true, passwordInvalid: true });
			return;
		}

		if (password === '') {
			this.setState({ passwordInvalid: true });
			return;
		}

		if (email === '') {
			this.setState({ usernameInvalid: true });
			return;
		}

		const data = { email, password };
		submit(data);
	}

	handleChange(event) {
		if (event.target.value === '') {
			this.setState({ [`${event.target.name}Invalid`]: true });
		} else {
			this.setState({ [`${event.target.name}Invalid`]: false });
		}

		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		const {
			showLogo,
			usernameInvalidMsg,
			usernameInputProps,
			passwordInvalidMsg,
			passwordInputProps,
			loading,
			onSubmit,
		} = this.props;

		const {
			email,
			password,
			passwordInvalid,
			usernameInvalid,
		} = this.state;

		return (
			<Row>
				<Col xl={6} lg={6} md={6} className="d-none d-md-block">
					<img src={R.images.banner_login} className="banner" />
				</Col>
				<Col xl={6} lg={6} md={12}>
					<div className="container">
						<div className="screen">
							<div className="screen__content">
								<Form
									onSubmit={e =>
										this.handleSubmit(e, onSubmit)
									}>
									{showLogo && (
										<SourceLink>
											<img
												src={R.images.logo_oficial}
												height="30"
												alt=""
												className="text-center"
											/>
										</SourceLink>
									)}

									<InputGroup>
										<InputGroupAddon
											addonType="prepend"
											className="authInput">
											<MdPerson
												color="#F2F2F2"
												size={18}
											/>
										</InputGroupAddon>
										<Input
											{...usernameInputProps}
											invalid={usernameInvalid}
											onChange={this.handleChange}
											value={email || ''}
										/>
										<FormFeedback className="ml-3">
											{usernameInvalidMsg}
										</FormFeedback>
									</InputGroup>

									<InputGroup>
										<InputGroupAddon addonType="prepend">
											<MdLock color="#F2F2F2" size={15} />
										</InputGroupAddon>
										<Input
											{...passwordInputProps}
											onChange={this.handleChange}
											invalid={passwordInvalid}
											value={password || ''}
										/>
										<FormFeedback className="ml-3">
											{passwordInvalidMsg}
										</FormFeedback>
									</InputGroup>
									<Button
										variant="outline-primary"
										className="btn-login"
										disabled={loading}
										block
										type="submit">
										{!loading ? (
											<div>
												{R.strings.login.login}{' '}
												<MdChevronRight
													size={25}
													className="float-right"
												/>
											</div>
										) : (
											<div>
												{R.strings.login.login}
												<ClipLoader
													size={20}
													color={
														R.colors.colorPrimary
													}
													loading={loading}
													className="float-right"
												/>
											</div>
										)}
									</Button>
								</Form>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
	authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]),
	showLogo: PropTypes.bool,
	usernameInvalidMsg: PropTypes.string,
	usernameInputProps: PropTypes.shape({}),
	passwordInvalidMsg: PropTypes.string,
	passwordInputProps: PropTypes.shape({}),
	onSubmit: PropTypes.func.isRequired,
	loading: PropTypes.bool,
};

AuthForm.defaultProps = {
	authState: 'LOGIN',
	showLogo: true,
	usernameInvalidMsg: 'Preencha o campo usuário!',
	usernameInputProps: {
		type: 'string',
		placeholder: R.strings.login.userPlaceholder,
		name: 'email',
	},
	passwordInvalidMsg: 'Preencha o campo senha!',
	passwordInputProps: {
		type: 'password',
		placeholder: R.strings.login.passwordPlaceholder,
		name: 'password',
	},
	loading: false,
};

export default AuthForm;
