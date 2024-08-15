import Carousel from "../Carusol/Carusol";

const DATA = [
  {
    image:
      "https://mercury.akamaized.net/i/f69f6799ef768907bf29aa645f584c89_240035_0.jpg",
  },
  {
    image:
      "https://mercury.akamaized.net/i/e5d95a8f3b1ca1ae074622e98c609890_100354_0.png",
  },
  {
    image:
      "https://mercury.akamaized.net/i/0901346fa3926452deb0ed83d150a33e_238688_0.jpg",
  },
];

const CarusolSet = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-screen">
        <Carousel data={DATA} />
      </div>
    </main>
  );
};

export default CarusolSet;
