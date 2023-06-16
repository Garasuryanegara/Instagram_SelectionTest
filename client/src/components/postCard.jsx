import { Avatar, Box, Center, Flex, Icon, Image } from "@chakra-ui/react";
import { SlOptions, SlPaperPlane } from "react-icons/sl";
import { FcLikePlaceholder } from "react-icons/fc";
import { TbMessageCircle2 } from "react-icons/tb";
import { BsBookmark } from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function PostCard() {
  const userSelector = useSelector((state) => state.auth);
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
    // console.log(allPost);
    fetchAll();
  }, []);

  return (
    <>
      <Flex w={"100vw"} h={"800px"} flexDir={"column"} alignItems={"center"}>
        {allPost?.map((val) => (
          <Flex maxW={"470px"} w={"100%"} h={"800px"} flexDir={"column"}>
            <Center
              w={"100%"}
              h={"60px"}
              padding={"14px"}
              justifyContent={"space-between"}
            >
              <Flex gap={"10px"} h={"40px"} alignItems={"center"}>
                <Avatar w={"32px"} h={"32px"} src={val.user.img_url}></Avatar>
                <Flex
                  fontSize={"14px"}
                  alignItems={"left"}
                  // bg={"red"}
                  flexDir={"column"}
                >
                  <Flex fontWeight={"600"}>{val.user.username}</Flex>
                  <Flex
                    fontSize={"12px"}
                    paddingLeft={"5px"}
                    display={val.location ? "box" : "none"}
                  >
                    {val.location}
                  </Flex>
                </Flex>
              </Flex>
              <Center w={"40px"} h={"40px"}>
                <Icon as={SlOptions} w={"16px"} h={"16px"} />
              </Center>
            </Center>
            <Box maxW={"470px"} w={"100%"} maxH={"565px"} h={"100%"}>
              <Image
                src={val.img_url}
                w={"470px"}
                h={"565px"}
                objectFit={"contain"}
              />
            </Box>
            <Flex
              w={"100%"}
              h={"183px"}
              padding={"5px 16px"}
              flexDir={"column"}
              alignItems={"center"}
            >
              <Flex w={"105%"} h={"54px"} justifyContent={"space-between"}>
                <Center>
                  <Center w={"40px"} h={"40px"}>
                    <Icon as={FcLikePlaceholder} w={"30px"} h={"30px"} />
                  </Center>
                  <Center w={"40px"} h={"40px"}>
                    <Icon
                      as={TbMessageCircle2}
                      transform="scaleX(-1)"
                      w={"24px"}
                      h={"24px"}
                    />
                  </Center>
                  <Center w={"40px"} h={"40px"}>
                    <Icon as={SlPaperPlane} w={"24px"} h={"24px"} />
                  </Center>
                </Center>
                <Center>
                  <Center w={"40px"} h={"40px"}>
                    <Icon as={BsBookmark} w={"24px"} h={"24px"} />
                  </Center>
                </Center>
              </Flex>
              <Flex w={"100%"} h={"18px"} fontSize={"14px"} fontWeight={"500"}>
                147 likes
              </Flex>
              <Flex
                fontSize={"14px"}
                gap={"5px"}
                paddingTop={"10px"}
                w={"100%"}
              >
                <Box fontWeight={"500"}>{val.user.username}</Box>
                <Box>{val.caption}</Box>
              </Flex>
              <Flex
                w={"100%"}
                fontSize={"14px"}
                paddingTop={"5px"}
                color={"grey"}
              >
                View all 12 comments
              </Flex>
              <Flex w={"100%"} h={"11px"} fontSize={"12px"} gap={"10px"}>
                <Box color={"grey"}>1 HOURS AGO</Box>
                <Box> See translation</Box>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
