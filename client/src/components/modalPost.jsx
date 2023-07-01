import {
  Flex,
  Icon,
  Image,
  Input,
  Textarea,
  Center,
  Select,
  Button,
  Avatar,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import { MdArrowBack, MdOutlineLocationOn } from "react-icons/md";
import { TbPhotoSearch } from "react-icons/tb";
import { useFormik } from "formik";
import { api } from "../api/api";
import { useSelector } from "react-redux";

export default function ModalPost(props) {
  const userSelector = useSelector((state) => state.auth);
  // function fetch postingan di profile
  const [postings, setPostings] = useState([]);
  const fetchPost = async () => {
    await api
      .get("/post/v2", { params: { user_id: userSelector.id } })
      .then((res) => {
        console.log(res.data);
        setPostings(res.data);
      });
  };
  //menyimpan file gambar yang dipilih
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const [user, setUser] = useState({
    caption: "",
    location: "",
    user_id: userSelector.id,
  });
  const inputFileRef = useRef(null);
  const handleFile = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    // console.log();

    //buat ngemunculin gambar----------
    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
    //--------------------------------
  };
  const inputHandler = async (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };
  const postImage = async () => {
    const formData = new FormData();
    formData.append("postImg", selectedFile);
    formData.append("caption", user.caption);
    formData.append("location", user.location);
    formData.append("user_id", user.user_id);

    const result = await api
      .post("/post/image", formData)
      .then((result) => result);
    console.log(result);
    alert("Posting success");
    return props.onClose();
  };
  useEffect(() => {
    fetchPost();
  }, [postImage()]);

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
      >
        <Center
          w={"40px"}
          h={"40px"}
          onClick={() => {
            props.onClose();
          }}
        >
          <Icon as={MdArrowBack} fontSize={"24px"} />
        </Center>
        Create new post
        <Center w={"40px"} h={"40px"}></Center>
      </Center>
      <Flex w={"100%"} h={"100%"}>
        <Center
          w={"70%"}
          h={"100%"}
          flexDir={"column"}
          rowGap={"30px"}
          borderRight={"1px solid lightgrey"}
        >
          {selectedFile ? (
            <Image src={imgUrl} w={"100%"} h={"450px"} objectFit={"contain"} />
          ) : (
            <>
              <Icon as={TbPhotoSearch} fontSize={"100px"} />
              <Button
                bg={"#0095f6"}
                color={"white"}
                onClick={() => inputFileRef.current.click()}
                onChange={handleFile}
              >
                Select from computer
              </Button>
              <Input
                accept="image/png,image/jpeg"
                type="file"
                ref={inputFileRef}
                onChange={handleFile}
                display={"none"}
              />
            </>
          )}
        </Center>
        <Flex w={"30%"} h={"100%"} flexDir={"column"}>
          <Flex w={"100%"} h={"60px"} gap={"10px"} padding={"0px 10px"}>
            <Flex alignItems={"center"}>
              <Avatar w={"32px"} h={"32px"} src={userSelector.img_url}></Avatar>
            </Flex>
            <Flex fontSize={"14px"} fontWeight={"600"} alignItems={"center"}>
              {userSelector.username}
            </Flex>
          </Flex>
          <Textarea
            w={"100%"}
            h={"200px"}
            border={"none"}
            placeholder="Write a caption..."
            id="caption"
            onChange={inputHandler}
          ></Textarea>
          <InputGroup
            borderTop={"1px solid lightgrey"}
            borderBottom={"1px solid lightgrey"}
          >
            <Input
              w={"100%"}
              h={"45px"}
              placeholder="Add location"
              border={"none"}
              padding={"0px 10px"}
              id="location"
              onChange={inputHandler}
            ></Input>
            <InputRightElement h={"100%"}>
              <Icon as={MdOutlineLocationOn} fontSize={"16px"} />
            </InputRightElement>
          </InputGroup>
          <Flex padding={"90px 20px 20px 20px"} justifyContent={"flex-end"}>
            <Button color={"white"} bg={"#0095f6"} onClick={postImage}>
              Post
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
