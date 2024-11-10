import Header from './Header';
import RoomDocuments from './RoomDocuments';

const Home: React.FC = () => (
  <main
    id="livedocs"
    className="relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10"
  >
    <Header />
    <RoomDocuments />
  </main>
);

export default Home;
