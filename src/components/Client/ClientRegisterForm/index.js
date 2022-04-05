import React, { useState } from 'react';
import { Button, Col, Row, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import { statusMonitoramento, categoriaClient, subMercado } from '../../../lib/utils/selects';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel, SelectAsyncLabel, DatePicker, Checkbox } from '../../Utils';
import bancos from '../../../lib/utils/bancos.json';

const FormClient = ({
	clientLabel,
	clientInputProps,
	corporateLabel,
	corporateInputProps,
	groupLabel,
	groupInputProps,
	activeLabel,
	activeInputProps,
	segmentLabel,
	segmentInputProps,
	respLabel,
	respInputProps,
	distLabel,
	distInputProps,
	unidadeCLabel,
	unidadeCInputProps,
	countryLabel,
	countryInputProps,
	stateLabel,
	stateInputProps,
	cityLabel,
	cityInputProps,
	incricaoLabel,
	incricaoInputProps,
	ICMSLabel,
	ICMSInputProps,
	CNPJLabel,
	CNPJInputProps,
	aproveitaLabel,
	aproveitaInputProps,
	percenLaudoLabel,
	percenLaudoInputProps,
	periodlastLaudoLabel,
	periodlastLaudoInputsProps,
	periodMigrationLabel,
	periodMigrationInputsProps,
	monitoramentoLabel,
	monitoramentoInputProps,
	statusMonitoramentoLabel,
	statusMonitoramentoInputProps,
	currentAccountLabel,
	currentAccountInputProps,
	tarifeLabel,
	tarifeInputProps,
	subGroupLabel,
	subGroupInputProps,
	potenceTRLabel,
	potenceTRInputProps,
	geraPontLabel,
	geraPontInputProps,
	potenceGeraLabel,
	potenceGeraInputProps,
	sazonalLabel,
	sazonalInputProps,
	ruralLabel,
	ruralInputProps,
	bancosLabel,
	bancosInputProps,
	agenciaLabel,
	agenciaInputProps,
	contaLabel,
	contaInputProps,
	agenteLabel,
	agenteInputProps,
	perfilLabel,
	perfilInputProps,
	cliqLabel,
	cliqInputProps,
	numParcelaAtivoLabel,
	numParcelaAtivoInputProps,
	parcelaAtivLabel,
	parcelaAtivInputProps,
	pontoMedicaoLabel,
	pontoMedicaoInputProps,
	nomeMedicaoLabel,
	nomeMedicaoInputProps,
	categoriaLabel,
	categoriaInputProps,
	subMercadoLabel,
	subMercadoInputProps,
	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	getCity,
	onSubmit,
	list,
	groups,
	dist,
	segment,
	user,
	state,
	city,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: list,
	});

	//functions
	const handleChange = (selectedOption, func, value) => {
		setValue(value, selectedOption.id);
		func({ selectedOption });
		if (value == 'state') {
			getCity(selectedOption.id)
		}
	};

	//VARS
	const [active, setActive] = useState({ selectedOption: {} });
	const [group, setGroup] = useState({ selectedOption: list ? { id: list.group, name: 'Teste' } : {} });
	const [segmentValue, setSegment] = useState({ selectedOption: list ? { id: list.operating_seg, name: 'teste' } : {} });
	const [distValue, setDist] = useState({ selectedOption: list ? { id: list.dist, name: 'teste' } : {} });
	const [states, setStates] = useState({ selectedOption: {} });
	const [aproCred, setAproCred] = useState({ selectedOption: {}});
	const [monitoring, setMonitoring] = useState({selectedOption: {}});
	const [statusMonitoring, setStatusMonitoring] = useState({selectedOption: {}});
	const [tarife, setTarife] = useState({selectedOption: {}});
	const [geradorPonta, setGeradorPonta] = useState({selectedOption: {}});
	const [sazonal, setSazanol] = useState({selectedOption: {}});
	const [rural, setRural] = useState({selectedOption: {}});

	React.useEffect(() => {
		//estado
		let stateOption
		if (list) {
			stateOption = state.filter(element => element.id == list.state)[0]
			handleChange(stateOption, setStates, 'state')
		}
		//status
		let status
		if (list && list.active) {
			status = { id: true, name: 'Ativo' }
		} else {
			status = { id: false, name: 'Inativo' }
		}
		handleChange(status, setActive, 'active')
		//aproveita crédito
		let apro_cred
		if (list && list.apro_cred) {
			apro_cred = { id: true, name: 'Sim' }
		} else {
			apro_cred = { id: false, name: 'Não' }
		}
		handleChange(apro_cred, setAproCred, 'apro_cred')
		//monitoramento
		let monitoring
		if (list && list.monitoring) {
			monitoring = { id: list.monitoring, name: monitoring == 1 && 'AUTOMAS' || monitoring == 2 && 'GEBRAS' || 'VETORLOG'}
			handleChange(monitoring, setMonitoring, 'monitoring')
		}
		//status monitoramento
		let statusMon
		if (list && list.status_monitoring) {
			statusMon = statusMonitoramento.filter(element => element.id == list.status_monitoring)[0]
			handleChange(statusMon, setStatusMonitoring, 'status_monitoring')
		}
		//tarifa
		let tarifeV
		if (list && list.tarife) {
			tarifeV = { id: list.tarife, name: list.tarife == 1 && 'Azul' || 'Verde'}
			handleChange(tarifeV, setTarife, 'tarife')
		}
		//gerador Ponta
		let gerPont
		if (list && list.gerador_ponta) {
			gerPont = { id: list.gerador_ponta, name: list.gerador_ponta && 'Sim' || 'Não'}
			handleChange(gerPont, setGeradorPonta, 'gerador_ponta')
		}
		//sazanal
		let sazonal
		if (list && list.sazonal) {
			sazonal = { id: list.sazonal, name: list.sazonal && 'Sim' || 'Não'}
			handleChange(sazonal, setSazanol, 'sazanal')
		}
		//rural
		let rural
		if (list && list.rural) {
			rural = { id: list.rural, name: list.rural && 'Sim' || 'Não'}
			handleChange(rural, setRural, 'rural')
		}
	}, [list])

	React.useEffect(() => {
		register({ name: 'active' });
	}, [register]);

	return (
		<Card title="Novo cliente">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							label={clientLabel}
							{...clientInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={activeLabel}
							{...activeInputProps}
							options={[{ id: true, name: 'Ativo' }, { id: false, name: 'Inativo' }]}
							value={active.selectedOption}
							onChange={target => handleChange(target, setActive, 'active')}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={groupLabel}
							{...groupInputProps}
							options={groups}
							value={group.selectedOption}
							onChange={target => handleChange(target, setGroup, 'group')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={corporateLabel}
							{...corporateInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={segmentLabel}
							{...segmentInputProps}
							options={segment}
							value={segmentValue.selectedOption}
							onChange={target => handleChange(target, setSegment, 'segment')}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={respLabel}
							{...respInputProps}
							options={user}
							value={active.selectedOption}
							onChange={handleChange}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={distLabel}
							{...distInputProps}
							options={dist}
							value={distValue.selectedOption}
							onChange={target => handleChange(target, setDist, 'dist')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={unidadeCLabel}
							{...unidadeCInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<SelectAsyncLabel
							label={stateLabel}
							{...stateInputProps}
							options={state}
							value={states.selectedOption}
							onChange={target => handleChange(target, setStates, 'state')}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={cityLabel}
							{...cityInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={CNPJLabel}
							{...CNPJInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={incricaoLabel}
							{...incricaoInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={ICMSLabel}
							{...ICMSInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={aproveitaLabel}
							{...aproveitaInputProps}
							options={[{ id: 1, name: 'Sim' }, { id: 2, name: 'Não' }]}
							value={aproCred.selectedOption}
							onChange={target => handleChange(target, setAproCred, 'apro_cred')}
						/>
					</Col>
					{aproCred && aproCred.selectedOption.id == 1 && (
						<Col xl={3} lg={12} md={12}>
							<InputLabel
								label={percenLaudoLabel}
								{...percenLaudoInputProps}
								innerRef={register}
							/>
						</Col>
					)}
					<Col xl={3} lg={12} md={12}>
						<DatePicker
							label={periodlastLaudoLabel}
							//selected={dt_atendimento}
							{...periodlastLaudoInputsProps}
						//onChange={event => handleDtAtendimento(event)}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<DatePicker
							label={periodMigrationLabel}
							//selected={dt_atendimento}
							{...periodMigrationInputsProps}
						//onChange={event => handleDtAtendimento(event)}
						/>
					</Col>

				</Row>
				<Row>
					<Col xl={6} lg={12} md={12}>
						<SelectLabel
							label={monitoramentoLabel}
							{...monitoramentoInputProps}
							options={[{ id: 1, name: 'AUTOMAS' }, { id: 2, name: 'GEBRAS' }, { id: 3, name: 'VETORLOG' }]}
							value={monitoring.selectedOption}
							onChange={target => handleChange(target, setMonitoring, 'monitoring')}
						/>
					</Col>
					<Col xl={6} lg={12} md={12}>
						<SelectLabel
							label={statusMonitoramentoLabel}
							{...statusMonitoramentoInputProps}
							options={statusMonitoramento}
							value={statusMonitoring.selectedOption}
							onChange={target => handleChange(target, setStatusMonitoring, 'status_monitoring')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={currentAccountLabel}
							{...currentAccountInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={subGroupLabel}
							{...subGroupInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={tarifeLabel}
							{...tarifeInputProps}
							options={[{ id: 1, name: 'Azul' }, { id: 2, name: 'Verde' }]}
							value={tarife.selectedOption}
							onChange={target => handleChange(target, setTarife, 'tarife')}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={potenceTRLabel}
							{...potenceTRInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={geraPontLabel}
							{...geraPontInputProps}
							options={[{ id: 1, name: 'Sim' }, { id: 2, name: 'Não' }]}
							value={geradorPonta.selectedOption}
							onChange={target => handleChange(target, setGeradorPonta, 'gerador_ponta')}
						/>
					</Col>
					{geradorPonta.selectedOption.id == 1 && (
						<Col xl={3} lg={12} md={12}>
							<InputLabel
								label={potenceGeraLabel}
								{...potenceGeraInputProps}
								innerRef={register}
							/>
						</Col>
					)}
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={sazonalLabel}
							{...sazonalInputProps}
							options={[{ id: 1, name: 'Sim' }, { id: 2, name: 'Não' }]}
							value={sazonal.selectedOption}
							onChange={target => handleChange(target, setSazanol, 'sazanal')}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={ruralLabel}
							{...ruralInputProps}
							options={[{ id: 1, name: 'Sim' }, { id: 2, name: 'Não' }]}
							value={rural.selectedOption}
							onChange={target => handleChange(target, setRural, 'rural')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={bancosLabel}
							{...bancosInputProps}
							options={bancos}
						//value={geraPonta.selectedOption}
						//onChange={target => handleChange(target, setgeraPonta, 'gera_ponta')}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={agenciaLabel}
							{...agenciaInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={contaLabel}
							{...contaInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={agenteLabel}
							{...agenteInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={perfilLabel}
							{...perfilInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={cliqLabel}
							{...cliqInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={numParcelaAtivoLabel}
							{...numParcelaAtivoInputProps}
							innerRef={register}						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={parcelaAtivLabel}
							{...parcelaAtivInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={pontoMedicaoLabel}
							{...pontoMedicaoInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={nomeMedicaoLabel}
							{...nomeMedicaoInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={categoriaLabel}
							{...categoriaInputProps}
							options={categoriaClient}
						//value={geraPonta.selectedOption}
						//onChange={target => handleChange(target, setgeraPonta, 'gera_ponta')}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={subMercadoLabel}
							{...subMercadoInputProps}
							options={subMercado}
						//value={geraPonta.selectedOption}
						//onChange={target => handleChange(target, setgeraPonta, 'gera_ponta')}
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

FormClient.propTypes = {
	clientLabel: PropTypes.string,
	clientInputProps: PropTypes.shape({}),
	corporateLabel: PropTypes.string,
	corporateInputProps: PropTypes.shape({}),
	activeLabel: PropTypes.string,
	activeInputProps: PropTypes.shape({}),
	segmentLabel: PropTypes.string,
	segmentInputProps: PropTypes.shape({}),
	respLabel: PropTypes.string,
	respInputProps: PropTypes.shape({}),
	unidadeCLabel: PropTypes.string,
	unidadeCInputProps: PropTypes.shape({}),
	countryLabel: PropTypes.string,
	countryInputProps: PropTypes.shape({}),
	stateLabel: PropTypes.string,
	stateInputProps: PropTypes.shape({}),
	cityLabel: PropTypes.string,
	cityInputProps: PropTypes.shape({}),
	distLabel: PropTypes.string,
	distInputProps: PropTypes.shape({}),
	groupLabel: PropTypes.string,
	groupInputProps: PropTypes.shape({}),
	inscricaoLabel: PropTypes.string,
	inscricaoInputProps: PropTypes.shape({}),
	ICMSLabel: PropTypes.string,
	ICMSInputProps: PropTypes.shape({}),
	CNPJLabel: PropTypes.string,
	CNPJInputProps: PropTypes.shape({}),
	aproveitaLabel: PropTypes.string,
	aproveitaInputProps: PropTypes.shape({}),
	percenLaudoLabel: PropTypes.string,
	percenLaudoInputProps: PropTypes.shape({}),
	geraPontLabel: PropTypes.string,
	geraPontInputProps: PropTypes.shape({}),
	potenceGeraLabel: PropTypes.string,
	potenceGeraInputProps: PropTypes.shape({}),
	sazonalLabel: PropTypes.string,
	sazonalInputProps: PropTypes.shape({}),
	ruralLabel: PropTypes.string,
	ruralInputProps: PropTypes.shape({}),
	bancosLabel: PropTypes.string,
	bancosInputProps: PropTypes.shape({}),
	agenciaLabel: PropTypes.string,
	agenciaInputProps: PropTypes.shape({}),
	contaLabel: PropTypes.string,
	contaInputProps: PropTypes.shape({}),
	agenteLabel: PropTypes.string,
	agenteInputProps: PropTypes.shape({}),
	perfilLabel: PropTypes.string,
	perfilInputProps: PropTypes.shape({}),
	cliqLabel: PropTypes.string,
	cliqInputProps: PropTypes.shape({}),
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
};

FormClient.defaultProps = {
	clientLabel: 'Cliente',
	clientInputProps: {
		name: 'client',
		id: 'client',
		placeholder: 'cliente',
		required: true,
	},
	groupLabel: 'Grupo',
	groupInputProps: {
		name: 'group',
		id: 'group',
		placeholder: 'Grupo',
		required: true,
	},
	corporateLabel: 'Razão social',
	corporateInputProps: {
		name: 'corporate',
		id: 'corporate',
		placeholder: 'Razão social',
		required: true,
	},
	segmentLabel: 'Segmento de atuação',
	segmentInputProps: {
		name: 'segment',
		id: 'segment',
		placeholder: 'Segmento de atuação',
		required: true,
	},
	respLabel: 'Responsável comercial',
	respInputProps: {
		name: 'resp',
		id: 'resp',
		placeholder: 'Responsável comercial',
		required: true,
	},
	distLabel: 'Distribuidora',
	distInputProps: {
		name: 'dist',
		id: 'dist',
		placeholder: 'Distribuidora',
		required: true,
	},
	unidadeCLabel: 'Unidade Consumidora',
	unidadeCInputProps: {
		name: 'unid_consumer',
		id: 'unid_consumer',
		placeholder: 'Unidade Consumidora',
		required: true,
	},
	countryLabel: 'País',
	countryInputProps: {
		name: 'country',
		id: 'country',
		placeholder: 'País',
		required: true,
	},
	stateLabel: 'Estado',
	stateInputProps: {
		name: 'state',
		id: 'state',
		placeholder: 'Estado',
		required: true,
	},
	cityLabel: 'Cidade',
	cityInputProps: {
		name: 'city',
		id: 'city',
		placeholder: 'Cidade',
		required: true,
	},
	incricaoLabel: 'Inscrição municipal',
	incricaoInputProps: {
		name: 'subscriptionstate',
		id: 'subscriptionstate',
		placeholder: 'Inscrição municipal',
		required: true,
	},
	ICMSLabel: 'Alíquota ICMS',
	ICMSInputProps: {
		name: 'ICMS',
		id: 'ICMS',
		placeholder: 'Alíquota ICMS',
		required: true,
	},
	CNPJLabel: 'CNPJ',
	CNPJInputProps: {
		name: 'cnpj',
		id: 'cnpj',
		placeholder: 'CNPJ',
		required: true,
	},
	aproveitaLabel: 'Aproveita crédito',
	aproveitaInputProps: {
		name: 'aproveita',
		id: 'aproveita',
		placeholder: 'Aproveita crédito',
		required: true,
	},
	percenLaudoLabel: 'Percentual Laudo',
	percenLaudoInputProps: {
		name: 'perc_laudo',
		id: 'perc_laudo',
		placeholder: 'Percentual Laudo',
		required: true,
	},
	periodlastLaudoLabel: 'Data ultimo laudo',
	periodlastLaudoInputProps: {
		name: 'periodlastLaudo',
		id: 'periodlastLaudo',
		required: true,
	},
	periodMigrationLabel: 'Data Migração',
	periodMigrationInputProps: {
		name: 'periodMigration',
		id: 'periodMigration',
		required: true,
	},
	monitoramentoLabel: 'Monitoramento',
	monitoramentoInputProps: {
		name: 'monitoring',
		required: true,
		id: 'monitoring',
	},
	statusMonitoramentoLabel: 'Status Monitoramento',
	statusMonitoramentoInputProps: {
		name: 'status_monitoring',
		required: true,
		id: 'status_monitoring',
	},
	currentAccountLabel: 'Status Monitoramento',
	currentAccountInputProps: {
		name: 'current_account',
		required: true,
		id: 'current_account',
		placeholder: 'Status Monitoramento',

	},
	subGroupLabel: 'SubGrupo',
	subGroupInputProps: {
		name: 'subgroup',
		id: 'subgroup',
		required: true,
		placeholder: 'Subgroupo',
	},
	tarifeLabel: 'Tarifa',
	tarifeInputProps: {
		name: 'tarife',
		id: 'tarife',
		required: true,
		placeholder: 'Tarifa',
	},
	potenceTRLabel: 'Potencial Total TR',
	potenceTRInputProps: {
		name: 'potence_tot_tr',
		id: 'potence_tot_tr',
		required: true,
		placeholder: 'Potencial Total TR',
	},
	geraPontLabel: 'Gerador de Ponta',
	geraPontInputProps: {
		name: 'gera_ponta',
		id: 'gera_ponta',
		required: true,
		placeholder: 'Gerador de Ponta',
	},
	potenceGeraLabel: 'Potencia Gerada',
	potenceGeraInputProps: {
		name: 'potence_gerada',
		id: 'potence_gerada',
		required: true,
		placeholder: 'potencia gerada',
	},
	sazonalLabel: 'Sazonal',
	sazonalInputProps: {
		name: 'sazona',
		id: 'sazona',
		required: true,
		placeholder: 'Sazonal',
	},
	ruralLabel: 'Rural',
	ruralInputProps: {
		name: 'rural',
		id: 'rural',
		required: true,
		placeholder: 'Rural',
	},
	bancosLabel: 'Bancos',
	bancosInputProps: {
		name: 'banco',
		id: 'banco',
		required: true,
		placeholder: 'Bancos',
	},

	agenciaLabel: 'Agencia',
	agenciaInputProps: {
		name: 'agencia_operacao_ccee',
		id: 'agencia_operacao_ccee',
		required: true,
		placeholder: 'Agencia',
	},
	contaLabel: 'Conta',
	contaInputProps: {
		name: 'conta_operacao_ccee',
		id: 'conta_operacao_ccee',
		required: true,
		placeholder: 'Conta',
	},
	agenteLabel: 'Agente CCEE',
	agenteInputProps: {
		name: 'agente_ccee',
		id: 'agente_ccee',
		required: true,
		placeholder: 'Agente CCEE',
	},

	perfilLabel: 'Perfil CCEE',
	perfilInputProps: {
		name: 'perfil_ccee',
		id: 'perfil_ccee',
		required: true,
		placeholder: 'Perfil CCEE',
	},
	cliqLabel: 'Cliq CCEE',
	cliqInputProps: {
		name: 'cliq_ccee',
		id: 'cliq_ccee',
		required: true,
		placeholder: 'Cliq CCEE',
	},

	numParcelaAtivoLabel: 'Numero parcela ativo',
	numParcelaAtivoInputProps: {
		name: 'num_parcela_ativo',
		id: 'num_parcela_ativo',
		required: true,
		placeholder: 'Numero parcela ativo',
	},
	parcelaAtivLabel: 'Parcela ativo',
	parcelaAtivInputProps: {
		name: 'parcela_ativo',
		id: 'parcela_ativo',
		required: true,
		placeholder: 'Parcela ativo',
	},

	pontoMedicaoLabel: 'Ponto Medicao',
	pontoMedicaoInputProps: {
		name: 'ponto_medicao',
		id: 'ponto_medicao',
		required: true,
		placeholder: 'Ponto Medicao',
	},
	nomeMedicaoLabel: 'Nome Medicao',
	nomeMedicaoInputProps: {
		name: 'nomeMedicao',
		id: 'nomeMedicao',
		required: true,
		placeholder: 'Nome Medicao',
	},
	categoriaLabel: 'Categoria',
	categoriaInputProps: {
		name: 'categoria',
		id: 'categoria',
		required: true,
		placeholder: 'Categoria',
	},
	subMercadoLabel: 'SubMercado',
	subMercadoInputProps: {
		name: 'subMercado',
		id: 'subMercado',
		required: true,
		placeholder: 'SubMercado',
	},
	activeLabel: 'Ativo',
	activeInputProps: {
		name: 'active',
		id: 'active',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormClient;