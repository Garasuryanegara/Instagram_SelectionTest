import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  Image,
  GridItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BsGearWide, BsPersonVideo } from "react-icons/bs";
import { MdOutlineWindow } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ModalEdit from "./modalEdit";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../api/api";
export default function ProfileContent() {
  const posts = [
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
    {
      img: "https://e1.pxfuel.com/desktop-wallpaper/892/148/desktop-wallpaper-instagram-lowkezmedia-for-daily-porsche-rwb-phone.jpg",
    },
  ];
  //fetch posting by id dan hitung jumlah post
  const [postings, setPostings] = useState([]);
  const fetchPost = async () => {
    await api
      .get("/post/v2", { params: { user_id: userSelector.id } })
      .then((res) => {
        console.log(res.data);
        setPostings(res.data);
      });
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const nav = useNavigate();
  //buka tutup modal posting
  const { isOpen, onOpen, onClose } = useDisclosure();
  // memanggil userselector
  const userSelector = useSelector((state) => state.auth);
  // console.log(userSelector);

  //logout function
  const logout = () => {
    localStorage.removeItem("auth");
    return nav("/login");
  };
  return (
    <>
      <Flex
        w={"100vw"}
        alignItems={"center"}
        flexDir={"column"}
        h={"100%"}
        // bg={"blue"}
      >
        <Flex
          maxW={"975px"}
          w={"100%"}
          padding={"30px 20px"}
          flexDir={"column"}
        >
          <Flex w={"100%"} h={"150px"} justifyContent={"space-between"}>
            <Center w={"291px"} h={"100%"}>
              <Box maxW={"150px"} w={"100%"} maxH={"150px"} h={"100%"}>
                <Avatar boxSize={"100%"} src={userSelector.img_url} />
              </Box>
            </Center>
            <Flex w={"613px"} h={"100%"} rowGap={"20px"} flexDir={"column"}>
              <Flex w={"100%"} h={"40px"} alignItems={"center"}>
                <Flex
                  fontSize={"20px"}
                  fontWeight={"400"}
                  alignItems={"center"}
                >
                  {userSelector.username}
                </Flex>
                <Flex paddingLeft={"20px"} paddingRight={"7px"}>
                  <Button
                    w={"110px"}
                    h={"32px"}
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Edit profile
                  </Button>
                </Flex>
                <Menu>
                  <MenuButton h={"100%"} w={"40px"}>
                    <Icon as={BsGearWide} fontSize={"24px"} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={logout}>Log out</MenuItem>
                    <MenuItem>Delete account</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Flex w={"100%"} h={"18px"} alignItems={"center"} gap={"40px"}>
                <Flex fontSize={"16px"} gap={"4px"}>
                  <Flex fontWeight={"500"}>1</Flex>
                  post
                </Flex>
                <Flex fontSize={"16px"} gap={"4px"}>
                  <Flex fontWeight={"500"}>711</Flex>
                  followers
                </Flex>
                <Flex fontSize={"16px"} gap={"4px"}>
                  <Flex fontWeight={"500"}>555</Flex>
                  following
                </Flex>
              </Flex>
              <Flex
                w={"100%"}
                h={"18px"}
                alignItems={"center"}
                fontSize={"14px"}
                fontWeight={"500"}
              >
                {userSelector.fullname}
              </Flex>
              <Flex
                w={"100%"}
                h={"18px"}
                alignItems={"center"}
                fontSize={"14px"}
                fontWeight={"400"}
              >
                {userSelector.biodata}
              </Flex>
            </Flex>
          </Flex>
          <Center
            w={"100%"}
            h={"53px"}
            borderTop={"1px solid lightgrey"}
            marginTop={"44px"}
          >
            <Center
              maxW={"309px"}
              w={"100%"}
              h={"100%"}
              justifyContent={"space-between"}
              fontSize={"12px"}
            >
              <Center h={"100%"} borderTop={"2px solid black"}>
                <Flex alignItems={"center"} gap={"5px"} letterSpacing={"0.5px"}>
                  <MdOutlineWindow fontSize={"12px"} />
                  POSTS
                </Flex>
              </Center>
              <Center h={"100%"}>
                <Flex alignItems={"center"} gap={"5px"} letterSpacing={"0.5px"}>
                  <CiSaveDown2 fontSize={"12px"} />
                  SAVED
                </Flex>
              </Center>
              <Center h={"100%"}>
                <Flex alignItems={"center"} gap={"5px"} letterSpacing={"0.5px"}>
                  <BsPersonVideo fontSize={"12px"} />
                  TAGGED
                </Flex>
              </Center>
            </Center>
          </Center>
          <Grid
            w={"100%"}
            templateColumns={"repeat(3, 1fr)"}
            gridGap="4px"
            gridRowGap="4px"
            // maxH={`${(Math.floor(postings.length / 3) + 1) * 309}px`}
            // maxH={"2000px"}
            // h={"100%"}
            // bg={"red"}
          >
            {postings.map((val) => (
              <>
                <Box maxH={"309px"} maxW={"309px"} h={"100%"} w={"100%"}>
                  {/* <GridItem> */}
                  <Image
                    src={val.img_url}
                    w={"309px"}
                    h={"309px"}
                    objectFit={"contain"}
                  />
                  {/* </GridItem> */}
                </Box>
              </>
            ))}
          </Grid>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW={"700px"}
          w={"100%"}
          maxH={"500px"}
          h={"100%"}
          borderRadius={"8px"}
        >
          <ModalEdit isOpen={isOpen} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
