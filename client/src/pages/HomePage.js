import { Box } from "@chakra-ui/react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import PostCard from "../components/postCard";
import { api } from "../api/api";
import { useEffect, useState } from "react";

export default function HomePage() {
  //get all post
  const [allPost, setAllPost] = useState();
  useEffect(() => {
    const fetchAll = async () => {
      try {
        await api.get("/post/v1").then((res) => {
          console.log(res.data.user);
          setAllPost(res.data.user);
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    console.log(allPost);
    fetchAll();
  }, []);
  return (
    <>
      <Navbar />
      <Box paddingTop={"60px"} paddingBottom={"40px"}>
        <PostCard allPost={allPost} />
      </Box>

      <Footer />
    </>
  );
}
