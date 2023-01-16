import React from 'react';
import { connect } from 'react-redux';
import ProviderList from '../../components/Providers/ProvidersList';
import { navigate } from '../../lib/utils/navigation';
import { apiActions, usersActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import PropTypes from '../../lib/utils/propTypes';

class ProvidersPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveUser } = this.props;

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
					cell: row => `${row.first_name} ${row.last_name}`,
					sortable: true,
					width: '25%',
				},
				{
					name: 'Ações',
					selector: 'status',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							route="providers"
							handleNavigation={page => navigate(page)}
							changeValue={user => onActiveDesactiveUser(user)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetListUsers, onClearQuery } = this.props;
		//await onClearQuery();
		//await onGetListUsers('active=true');
	}

	render() {
		const {
			onGetListUsers,
			onClearQuery,
			list,
			loading,
			companies,
		} = this.props;

		const { columns } = this.state;

		return (
			<Page
				className="users"
				title="Provedores"
				breadcrumbs={[{ name: 'Provedores', active: true }]}>
				<LoadingContent loading={false}>
					<ProviderList
						data={list || []}
						columns={columns}
						companies={companies || []}
						loadingFilter={loading}
						cleanFilter={() => {
							onClearQuery();
						}}
						handleNavigation={page => navigate(page)}
						onSubmit={data => console.log(data)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.api.loading,
	list: state.user.list,
});

const mapDispatchToProps = dispatch => ({
	onGetListUsers: query => dispatch(usersActions.getListUsers(query)),
	onClearQuery: () => dispatch(apiActions.setQueryFilter('')),
	onActiveDesactiveUser: user =>
		dispatch(usersActions.activeDesactiveUser(user)),
});

ProvidersPage.propTypes = {
	onActiveDesactiveUser: PropTypes.func.isRequired,
	onClearQuery: PropTypes.func.isRequired,
	onGetListUsers: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersPage);
