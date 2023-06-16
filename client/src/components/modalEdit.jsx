import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { api } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalEdit(props) {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //menyimpan file gambar yang dipilih
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const handleFile = async (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const uploadAvatar = async () => {
    // console.log(selectedFile);
    const formData = new FormData();
    formData.append("profileImg", selectedFile);
    console.log(formData);
    let avatar;
    await api
      .post("/user/upload-image/" + userSelector.id, formData)
      .then((res) => (avatar = res.data));
    console.log(avatar);

    if (avatar) {
      dispatch({
        type: "login",
        payload: avatar,
      });
    }
    alert("upload berhasil");
  };
  useEffect(() => {
    if (selectedFile) {
      return uploadAvatar;
    }
  }, [selectedFile]);

  // edit profile
  const nav = useNavigate();
  const inputHandler = async (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    biodata: "",
  });

  const update = async () => {
    const hasil = await api.patch(
      "/user/edit-profile/" + userSelector.id,
      user
    );
    dispatch({
      type: "login",
      payload: hasil.data,
    });
    console.log(hasil);
    return props.onClose();
  };
  return (
    <>
      <Center
        w={"100%"}
        h={"50px"}
        borderTopRadius={"8px"}
        fontSize={"16px"}
        fontWeight={"500"}
        borderBottom={"1px"}
        justifyContent={"space-between"}
        padding={"0px 20px"}
      >
        Edit Profile
        <Center
          w={"40px"}
          h={"40px"}
          onClick={() => {
            props.onClose();
          }}
        >
          <Icon as={RxCross2} fontSize={"24px"} />
        </Center>
      </Center>
      <Flex flexDir={"column"} paddingTop={"40px"}>
        <Flex w={"100%"} h={"60px"} gap={"10px"} padding={"20px 80px"}>
          <Flex alignItems={"center"}>
            <Avatar w={"60px"} h={"60px"} src={userSelector.img_url}></Avatar>
          </Flex>
          <Flex flexDir={"column"} justifyContent={"center"}>
            <Flex fontSize={"14px"} fontWeight={"600"} alignItems={"center"}>
              {userSelector.username}
            </Flex>
            <Flex
              fontWeight={"500"}
              color={"#2398f6"}
              _hover={{ color: "black" }}
              onClick={() => inputFileRef.current.click()}
              onChange={handleFile}
            >
              Change profile photo
            </Flex>
            <Input
              accept="image/png,image/jpeg"
              type="file"
              ref={inputFileRef}
              onChange={handleFile}
              display={"none"}
            />
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          h={"60px"}
          padding={"20px 80px"}
          gap={"15px"}
          alignItems={"center"}
        >
          <Flex fontWeight={"500"} maxW={"100px"} w={"100%"}>
            Full Name
          </Flex>
          <Input
            maxW={"300px"}
            w={"100%"}
            id="fullname"
            onChange={inputHandler}
          ></Input>
        </Flex>
        <Flex
          w={"100%"}
          h={"60px"}
          padding={"20px 80px"}
          gap={"15px"}
          alignItems={"center"}
        >
          <Flex fontWeight={"500"} maxW={"100px"} w={"100%"}>
            Username
          </Flex>
          <Input
            maxW={"300px"}
            w={"100%"}
            id="username"
            onChange={inputHandler}
          ></Input>
        </Flex>
        <Flex
          w={"100%"}
          h={"100px"}
          padding={"20px 80px"}
          gap={"15px"}
          alignItems={"center"}
        >
          <Flex fontWeight={"500"} maxW={"100px"} w={"100%"}>
            Bio
          </Flex>
          <Textarea
            maxW={"300px"}
            w={"100%"}
            id="biodata"
            onChange={inputHandler}
          ></Textarea>
        </Flex>
        <Flex
          w={"100%"}
          h={"60px"}
          padding={"20px 80px"}
          gap={"15px"}
          alignItems={"center"}
        >
          <Flex fontWeight={"500"} maxW={"200px"} w={"100%"} color={"red"}>
            Email cannot be change.
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          h={"60px"}
          padding={"20px 80px"}
          gap={"15px"}
          alignItems={"center"}
          justifyContent={"right"}
        >
          <Button
            fontWeight={"500"}
            bg={"#2398f6"}
            color={"white"}
            maxW={"100px"}
            w={"100%"}
            onClick={update}
          >
            Confirm
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
