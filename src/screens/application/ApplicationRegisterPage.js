import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Application/ApplicationForm';
import { navigateBack } from '../../lib/utils/navigation';
import { providerActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class ApplicationRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const { onGetProvider, match, onGetListProviders } = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		await onGetListProviders();
		if (id) {
			await onGetProvider(id);
		}
	}

	onSubmit = data => {
		const { onEditProvider, onAddProvider } = this.props;
		const { id } = this.state;
		const values = data;
		if (id) {
			onEditProvider(values, id);
		} else {
			onAddProvider(data);
		}
	};

	render() {
		const { id } = this.state;

		const { providers, loading } = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Provedor"
				pathParent="/Provedor"
				breadcrumbs={[
					{
						name: id ? 'Editar provedor' : 'Adicionar provedor',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? providers : loading}>
					<Form
						providers={providers}
						edit={!!id}
						onSubmit={data => this.onSubmit(data)}
						handleNavigation={() => navigateBack()}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.api.loading,
		providers: state.provider.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetListProviders: query =>
			dispatch(providerActions.getListProviders(query)),
	};
};

ApplicationRegisterPage.propTypes = {
	onGetListProviders: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ApplicationRegisterPage);
