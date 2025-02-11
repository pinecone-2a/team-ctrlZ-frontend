import Explore from "./explorePage";
import Sidebar from "../_components/sidebar";
import Header from "../home/Header";
export default function expPage() {
  return (
    <div>  
      <Header/>
    <div className="flex gap-24">
      <Sidebar />
      <Explore />
    </div></div>
  );
}
