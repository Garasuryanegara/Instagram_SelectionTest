import {
  Box,
  Flex,
  Center,
  Image,
  Input,
  Button,
  Icon,
  Avatar,
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

export default function Navbar() {
  return (
    <>
      <Flex flexDir={"column"} maxW={"100vw"}>
        <Flex
          maxW={"100vw"}
          w={"100%"}
          h={"60px"}
          paddingTop={"5px"}
          paddingLeft={"22px"}
          paddingRight={"13px"}
          justifyContent={"space-between"}
          zIndex={"3"}
          position={"fixed"}
          bg={"white"}
        >
          <Flex id="logoInstagram">
            <Image src={logo} w={"130px"} />
          </Flex>
          <Flex h={"40px"} alignItems={"center"} gap={"20px"}>
            <Icon as={FiSearch} height="24px" width={"24px"}></Icon>
            {/* <Icon as={FiPlusSquare} height="24px" width={"24px"}></Icon>
            <Icon as={FcLikePlaceholder} height="24px" width={"24px"}></Icon> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
