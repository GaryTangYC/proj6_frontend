/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import ProfileAccordions from "../components/profile/ProfileAccordion";

const title = "Profile";

// const render = "This is from profile page.";

// ajax call to backend and store data object then pass as prop to
// use context to store data

export default function ProfilePage() {
  return (
    <DashboardContent title="Profile">
      <ProfileAccordions />
    </DashboardContent>
  );
}
