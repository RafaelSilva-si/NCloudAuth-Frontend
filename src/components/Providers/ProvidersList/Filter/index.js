import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { InputLabel, SelectLabel } from '../../../Utils';
import { ButtonsFilter, CollapseFilter } from '../../../Utils/Filter';
import { removeEmpty } from '../../../../lib/utils/functions';
import { statusList } from '../../../../lib/utils/selects';
import PropTypes from '../../../../lib/utils/propTypes';

const FilterProviders = ({
	statusLabel,
	statusInputProps,
	onSubmit,
	clearQuery,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: { active: 1 },
	});

	const [value, setReactSelectValue] = useState({ selectedOption: [] });
	const [status, setStatus] = useState({ selectedOption: statusList[1] });

	const onSubmitForm = data => {
		let values = data;
		values = removeEmpty(values);
		onSubmit(values);
	};

	const handleChangeStatus = selectedOption => {
		setValue('status', selectedOption.id);
		setStatus({ selectedOption });
	};

	React.useEffect(() => {
		register({ name: 'status' });
	}, [register]);

	const clear = () => {
		setValue('status', statusList[1].id);
		setStatus({ selectedOption: statusList[1] });
		setReactSelectValue({ selectedOption: [] });
		clearQuery();
	};

	return (
		<div {...restProps} className="mb-3">
			<CollapseFilter open>
				<form onSubmit={handleSubmit(onSubmitForm)}>
					<Row>
						<Col xl={6} lg={12} md={12}>
							<SelectLabel
								label={statusLabel}
								{...statusInputProps}
								options={statusList}
								onChange={handleChangeStatus}
								value={status.selectedOption}
							/>
						</Col>
					</Row>
					<ButtonsFilter onClickClean={() => clear()} />
				</form>
			</CollapseFilter>
		</div>
	);
};

FilterProviders.propTypes = {
	statusLabel: PropTypes.string,
	statusInputProps: PropTypes.shape({}),
	onSubmit: PropTypes.func.isRequired,
	clearQuery: PropTypes.func.isRequired,
};

FilterProviders.defaultProps = {
	statusLabel: 'Status',
	statusInputProps: {
		name: 'status',
		id: 'status',
		placeholder: 'selecione um status',
	},
};

export default FilterProviders;
