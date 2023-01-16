import {
	MdBuild,
	MdDashboard,
	MdApps,
	MdOutlinePersonPinCircle,
	MdOutlineOutbond,
	MdBusiness,
	MdSegment,
	MdOutlineVerticalDistribute,
	MdViewModule,
} from 'react-icons/md';
import {
	FaUserAlt,
	FaSuitcase,
	FaFileContract,
	FaMountain,
} from 'react-icons/fa';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { RiPriceTag3Fill } from 'react-icons/ri';

export const navItems = [
	{
		to: '/',
		name: 'Dashboard',
		exact: true,
		Icon: MdDashboard,
	},
	{
		to: '/',
		name: 'Aplicações',
		exact: true,
		Icon: MdDashboard,
	},
	{
		to: '/provider',
		name: 'Provedores',
		exact: true,
		Icon: MdDashboard,
	},
];

export const navAux = [
	{
		to: '/usuarios',
		name: 'Usuários',
		exact: false,
		IconSub: FaUserAlt,
		id: 152,
	},
];

export const routes = [
	{
		name: 'Auxiliares',
		icon: MdBuild,
		submodules: navAux,
	},
];
