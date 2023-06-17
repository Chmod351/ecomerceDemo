import { sliderItems } from '../data/sliderData';

function SetNewItem(setCurrentItem) {
  const images = sliderItems;
  let counter = 1;
  const intervalId = setInterval(() => {
    setCurrentItem(images[counter % images.length]);
    counter++;
  }, 5000);
  return () => clearInterval(intervalId);
}

export default SetNewItem;
