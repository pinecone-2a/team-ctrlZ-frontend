import EditProfile from "./profileEdit";
import EditPassword from "./passwordEdit";
import EditPayment from "./editPayment";
import SuccessMess from "./successMess";
export default function AccountSettings() {
  return (
    <div className="flex flex-col bg-slate-600 items-center gap-6 p-10 ">
      <EditProfile />
      <EditPassword />
      <EditPayment />
      <SuccessMess />
    </div>
  );
}
