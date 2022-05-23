import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { InputLabel, SelectLabel } from '../../../Utils';
import { ButtonsFilter, CollapseFilter } from '../../../Utils/Filter';
import { removeEmpty } from '../../../../lib/utils/functions';
import { statusList } from '../../../../lib/utils/selects';
import PropTypes from '../../../../lib/utils/propTypes';

const FilterPrices = ({
	clientLabel,
	clientInputProps,
	contractLabel,
	contractInputProps,
	onSubmit,
	clearQuery,
	companies,
	statusLabel,
	statusInputProps,
	clientOptions,
	contractsOptions,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: { active: 'true' },
	});

	const [value, setReactSelectValue] = useState({ selectedOption: [] });
	const [client, setClient] = useState({ selectedOption: {}});
	const [contract, setContract] = useState({ selectedOption: {}});

	const onSubmitForm = data => {
		let values = data;
		values = removeEmpty(values);
		onSubmit(values);
	};

	const handleOptions = (selectedOption, func, value) => {
		setValue(value, selectedOption.id)
		func({ selectedOption })
	}

	React.useEffect(() => {
		register({ name: 'client' });
		register({ name: 'contract' });
	}, [register]);

	const clear = () => {
		setValue('client', false);
		setValue('contract', false);
		setClient({ selectedOption: {} });
		setContract({ selectedOption: {} });
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
								label={clientLabel}
								{...clientInputProps}
								options={clientOptions}
								onChange={target => handleOptions(target, setClient, 'client')}
								value={client.selectedOption}
							/>
						</Col>
						<Col xl={6} lg={12} md={12}>
							<SelectLabel
								label={contractLabel}
								{...contractInputProps}
								options={contractsOptions}
								onChange={target => handleOptions(target, setContract, 'contract')}
								value={contract.selectedOption}
							/>
						</Col>
					</Row>
					<ButtonsFilter onClickClean={() => clear()} />
				</form>
			</CollapseFilter>
		</div>
	);
};

FilterPrices.propTypes = {
	clientLabel: PropTypes.string,
	clientInputProps: PropTypes.shape({}),
	contractLabel: PropTypes.string,
	contractInputProps: PropTypes.shape({}),
	statusLabel: PropTypes.string,
	statusInputProps: PropTypes.shape({}),
	onSubmit: PropTypes.func.isRequired,
	clearQuery: PropTypes.func.isRequired,
};

FilterPrices.defaultProps = {
	clientLabel: 'Cliente',
	clientInputProps: {
		name: 'client',
		id: 'client',
		placeholder: 'Client',
	},
	contractLabel: 'Contrato',
	contractInputProps: {
		name: 'contract',
		id: 'contract',
		placeholder: 'Contrato',
	},
	statusLabel: 'Status',
	statusInputProps: {
		name: 'active',
		id: 'active',
		placeholder: 'selecione um status',
	},
};

export default FilterPrices;