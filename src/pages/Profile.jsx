/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import ProfileAccordions from "../components/profile/ProfileAccordion";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export default function ProfilePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    const url = "http://localhost:3004/user/profile";

    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContent title="Profile">
      <DataContext.Provider value={{ data, setData }}>
        <ProfileAccordions />
      </DataContext.Provider>
    </DashboardContent>
  );
}
