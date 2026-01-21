import BG from "../components/styles/BG";

const LoadingPage = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
      {/* Background blobs */}
      <BG />

      {/* Spinner overlay */}
      <div className="absolute flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-4 border-black/30 border-t-white rounded-full animate-spin"></div>
        <p className="text-black/30 text-lg tracking-wide">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
