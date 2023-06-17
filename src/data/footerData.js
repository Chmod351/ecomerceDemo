import {
  Facebook,
  Twitter,
  PhoneInTalk,
  Instagram,
  WhatsApp,
  LocationOn,
  MailOutline,
  Phone,
  Room,
} from '@material-ui/icons';

// objects footer

export const e = [
  {
    id: 1,
    route: '/products/shirt',
    name: 'Shirts',
  },
  {
    id: 2,
    route: '/products/coat',
    name: 'Coats',
  },
  {
    id: 3,
    route: '/products/jacket',
    name: 'Jackets',
  },
  {
    id: 4,
    route: '/',
    name: 'Home',
  },

  {
    id: 5,
    route: '/Cart',
    name: 'Wishlist',
  },
  {
    id: 6,
    route: '/',
    name: 'My Account',
  },
  {
    id: 7,
    route: '/',
    name: 'Terms',
  },
  {
    id: 8,
    route: '/',
    name: 'Privacy Policy',
  },
];

export const social = [
  {
    id: 1,
    icon: <Facebook />,
    platform: 'Facebook',
    color: '3B5999',
    link: 'https://www.facebook.com',
  },
  {
    id: 2,
    icon: <Twitter />,
    platform: 'Tiwtter',
    color: '55ACEE',
    link: 'https://www.twitter.com',
  },
  {
    id: 3,
    icon: <Instagram />,
    platform: 'Instagram',
    color: 'E4405F',
    link: 'https://www.instagram.com',
  },
];

export const contact = [
  {
    id: 1,
    icon: <Room style={{ marginRight: '10px' }} />,
    text: '22 Dixie Path ,South Tobinchester 98336',
    url: 'https://osm.org/go/N2AIN--?m=',
  },
  {
    id: 2,
    icon: <Phone style={{ marginRight: '10px' }} />,
    text: '+54 9 2234 556 5578',
    url: '',
  },
  {
    id: 3,
    icon: <MailOutline style={{ marginRight: '10px' }} />,
    text: 'y.kasper@protonmail.com',
    url: 'mailto:y.kasper@protonmail.com',
  },
];
