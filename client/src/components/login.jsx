import {
  Box,
  Container,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react";

import logo from "../assets/images/Instagram_logo.png";
import facebook from "../assets/images/logo_facebook.png";
import google from "../assets/images/get_google.png";
import microsoft from "../assets/images/get_microsoft.png";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
export default function Login() {
  //navigate
  const nav = useNavigate();
  //menampung value email password
  const [user, setUser] = useState({
    usemail: "",
    password: "",
  });
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };
  //melihat password
  const [seePassword, setSeePassword] = useState(false);
  //login function, set localstorage, dan dispatch
  const toast = useToast();
  const dispatch = useDispatch();
  const login = async () => {
    toast.closeAll();
    await api
      .post("/user/v1", user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("auth", JSON.stringify(res.data.token));
        dispatch({
          type: "login",
          payload: res.data.value,
        });
        console.log(res.data.value);
        toast({
          title: "Hi, You're Successfully Logged In!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return nav("/home");
      })
      .catch((err) => {
        console.log(err.message);

        return toast({
          title: "Login failed, wrong Email/Password.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Center maxW={"100vw"} w={"100%"} h={"100vh"}>
      <Flex
        maxW={"414px"}
        w={"100%"}
        minW={"200px"}
        h={"100vh"}
        flexDir={"column"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Flex
          maxW={"414px"}
          w={"100%"}
          h={"450px"}
          alignItems={"center"}
          justifyContent={"center"}
          paddingTop={"28px"}
        >
          <Center
            flexDir={"column"}
            gap={"10px"}
            maxW={"350px"}
            w={"100%"}
            padding={"40px 20px 20px 20px"}
            border={"1px solid lightgrey"}
            // bg={"red"}
          >
            <Image src={logo} maxW={"175px"} w={"100%"} h={"65px"} />
            <Flex
              flexDir={"column"}
              maxW={"270px"}
              w={"100%"}
              h={"265px"}
              paddingTop={"24px"}
              alignItems={"center"}
              rowGap={"10px"}
            >
              <Input
                maxW={"270px"}
                w={"100%"}
                h={"38px"}
                padding={"0px 10px"}
                placeholder="Username or email"
                borderRadius={"5px"}
                id="usemail"
                onChange={inputHandler}
              ></Input>
              <InputGroup>
                <Input
                  maxW={"270px"}
                  w={"100%"}
                  h={"38px"}
                  type={!seePassword ? "password" : "text"}
                  padding={"0px 10px"}
                  placeholder="Password"
                  borderRadius={"5px"}
                  id="password"
                  onChange={inputHandler}
                ></Input>
                <InputRightElement>
                  <Icon
                    w={"24px"}
                    h={"24px"}
                    color={"#A5A5A5"}
                    cursor={"pointer"}
                    as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                    onClick={() => setSeePassword(!seePassword)}
                  ></Icon>
                </InputRightElement>
              </InputGroup>
              <Button
                maxW={"270px"}
                w={"100%"}
                h={"32px"}
                bg={"#4cb5f9"}
                color={"white"}
                onClick={login}
              >
                Log in
              </Button>
              <Center
                maxW={"270px"}
                w={"100%"}
                h={"48px"}
                color={"black"}
                gap={"20px"}
                paddingBottom={"12px"}
              >
                <Center w={"100%"}>
                  <Box h={"1.6px"} w={"100%"} bgColor={"#d9dadc"}></Box>
                </Center>
                <Box height={"38px"} paddingTop={"7px"} color={"grey"}>
                  OR
                </Box>
                <Center w={"100%"}>
                  <Box h={"1.6px"} w={"100%"} bgColor={"#d9dadc"}></Box>
                </Center>
              </Center>
              <Center maxW={"270px"} w={"100%"} h={"20px"} gap={"5px"}>
                <Image src={facebook} w={"16px"} h={"16px"}></Image>
                <Flex fontSize={"14px"}>Log in with Facebook</Flex>
              </Center>
              <Flex
                fontSize={"14px"}
                color={"grey"}
                onClick={() => {
                  nav("/forgot-password");
                }}
              >
                Forgot password?
              </Flex>
            </Flex>
          </Center>
        </Flex>
        <Center
          maxW={"350px"}
          w={"100%"}
          h={"62px"}
          gap={"4px"}
          border={"1px solid lightgrey"}
        >
          <Center fontSize={"14px"}>Don't have an account?</Center>
          <Center
            fontSize={"14px"}
            color={"#4cb5f9"}
            onClick={() => {
              nav("/register");
            }}
          >
            Sign Up
          </Center>
        </Center>
        <Center fontSize={"14px"} paddingTop={"10px"}>
          Get the app.
        </Center>
        <Flex
          w={"100%"}
          maxH={"44px"}
          h={"100%"}
          gap={"10px"}
          justifyContent={"center"}
          css={{
            "@media (max-width: 256px)": {
              display: "grid",
              justifyItems: "center",
            },
          }}
        >
          <Image src={google} maxW={"134px"} w={"100%"} h={"100%"} />
          <Image src={microsoft} maxW={"110px"} w={"100%"} h={"100%"} />
        </Flex>
      </Flex>
    </Center>
  );
}
