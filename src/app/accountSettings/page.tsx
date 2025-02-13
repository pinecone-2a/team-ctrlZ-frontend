import EditProfile from "./profileEdit";
import EditPassword from "./passwordEdit";
import EditPayment from "./editPayment";
import SuccessMess from "./successMess";
import Sidebar from "../_components/sidebar";
import Header from "../_components/header";

export default function AccountSettings() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col  items-center gap-6 p-10 ">
          <EditProfile />
          <EditPassword />
          <EditPayment />
          <SuccessMess />
        </div>
      </div>
    </div>
  );
}
