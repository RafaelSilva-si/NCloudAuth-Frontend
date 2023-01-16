import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel } from '../../Utils';
import { statusList } from '../../../lib/utils/selects';

const FormProvider = ({
	providerLabel,
	providerInputProps,
	statusLabel,
	statusInputProps,
	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	onSubmit,
	user,
	edit,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: user,
	});

	const [status, setStatus] = useState({ selectedOption: statusList[1] });

	const handleChangeStatus = selectedOption => {
		setValue('status', selectedOption.id);
		setStatus({ selectedOption });
	};

	React.useEffect(() => {
		register({ name: 'status' });
	}, [register]);

	return (
		<Card title="Novo provedor">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							label={providerLabel}
							{...providerInputProps}
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
				<Button
					color="danger"
					outline
					className="float-left col-md-2 mt-3"
					onClick={() => handleNavigation()}>
					{btnLabelCancel}
				</Button>
				<Button
					color="success"
					outline
					type="submit"
					className="float-right col-md-2 mt-3">
					{btnLabelSubmit}
				</Button>
			</form>
		</Card>
	);
};

FormProvider.propTypes = {
	providerLabel: PropTypes.string,
	providerInputProps: PropTypes.shape({}),
	statusLabel: PropTypes.string,
	statusInputProps: PropTypes.shape({}),
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
};

FormProvider.defaultProps = {
	providerLabel: 'Nome',
	providerInputProps: {
		name: 'name',
		id: 'name',
		placeholder: 'Provedor',
		required: true,
	},
	statusLabel: 'Status',
	statusInputProps: {
		name: 'status',
		id: 'status',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormProvider;
