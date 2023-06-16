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
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillFacebook,
} from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, useFormik } from "formik";
import YupPassword from "yup-password";
import * as Yup from "yup";
import { api } from "../api/api";

export default function Login() {
  //loading menunggu submitted
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  YupPassword(Yup);
  //set formik dan yup
  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("You need to enter your email.")
        .email(
          "This email is invalid. Make sure it's written like example@email.com"
        ),
      password: Yup.string()
        .required("You need to enter a password")
        .min(
          8,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .minLowercase(1, "Must Contain One Lowercase")
        .minUppercase(1, "Must Contain One Uppercase")
        .minSymbols(1, "Must Contain One Symbol")
        .minNumbers(1, "Must Contain One Number"),
      fullname: Yup.string().required("Enter your Full Name for your Biodata."),
      username: Yup.string().required("Enter a name for your profile."),
    }),
    onSubmit: async () => {
      try {
        setIsLoading(true);
        const { fullname, username, email, password } = formik.values;
        const user = { fullname, username, email, password };

        const checkUsername = await api
          .get("/user/v3", {
            params: { username: username },
          })
          .then((result) => {
            console.log(result);
            if (result.data.length) {
              return true;
            } else {
              return false;
            }
          });
        console.log(checkUsername);
        if (checkUsername) {
          setIsLoading(false);
          return alert("username already exist");
        } else {
          await api.post("/user/", user).then((res) => {
            alert("account successfully created");
            nav("/login");
            setIsLoading(false);
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  function inputHandler(event) {
    const { value, id } = event.target;
    console.log({ id, value });
    formik.setFieldValue(id, value);
  }
  //usestate password
  const [seePassword, setSeePassword] = useState(false);
  //navigate
  const nav = useNavigate();
  //submit value register

  return (
    <Center maxW={"100vw"} w={"100%"} flexDir={"column"} rowGap={"10px"}>
      <Flex
        maxW={"414px"}
        w={"100%"}
        minW={"200px"}
        flexDir={"column"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Flex
          maxW={"414px"}
          w={"100%"}
          h={"780px"}
          justifyContent={"center"}
          paddingTop={"12px"}
          // bg={"blue"}
        >
          <Center
            flexDir={"column"}
            gap={"10px"}
            maxW={"350px"}
            w={"100%"}
            h={"100%"}
            padding={"40px 20px 20px 20px"}
            border={"1px solid lightgrey"}
            // bg={"red"}
          >
            <Image src={logo} maxW={"175px"} w={"100%"} h={"65px"} />
            <Flex
              fontSize={"17px"}
              fontWeight={"800"}
              textAlign={"center"}
              color={"#737373"}
              maxW={"280px"}
              w={"100%"}
            >
              Sign up to see photos and videos from your friends.
            </Flex>
            <Flex
              flexDir={"column"}
              maxW={"260px"}
              w={"100%"}
              h={"460px"}
              paddingTop={"14px"}
              alignItems={"center"}
              rowGap={"10px"}
            >
              <Button
                w={"100%"}
                h={"32px"}
                bg={"#0095f6"}
                color={"white"}
                gap={"5px"}
              >
                <Icon as={AiFillFacebook} fontSize={"20px"}></Icon>
                <Flex>Log in with Facebook</Flex>
              </Button>
              <Center
                w={"100%"}
                h={"48px"}
                color={"black"}
                gap={"20px"}
                padding={"12px 0px"}
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
              <Flex flexDir={"column"} w={"100%"}>
                <InputGroup>
                  <Input
                    w={"100%"}
                    h={"38px"}
                    padding={"0px 10px"}
                    placeholder="Email"
                    borderRadius={"5px"}
                    id="email"
                    onChange={inputHandler}
                  ></Input>
                  <InputRightElement h={"100%"}>
                    <Icon
                      as={MdOutlineCancel}
                      fontSize={"22px"}
                      color={"red"}
                      display={formik.errors.email ? "box" : "none"}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex
                  color={"#d41b2d"}
                  alignItems={"center"}
                  fontWeight={"light"}
                  fontSize={"10px"}
                  display={formik.errors.email ? "box" : "none"}
                >
                  {formik.errors.email}
                </Flex>
              </Flex>
              <Flex flexDir={"column"} w={"100%"}>
                <InputGroup>
                  <Input
                    w={"100%"}
                    h={"38px"}
                    padding={"0px 10px"}
                    placeholder="Full Name"
                    borderRadius={"5px"}
                    id="fullname"
                    onChange={inputHandler}
                  ></Input>

                  <InputRightElement h={"100%"}>
                    <Icon
                      as={MdOutlineCancel}
                      fontSize={"22px"}
                      color={"red"}
                      display={formik.errors.fullname ? "box" : "none"}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex
                  color={"#d41b2d"}
                  alignItems={"center"}
                  fontWeight={"light"}
                  fontSize={"10px"}
                  display={formik.errors.fullname ? "box" : "none"}
                >
                  {formik.errors.fullname}
                </Flex>
              </Flex>
              <Flex flexDir={"column"} w={"100%"}>
                <InputGroup>
                  <Input
                    w={"100%"}
                    h={"38px"}
                    padding={"0px 10px"}
                    placeholder="Username"
                    borderRadius={"5px"}
                    id="username"
                    onChange={inputHandler}
                  ></Input>
                  <InputRightElement h={"100%"}>
                    <Icon
                      as={MdOutlineCancel}
                      fontSize={"22px"}
                      color={"red"}
                      display={formik.errors.username ? "box" : "none"}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex
                  color={"#d41b2d"}
                  alignItems={"center"}
                  fontWeight={"light"}
                  fontSize={"10px"}
                  display={formik.errors.username ? "box" : "none"}
                >
                  {formik.errors.username}
                </Flex>
              </Flex>
              <Flex flexDir={"column"} w={"100%"}>
                <InputGroup>
                  <Input
                    w={"100%"}
                    h={"38px"}
                    padding={"0px 10px"}
                    placeholder="Password"
                    borderRadius={"5px"}
                    id="password"
                    type={seePassword ? "text" : "password"}
                    onChange={inputHandler}
                  ></Input>
                  <InputRightElement h={"100%"} w={"60px"}>
                    <Icon
                      w={"24px"}
                      h={"24px"}
                      color={"#A5A5A5"}
                      cursor={"pointer"}
                      as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                      onClick={() => setSeePassword(!seePassword)}
                    ></Icon>
                    <Icon
                      as={MdOutlineCancel}
                      fontSize={"22px"}
                      color={"red"}
                      display={formik.errors.password ? "box" : "none"}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex
                  color={"#d41b2d"}
                  alignItems={"center"}
                  fontWeight={"light"}
                  fontSize={"10px"}
                  display={formik.errors.password ? "box" : "none"}
                >
                  {formik.errors.password}
                </Flex>
              </Flex>
              <Center
                fontSize={"12px"}
                textAlign={"center"}
                padding={"5px 10px"}
              >
                People who use our service may have uploaded your contact
                information to Instagram. Learn More
              </Center>
              <Center
                fontSize={"12px"}
                textAlign={"center"}
                padding={"5px 10px"}
              >
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy .
              </Center>
              <Button
                w={"100%"}
                h={"32px"}
                bg={"#4cb5f9"}
                color={"white"}
                onClick={formik.handleSubmit}
              >
                Sign up
              </Button>
            </Flex>
          </Center>
        </Flex>
      </Flex>
      <Center
        maxW={"350px"}
        w={"100%"}
        h={"62px"}
        gap={"4px"}
        border={"1px solid lightgrey"}
      >
        <Center fontSize={"14px"}>Have an account?</Center>
        <Center
          fontSize={"14px"}
          color={"#4cb5f9"}
          onClick={() => {
            nav("/login");
          }}
        >
          Log in
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
        paddingBottom={"80px"}
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
    </Center>
  );
}
