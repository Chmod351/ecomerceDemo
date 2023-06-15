import {
  Facebook,
  Twitter,
  PhoneInTalk,
  Instagram,
  WhatsApp,
  LocationOn,
} from '@material-ui/icons';
import grupoMujeres from './assests/grupoMujer.webp';
import vestido from './assests/vestidonegro.webp';
import sombrero from './assests/sombreroPaja.avif';
export const sliderItems = [
  {
    id: 10,
    img: vestido,
    title: 'Effortless Elegance, Anytime',
    desc: "Don't compromise on style! Discover our collection of elegantly designed dresses that exude sophistication and charm. Whether it's a daytime event or a special occasion, embrace effortless elegance with our curated selection of refined dresses. Enjoy flat 30% off on new arrivals and elevate your daytime looks with timeless grace.",
    bg: 'fff',
    alt: 'women clothes winter',
    tags: 'elegant',
  },
  {
    id: 11,
    img: grupoMujeres,
    title: "Celebrate Life's Moments in Style",
    desc: "Find your perfect casual dresses for every occasion. Whether it's a picnic, a brunch date, or a day out with friends, our collection of vibrant and comfortable dresses has you covered. Enjoy flat 30% off on new arrivals and celebrate life's moments in style.",
    bg: 'fff',
    alt: 'women clothes summer',
    tags: 'autmn',
  },
  {
    id: 12,
    img: sombrero,
    title: 'Escape to Paradise with Fashion',
    desc: 'Get ready for a tropical getaway with our collection of stylish summer dresses. Experience the joy of warm beaches and sunny days in our lightweight and fashionable dresses. Enjoy flat 30% off on new arrivals and escape to paradise with fashion.',
    bg: 'fff',
    alt: 'women clothes autmn',
    tags: '',
  },
];

export const categories = [
  {
    _id: 1,
    img: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'SHIRT STYLE!',
    tags: 'shirt',
  },
  {
    _id: 2,
    img: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'LOUNGEWEAR LOVE',
    tags: 'coat',
  },
  {
    _id: 3,
    img: 'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'LIGHT JACKETS',
    tags: 'jacket',
  },
];

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
