import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel } from '../../Utils';

const FormOperationSeg = ({
	segmentLabel,
	segmentInputProps,
	activeLabel,
	activeInputProps,
	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	onSubmit,
	list,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: list,
	});

	console.log(list)
	
	let status
	if(list){
		if(list.active){
			status = {id:true, name:'Ativo'}
		} else {
			status = {id:false, name:'Inativo'}

		}
	}
	const [active, setActive] = useState({selectedOption: status? status: false})
	const handleChange = selectedOption => {
		setValue('active', selectedOption.id);
		setActive({ selectedOption });
	};

	

	React.useEffect(() => {
		register({ name: 'active' });
	}, [register]);

	return (
		<Card title="Novo Segmento de atuação">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							label={segmentLabel}
							{...segmentInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={6} lg={12} md={12}>
						<SelectLabel
							label={activeLabel}
							{...activeInputProps}
							options={[{id:true, name:'Ativo'}, {id:false, name:'Inativo'}]}
							value={active.selectedOption}
							onChange={handleChange}
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

FormOperationSeg.propTypes = {
	segmentLabel: PropTypes.string,
	segmentInputProps: PropTypes.shape({}),
	activeLabel: PropTypes.string,
	activeInputProps: PropTypes.shape({}),
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
};

FormOperationSeg.defaultProps = {
	segmentLabel: 'Segmento de atuação',
	segmentInputProps: {
		name: 'segment',
		id: 'segment',
		placeholder: 'Seguimento de atuação',
		required: true,
	},
	activeLabel: 'Ativo',
	activeInputProps: {
		name: 'active',
		id: 'active',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormOperationSeg;
