import {
  Box,
  Flex,
  Center,
  Image,
  Input,
  Button,
  Icon,
  Avatar,
  useDisclosure,
  ModalContent,
  ModalOverlay,
  Modal,
} from "@chakra-ui/react";
import logo from "../assets/images/Instagram_logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { BsCameraReels } from "react-icons/bs";
import { MdExplore } from "react-icons/md";
import { TbMessageCircle2 } from "react-icons/tb";
import { FcLikePlaceholder } from "react-icons/fc";
import { FiPlusSquare } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ModalPost from "./modalPost";
import { useSelector } from "react-redux";

export default function Footer() {
  const nav = useNavigate();
  //buka tutup modal posting
  const { isOpen, onOpen, onClose } = useDisclosure();
  //ambil data dengan userSelector
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <Flex
        flexDir={"row"}
        id="sidebar"
        justifyContent={"space-around"}
        position={"fixed"}
        bottom={"0"}
        zIndex={"3"}
        width={"100vw"}
        bg={"white"}
      >
        <Flex
          className="flexSideBar"
          onClick={() => {
            nav("/home");
          }}
        >
          <Icon as={AiOutlineHome} height="24px" width="24px"></Icon>
        </Flex>
        <Flex
          className="flexSideBar"
          onClick={() => {
            onOpen();
          }}
        >
          <Icon as={FiPlusSquare} height="24px" width={"24px"}></Icon>
        </Flex>
        {/* <Flex className="flexSideBar">
          <Icon as={BsCameraReels} height="24px" width={"24px"}></Icon>
        </Flex> */}
        {/* <Flex className="flexSideBar">
          <Icon as={TbMessageCircle2} height="24px" width={"24px"}></Icon>
        </Flex> */}
        <Flex
          className="flexSideBar"
          onClick={() => {
            nav("/profile");
          }}
        >
          <Avatar
            height="24px"
            width={"24px"}
            src={userSelector.img_url}
          ></Avatar>
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
          <ModalPost isOpen={isOpen} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
