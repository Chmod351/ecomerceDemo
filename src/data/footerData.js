import {
  Facebook,
  Twitter,
  PhoneInTalk,
  Instagram,
  WhatsApp,
  LocationOn,
} from '@material-ui/icons';

// objects footer 

const hours = ['11:00–15:00', '19:00–23:00'];
export const schedule = [
  { id: 1, Date: 'Monday', hour: hours[0] + ' to ' + hours[1] },
  { id: 2, Date: 'Tuesday', hour: hours[0] + ' to ' + hours[1] },
  { id: 3, Date: 'Wednesday', hour: hours[0] + ' to ' + hours[1] },
  { id: 4, Date: 'Thursday', hour: hours[0] + ' to ' + hours[1] },
  { id: 5, Date: 'Friday', hour: hours[0] + ' to ' + hours[1] },
  { id: 6, Date: 'Saturday', hour: hours[0] + ' to ' + hours[1] },
  { id: 7, Date: 'Sunday', hour: hours[1] },
];

export const phones = [
  { id: 1, number: '(011) 4545 4242', icon: <PhoneInTalk /> },
  { id: 2, number: '(011) 4545 4242', icon: <WhatsApp /> },
  { id: 3, number: '(011) 4545 4242', icon: <PhoneInTalk /> },
  { id: 4, number: 'Fake Street 1234', icon: <LocationOn /> },
];

export const social = [
  {
    id: 1,
    icon: <Facebook />,
    platform: 'Facebook',
    link: 'www.facebook.com',
  },
  {
    id: 2,
    icon: <Twitter />,
    platform: 'Tiwtter',
    link: 'www.twitter.com',
  },
  {
    id: 3,
    icon: <Instagram />,
    platform: 'Instagram',
    link: 'www.instagram.com',
  },
];