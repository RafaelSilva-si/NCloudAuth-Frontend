import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel } from '../../Utils';

const FormApplication = ({
	applicationLabel,
	applicationInputProps,
	providerLabel,
	providerInputProps,
	statusLabel,
	statusInputProps,
	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	onSubmit,
	providers,
	edit,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: providers,
	});

	const [status, setStatus] = useState({ selectedOption: false });
	const [provider, setProvider] = useState({ selectedOption: false });

	const handleChangeStatus = selectedOption => {
		setValue('status', selectedOption.id);
		setStatus({ selectedOption });
	};

	const handleChangeProvider = selectedOption => {
		setValue('provider_id', selectedOption.id);
		setProvider({ selectedOption });
	};

	React.useEffect(() => {
		if (provider) {
			handleChangeStatus({
				id: provider.status,
				name: provider.status == 0 ? 'Inativo' : 'Ativo',
			});
		}
	}, provider);
	React.useEffect(() => {
		register({ name: 'status' });
	}, [register]);

	return (
		<Card title="Novo provedor">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={applicationLabel}
							{...applicationInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={providerLabel}
							{...providerInputProps}
							options={providers}
							onChange={handleChangeProvider}
							value={provider.selectedOption}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={statusLabel}
							{...statusInputProps}
							options={[
								{ id: 0, name: 'Inativo' },
								{ id: 1, name: 'Ativo' },
							]}
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

FormApplication.propTypes = {
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

FormApplication.defaultProps = {
	applicationLabel: 'Aplicação',
	applicationInputProps: {
		name: 'application',
		id: 'application',
		placeholder: 'Aplicação',
		required: true,
	},
	providerLabel: 'Provedor',
	providerInputProps: {
		name: 'provider_id',
		id: 'provider_id',
		placeholder: 'Selecione o provedor...',
		required: true,
	},
	statusLabel: 'Status',
	statusInputProps: {
		placeholder: 'Selecione o status...',
		name: 'status',
		id: 'status',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormApplication;
