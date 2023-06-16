import { Button, Center, Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RxLockClosed } from "react-icons/rx";
import { api } from "../api/api";

export default function ForgotPassword() {
  //menampung value email
  const [email, setEmail] = useState("");
  // function check email dan kirim email
  const forgotPassword = async () => {
    await api
      .get("/user/generate-token/email", {
        params: {
          email,
        },
      })
      .then((res) => alert(res.data.message));
  };

  return (
    <>
      <Center w={"100vw"} h={"100vh"}>
        <Flex
          maxW={"388px"}
          w={"100%"}
          maxH={"375px"}
          h={"100%"}
          border={"1px solid lightgrey"}
          padding={"16px 0px"}
          flexDir={"column"}
          rowGap={"15px"}
          alignItems={"center"}
        >
          <Flex
            w={"100%"}
            h={"120px"}
            paddingTop={"24px"}
            justifyContent={"center"}
          >
            <Center
              w={"96px"}
              h={"96px"}
              border={"3px solid"}
              borderRadius={"96px"}
            >
              <Icon as={RxLockClosed} w={"60px"} h={"60px"}></Icon>
            </Center>
          </Flex>
          <Center
            maxW={"300px"}
            w={"100%"}
            fontSize={"16px"}
            fontWeight={"500"}
          >
            Trouble logging in?
          </Center>
          <Center
            fontSize={"14px"}
            maxW={"300px"}
            w={"100%"}
            textAlign={"center"}
          >
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </Center>
          <Input
            maxW={"300px"}
            w={"100%"}
            placeholder="Email, phone, or username"
            padding={"0px 10px"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <Button
            maxW={"300px"}
            w={"100%"}
            h={"32px"}
            bg={"#4cb5f9"}
            color={"white"}
            onClick={forgotPassword}
          >
            Send login link
          </Button>
          <Center maxW={"300px"} w={"100%"} fontSize={"12px"}>
            Can't reset your password?
          </Center>
        </Flex>
      </Center>
    </>
  );
}
