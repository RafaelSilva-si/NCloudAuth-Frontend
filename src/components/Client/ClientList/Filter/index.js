import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { InputLabel, SelectLabel } from '../../../Utils';
import { ButtonsFilter, CollapseFilter } from '../../../Utils/Filter';
import { removeEmpty } from '../../../../lib/utils/functions';
import { statusList } from '../../../../lib/utils/selects';
import PropTypes from '../../../../lib/utils/propTypes';

const FilterClient = ({
	clientLabel,
	clientInputProps,
	onSubmit,
	clearQuery,
	companies,
	statusLabel,
	statusInputProps,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: { active: 'true' },
	});

	const [value, setReactSelectValue] = useState({ selectedOption: [] });
	const [status, setStatus] = useState({ selectedOption: statusList[1] });

	const onSubmitForm = data => {
		let values = data;
		values = removeEmpty(values);
		onSubmit(values);
	};

	const handleChangeStatus = selectedOption => {
		setValue('active', selectedOption.id);
		setStatus({ selectedOption });
	};

	React.useEffect(() => {
		register({ name: 'active' });
	}, [register]);

	const clear = () => {
		setValue('active', statusList[1].id);
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
							<InputLabel
								label={clientLabel}
								{...clientInputProps}
								innerRef={register}
							/>
						</Col>
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

FilterClient.propTypes = {
	clientLabel: PropTypes.string,
	clientInputProps: PropTypes.shape({}),
	statusLabel: PropTypes.string,
	statusInputProps: PropTypes.shape({}),
	onSubmit: PropTypes.func.isRequired,
	clearQuery: PropTypes.func.isRequired,
};

FilterClient.defaultProps = {
	clientLabel: 'Cliente',
	clientInputProps: {
		name: 'client',
		id: 'client',
		placeholder: 'Cliente',
	},
	statusLabel: 'Status',
	statusInputProps: {
		name: 'active',
		id: 'active',
		placeholder: 'selecione um status',
	},
};

export default FilterClient;
