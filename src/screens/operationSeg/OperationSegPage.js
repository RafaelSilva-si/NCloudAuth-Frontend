import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { apiActions, operationSegActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import OperationList from '../../components/OperationSeg/OperationSegList';

class OperationSegPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveSeg, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Segmento',
					selector: 'segment',
					sortable: true,
					width: '75%',
				},
				{
					name: 'Ações',
					selector: 'active',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							onSelect={value => onSelect(value)}
							route="operation-segment"
							handleNavigation={page => navigate(page)}
							changeValue={segment => onActiveDesactiveSeg(segment)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetList } = this.props;
		await onGetList('active=true');
	}

	render() {
		const {
			list,
			loading,
			onGetList,
			onDelete,
			select
		} = this.props;
		const { columns } = this.state;

		return (
			<Page
				className="users"
				title="Segmento de atuação"
				breadcrumbs={[{ name: 'Segmento de atuação', active: true }]}>
				<LoadingContent loading={false}>
					<OperationList
					data={list || []}
					columns={columns}
					handleNavigation={page => navigate(page)}
					loadingFilter={loading}
					onSubmitFilter={data => onGetList(data)}
					/>
					<ModalDelete
						name={select ? select.group : ''}
						onSubmit={() => onDelete(select.id)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	list: state.segment.list,
	loading: state.api.loading,
	select: state.segment.select
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(operationSegActions.getOperationSeg(query)),
	onSelect: query => dispatch(operationSegActions.select(query)),
	onActiveDesactiveSeg: query => dispatch(operationSegActions.activeOrDesactiveSeg(query)),
	onDelete: query => dispatch(operationSegActions.deleteOperatingSegment(query)),

});

OperationSegPage.propTypes = {
	onActiveDesactiveSeg: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationSegPage);