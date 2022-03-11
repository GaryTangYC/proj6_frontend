/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import ProfileAccordions from "../components/ProfileAccordion";

<<<<<<< HEAD
const title = "Profile";

// const render = "This is from profile page.";

// ajax call to backend and store data object then pass as prop to
// use context to store data

=======
>>>>>>> d039b22d137477ae29f5977068e337b8aa0f113a
export default function ProfilePage() {
  return (
    <DashboardContent title="Profile">
      <ProfileAccordions />
    </DashboardContent>
  );
}
