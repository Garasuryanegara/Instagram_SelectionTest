import {
  Button,
  Center,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxLockClosed } from "react-icons/rx";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillFacebook,
} from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function ChangePassword() {
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      password: "",
      password2: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(
          8,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .minLowercase(1, "Must Contain One Lowercase")
        .minUppercase(1, "Must Contain One Uppercase")
        .minSymbols(1, "Must Contain One Symbol")
        .minNumbers(1, "Must Contain One Number"),
      password2: Yup.string()
        // .required("You need to confirm your password.")
        .oneOf([Yup.ref("password"), null], "The password don't match."),
    }),
    onSubmit: async () => {
      const { password, password2 } = formik.values;
      const pass = { password, password2 };
      // console.log(pass);
      console.log(token);
      await api
        .patch("user/change-password?token=" + token, pass)
        .then((res) => {
          alert(res.data.message);
          nav("/login");
        });
    },
  });
  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
  }
  //hide unhide pass
  const [seePassword, setSeePassword] = useState(false);
  const [seePassword2, setSeePassword2] = useState(false);
  //change password function
  const location = useLocation();
  const nav = useNavigate();
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  //mencari dan menampilkan dataValues pada token yang ada
  const fetchUser = async (tkn) => {
    await api
      .get("/user/v2", { params: { token: tkn } })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token2 = location.pathname.split("/")[2];
    fetchUser(token2);
    setToken(token2);
  }, []);
  return (
    <>
      <Center w={"100vw"} h={"100vh"}>
        <Flex
          maxW={"388px"}
          w={"100%"}
          maxH={"475px"}
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
            Type your new password
          </Center>
          <Flex flexDir={"column"} maxW={"300px"} w={"100%"}>
            <InputGroup>
              <Input
                maxW={"300px"}
                w={"100%"}
                placeholder="New Password"
                padding={"0px 10px"}
                id="password"
                onChange={inputHandler}
                type={seePassword ? "type" : "password"}
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
          <Flex flexDir={"column"} maxW={"300px"} w={"100%"}>
            <InputGroup>
              <Input
                maxW={"300px"}
                w={"100%"}
                placeholder="Confirm Password"
                padding={"0px 10px"}
                id="password2"
                onChange={inputHandler}
                type={seePassword2 ? "type" : "password"}
              ></Input>
              <InputRightElement h={"100%"} w={"60px"}>
                <Icon
                  w={"24px"}
                  h={"24px"}
                  color={"#A5A5A5"}
                  cursor={"pointer"}
                  as={seePassword2 ? AiOutlineEye : AiOutlineEyeInvisible}
                  onClick={() => setSeePassword2(!seePassword2)}
                ></Icon>
                <Icon
                  as={MdOutlineCancel}
                  fontSize={"22px"}
                  color={"red"}
                  display={formik.errors.password2 ? "box" : "none"}
                />
              </InputRightElement>
            </InputGroup>
            <Flex
              color={"#d41b2d"}
              alignItems={"center"}
              fontWeight={"light"}
              fontSize={"10px"}
              display={formik.errors.password2 ? "box" : "none"}
            >
              {formik.errors.password2}
            </Flex>
          </Flex>
          <Button
            maxW={"300px"}
            w={"100%"}
            h={"32px"}
            bg={"#4cb5f9"}
            color={"white"}
            onClick={formik.handleSubmit}
          >
            Change Password
          </Button>
        </Flex>
      </Center>
    </>
  );
}
