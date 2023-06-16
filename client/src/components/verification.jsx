import { Button, Center, Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Verification() {
  //menampung value email
  const [email, setEmail] = useState("");
  return (
    <>
      <Center w={"100vw"} h={"100vh"}>
        <Flex
          maxW={"388px"}
          w={"100%"}
          maxH={"375px"}
          h={"100%"}
          border={"3px solid green"}
          padding={"16px 0px"}
          flexDir={"column"}
          rowGap={"15px"}
          alignItems={"center"}
        >
          <Flex
            w={"100%"}
            h={"100%"}
            // paddingTop={"24px"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap={"30px"}
          >
            <Icon
              as={BsCheckCircleFill}
              w={"100px"}
              h={"100px"}
              color={"green"}
            />
            <Flex color={"green"} fontSize={"24px"} textAlign={"center"}>
              YOUR EMAIL HAS BEEN VERIFIED
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
