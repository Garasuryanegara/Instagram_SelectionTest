import { Center, Image, Spinner } from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import routes from "./routes/Routes";
import loading_logo from "./assets/images/loading_ig.png";
import loading_meta from "./assets/images/loading_meta.png";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setLoading(false));
      }, 1000);
    });
  }, [loading]);
  return (
    <>
      {loading ? (
        <Center
          h={"100vh"}
          flexDir={"column"}
          justifyContent={"space-between"}
          padding={"30px"}
        >
          <Image />
          <Image src={loading_logo} boxSize={"70px"} />
          <Image src={loading_meta} h={"60px"} w={"90p"} />
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
