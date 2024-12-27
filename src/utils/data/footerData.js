import {
	Twitter,
	Instagram,
	MailOutline,
	TikTok,
	Phone,
	Room,
} from '@material-ui/icons';

import tiktok from '../../assests/social-media.png';
import threads from '../../assests/threads.png';
// objects footer

export const e = [
	{
		id: 21,
		route: '/products/tops',
		name: 'TOPS',
	},
	{
		id: 22,
		route: '/cart',
		name: 'My Cart',
	},

	{
		id: 23,
		route: '/products/bottoms',
		name: 'BOTTOMS',
	},
	{
		id: 24,
		route: '/',
		name: 'My Account',
	},
	{
		id: 25,
		route: '/products/shoes',
		name: 'SHOES',
	},
	{
		id: 26,
		route: '/privacy',
		name: 'Privacy Policy',
	},

	{
		id: 27,
		route: '/',
		name: 'Home',
	},
	{
		id: 28,
		route: '/',
		name: 'Terms',
	},
	{
		id: 29,
		route: '/products/accesories',
		name: 'ACCESORIES',
	},
];

export const social = [
	{
		id: 31,
		icon: tiktok,
		platform: 'tiktok',
		color: 'none',
		link: 'https://www.tiktok.com/@lazy.trendy',
	},
	{
		id: 32,
		icon: threads,
		platform: 'Tiwtter',
		color: 'none',
		link: 'https://www.threads.net/@lazytrendy_?xmt=AQGzokS8rTvdDCJi016LbGHxssm5hucIZvUluQuWuHbB8qc',
	},
	{
		id: 33,
		icon: <Instagram />,
		platform: 'Instagram',
		color: 'E4405F',
		link: 'https://www.instagram.com/lazytrendy',
	},
];

export const contact = [
	{
		id: 331,
		icon: <Room style={{ marginRight: '10px' }} />,
		text: '351 Jes Kasper ,South Tobhchanester 666',
		url: 'https://osm.org/go/N2AIN--?m=',
	},
	{
		id: 332,
		icon: <Phone style={{ marginRight: '10px' }} />,
		text: '+54 9 11 3230-0253',
		url: 'https://wa.me/+5491132300253',
	},
	{
		id: 333,
		icon: <MailOutline style={{ marginRight: '10px' }} />,
		text: 'email@selene.com',
		url: 'mailto:email@selene.com',
	},
];
