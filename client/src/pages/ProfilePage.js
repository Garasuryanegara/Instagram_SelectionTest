import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ProfileContent from "../components/profileContent";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <Box paddingTop={"60px"} paddingBottom={"40px"}>
        <ProfileContent />
      </Box>
      <Footer />
    </>
  );
}
