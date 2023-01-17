import React from 'react';
import { connect } from 'react-redux';
import ProviderList from '../../components/Providers/ProvidersList';
import { navigate } from '../../lib/utils/navigation';
import { apiActions, providerActions, usersActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import EditDelete from '../../components/Utils/TablesRow/EditDelete';
import PropTypes from '../../lib/utils/propTypes';
import { ModalDelete } from '../../components/Utils/Modal';

class ApplicationPage extends React.Component {
	constructor(props) {
		super(props);

		const { onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Nome',
					selector: 'name',
					sortable: true,
				},
				{
					name: 'Provedor',
					selector: 'provider_name',
					sortable: true,
				},
				{
					name: 'Ações',
					selector: 'status',
					width: '15%',
					cell: row => (
						<EditDelete
							row={row}
							route="application"
							onSelect={row => onSelect(row)}
							handleNavigation={page => navigate(page)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetListProviders, onClearQuery } = this.props;
		//await onClearQuery();
		//await onGetListProviders('active=true');
	}

	render() {
		const {
			onGetListProvider,
			onClearQuery,
			list,
			loading,
			select,
			onDelete,
		} = this.props;

		const { columns } = this.state;

		return (
			<Page
				className="users"
				title="Aplicações"
				breadcrumbs={[{ name: 'Aplicações', active: true }]}>
				<LoadingContent loading={false}>
					<ProviderList
						data={list || []}
						columns={columns}
						loadingFilter={loading}
						cleanFilter={() => {
							onClearQuery();
						}}
						handleNavigation={page => navigate(page)}
						onSubmit={data => onGetListProvider(data)}
					/>
				</LoadingContent>
				<ModalDelete
					name={select ? select.name : ''}
					onSubmit={() => onDelete(select.id)}
				/>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.api.loading,
	list: state.provider.list,
	select: state.provider.provider,
});

const mapDispatchToProps = dispatch => ({
	onGetListProviders: query =>
		dispatch(providerActions.getListProviders(query)),
	onSelect: query => dispatch(providerActions.setProvider(query)),
	onDelete: query => dispatch(providerActions.deleteProvider(query)),
	onClearQuery: () => dispatch(apiActions.setQueryFilter('')),
	onActiveDesactiveUser: user =>
		dispatch(usersActions.activeDesactiveUser(user)),
});

ApplicationPage.propTypes = {
	onActiveDesactiveUser: PropTypes.func.isRequired,
	onClearQuery: PropTypes.func.isRequired,
	onGetListProviders: PropTypes.func.isRequired,
	companies: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);
