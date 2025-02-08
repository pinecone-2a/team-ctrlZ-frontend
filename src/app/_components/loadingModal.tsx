import Lottie from "lottie-react";
import loadAnimation from "./coffee.json";

export default function LoadingModal({ loading }: any) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-100 ">
      <Lottie animationData={loadAnimation} className="w-[500px] h-[500px]" />
    </div>
  );
}
