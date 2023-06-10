import { FaceRounded } from '@material-ui/icons';
export const sliderItems = [
  {
    id: 1,
    img: 'https://i.ibb.co/DG69bQ4/2.png',
    title: 'SUMMER SALE',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fff',
  },
  {
    id: 2,
    img: 'https://i.ibb.co/DG69bQ4/2.png',
    title: 'AUTUMN COLLECTION',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fff',
  },
  {
    id: 3,
    img: 'https://i.ibb.co/cXFnLLV/3.png',
    title: 'LOUNGEWEAR LOVE',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fff',
  },
];

export const categories = [
  {
    _id: 1,
    img: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    title: 'SHIRT STYLE!',
    tags: 'women',
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

export const phones = [
  { id: 1, number: '(011) 4545 4242' },
  { id: 2, number: '(011) 4545 4242' },
  { id: 3, number: '(011) 4545 4242' },
];

const hours = ['11–15', '19–23'];
export const schedule = [
  { id: 1, date: 'Mon', hour: hours[0] + ' to ' + hours[1] },
  { id: 2, date: 'Tue', hour: hours[0] + ' to ' + hours[1] },
  { id: 3, date: 'Wed', hour: hours[0] + ' to ' + hours[1] },
  { id: 4, date: 'Thu', hour: hours[0] + ' to ' + hours[1] },
  { id: 5, date: 'Fri', hour: hours[0] + ' to ' + hours[1] },
  { id: 6, date: 'Sat', hour: hours[0] + ' to ' + hours[1] },
  { id: 7, date: 'Sun', hour: hours[1] },
];

export const social = [
  {
    id: 1,
    icon: <FaceRounded />,
    platform: 'Facebook',
    link: 'www.facebook.com',
  },
  {
    id: 2,
    icon: <FaceRounded />,
    platform: 'Tiwtter',
    link: 'www.twitter.com',
  },
  {
    id: 3,
    icon: <FaceRounded />,
    platform: 'Instagram',
    link: 'www.instagram.com',
  }
];

export  const Toast={
  success:{
    removed:'removed from cart succesfully!',
    added:'added to cart'
  },
  welcome:'Welcome',

}