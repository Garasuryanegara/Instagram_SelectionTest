import {
  Avatar,
  Box,
  Center,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  border,
} from "@chakra-ui/react";
import { SlOptions, SlPaperPlane } from "react-icons/sl";
import { TbMessageCircle2 } from "react-icons/tb";
import { BsBookmark } from "react-icons/bs";
import { FcLikePlaceholder } from "react-icons/fc";
import { HiOutlineEmojiHappy } from "react-icons/hi";

export default function PostDetail() {
  const comment = [
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
    { comment: "adwadawdawdad" },
  ];
  return (
    <>
      <Flex w={"100%"} h={"100%"}>
        <Center w={"65%"} h={"100%"} bg={"red"}>
          TESTINGGGG
        </Center>
        <Flex w={"35%"} h={"100%"} flexDir={"column"} alignItems={"center"}>
          <Flex
            w={"100%"}
            h={"60px"}
            justifyContent={"space-between"}
            padding={"10px"}
            borderBottom={"1px solid lightgrey"}
          >
            <Flex gap={"10px"} h={"40px"} alignItems={"center"}>
              <Avatar w={"32px"} h={"32px"}></Avatar>
              <Flex
                fontSize={"14px"}
                alignItems={"left"}
                // bg={"red"}
                flexDir={"column"}
              >
                <Flex fontWeight={"600"}>garasuryanegara</Flex>
                <Flex
                  fontSize={"12px"}
                  paddingLeft={"5px"}
                  //   display={val.location ? "box" : "none"}
                >
                  bandung
                </Flex>
              </Flex>
            </Flex>
            <Center w={"40px"} h={"40px"}>
              <Icon as={SlOptions} w={"16px"} h={"16px"} />
            </Center>
          </Flex>
          <Flex
            w={"100%"}
            h={"500px"}
            padding={"16px"}
            flexDir={"column"}
            rowGap={"16px"}
            overflowY={"scroll"}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Flex w={"100%"} gap={"16px"}>
              <Avatar w={"32px"} h={"32px"}></Avatar>
              <Flex
                fontSize={"14px"}
                alignItems={"left"}
                flexDir={"column"}
                w={"100%"}
              >
                <Flex fontWeight={"600"}>garasuryanegara</Flex>
                <Flex
                  fontSize={"12px"}
                  //   display={val.location ? "box" : "none"}
                >
                  Hello Guys ini adalah foto blalblalbalbalbla
                </Flex>
              </Flex>
            </Flex>
            {comment.map((val) => {
              return (
                <>
                  <Flex w={"100%"} gap={"16px"}>
                    <Avatar w={"32px"} h={"32px"}></Avatar>
                    <Flex
                      fontSize={"14px"}
                      alignItems={"left"}
                      flexDir={"column"}
                      w={"100%"}
                    >
                      <Flex fontWeight={"600"}>garasuryanegara</Flex>
                      <Flex
                        fontSize={"12px"}
                        //   display={val.location ? "box" : "none"}
                      >
                        {val.comment}
                      </Flex>
                    </Flex>
                  </Flex>
                </>
              );
            })}
          </Flex>
          <Flex
            w={"100%"}
            h={"55px"}
            justifyContent={"space-between"}
            padding={"0px 16px"}
          >
            <Center>
              <Center w={"40px"} h={"40px"}>
                <Icon as={FcLikePlaceholder} w={"30px"} h={"30px"} />
              </Center>
              <Center w={"40px"} h={"40px"}>
                <Icon
                  as={TbMessageCircle2}
                  transform="scaleX(-1)"
                  w={"24px"}
                  h={"24px"}
                />
              </Center>
              <Center w={"40px"} h={"40px"}>
                <Icon as={SlPaperPlane} w={"24px"} h={"24px"} />
              </Center>
            </Center>
            <Center>
              <Center w={"40px"} h={"40px"}>
                <Icon as={BsBookmark} w={"24px"} h={"24px"} />
              </Center>
            </Center>
          </Flex>
          <Flex w={"90%"} h={"18px"} fontSize={"14px"} fontWeight={"500"}>
            147 likes
          </Flex>
          <Flex w={"90%"} h={"18px"} fontSize={"10px"}>
            1 HOUR AGO
          </Flex>
          <Flex
            w={"100%"}
            h={"52px"}
            borderTop={"1px solid lightgrey"}
            padding={"8px 16px"}
          >
            <Flex w={"56px"} justifyContent={"center"}>
              <Center>
                <Icon as={HiOutlineEmojiHappy} fontSize={"24px"} />
              </Center>
            </Flex>
            <input
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                outline: "none",
              }}
              placeholder="Add a comment..."
            ></input>
            <Flex
              h={"100%"}
              fontWeight={"500"}
              color={"#38acf7"}
              alignItems={"center"}
            >
              Post
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
