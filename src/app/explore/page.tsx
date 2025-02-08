import Explore from "./explorePage";
import Sidebar from "../_components/sidebar";
export default function expPage() {
  return (
    <div className="flex gap-24">
      <Sidebar />
      <Explore />
    </div>
  );
}
