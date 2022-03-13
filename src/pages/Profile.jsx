/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import ProfileAccordions from "../components/profile/ProfileAccordion";


export default function ProfilePage() {


  return (
    <DashboardContent title="Profile">
        <ProfileAccordions />
    </DashboardContent>
  );
}
