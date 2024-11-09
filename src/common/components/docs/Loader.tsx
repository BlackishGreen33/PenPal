import Image from 'next/image';

const Loader: React.FC = () => (
  <div className="flex size-full h-screen items-center justify-center gap-3 text-white">
    <Image
      src="/assets/icons/loader.svg"
      alt="loader"
      width={32}
      height={32}
      className="animate-spin"
    />
    Loading...
  </div>
);

export default Loader;