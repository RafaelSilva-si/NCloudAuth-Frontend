import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Providers/ProvidersForm';
import { navigateBack } from '../../lib/utils/navigation';
import { providerActions } from '../../store/actions';
import R from '../../lib/constants/R';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class ProviderRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const { onGetProvider, match } = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

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

		const { provider, loading } = this.props;

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
				<LoadingContent loading={id ? !provider : loading}>
					<Form
						provider={provider}
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
		provider: state.provider.provider,
		companies: state.enterprise.companies,
		groups: state.group.list,
		representatives: state.generics.representatives,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetProvider: id => dispatch(providerActions.getProvider(id)),
		onAddProvider: data => dispatch(providerActions.addProvider(data)),
		onEditProvider: (data, id) =>
			dispatch(providerActions.editProvider(data, id)),
	};
};

ProviderRegisterPage.propTypes = {
	onAddProvider: PropTypes.func.isRequired,
	onEditProvider: PropTypes.func.isRequired,
	onGetProvider: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProviderRegisterPage);
