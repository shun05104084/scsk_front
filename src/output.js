import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack, Text, Icon, Flex, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";


const Output = () => {
  const location = useLocation(); // 前の画面から渡された状態を取得
  const navigate = useNavigate(); // 戻るボタン用

  // location.state から渡されたデータを展開
  const { remoteWork, industry, salary, newYearHoliday } = location.state || {};
  
  // 解答送信用
  // 12行目といい感じにマージしたい
  const answers = location.state || {};

  // リモートワークのメッセージとスタイル設定
  const remoteWorkMessage = remoteWork === "はい"
    ? { message: "リモートワークを積極的に利用したいです", icon: CheckCircleIcon, color: "green.500" }
    : { message: "リモートワークを積極的に利用したくないです", icon: WarningIcon, color: "red.500" };

  // 年末年始休暇に関するメッセージ
  const newYearHolidayMessage = newYearHoliday === "はい"
    ? "年末年始休暇制度のある企業を希望します"
    : null; // 「いいえ」の場合は何も出力しない

  const handleFilterng = () => {
    // alert("フィルタリング画面に遷移します。");
      navigate("/filtering", { state: answers});
  };
    
      
  // ページ遷移後の表示を作成
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" py={12} px={6} bgGradient="linear(to-r, teal.500, green.500)">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          p={8}
          maxW="lg"
          borderRadius="lg"
          boxShadow="2xl"
          w="full"
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <VStack spacing={6} align="center">
            <Heading as="h1" size="xl" textAlign="center" color="teal.600">
              回答結果
            </Heading>

            <Divider />

            {/* リモートワークに関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={remoteWorkMessage.color}>
              <Icon as={remoteWorkMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {remoteWorkMessage.message}
              </Text>
            </Flex>

            <Divider />

            {/* 興味のある業界の結果表示 */}
            <Box w="full" textAlign="center">
              <Text fontSize="lg" color="gray.700">
                興味ある業界は{" "}
                <Text as="span" fontWeight="bold" color="teal.600">
                  {industry || "選択されていません"}
                </Text>{" "}
                です。
              </Text>
            </Box>

            <Divider />

            {/* 希望の初任給の結果表示 */}
            <Box w="full" textAlign="center">
              <Text fontSize="lg" color="gray.700">
                希望の初任給は{" "}
                <Text as="span" fontWeight="bold" color="teal.600">
                  {salary ? `${salary}万円程度` : "選択されていません"}
                </Text>{" "}
                です。
              </Text>
            </Box>

            <Divider />

            {/* 年末年始休暇に関する結果表示 */}
            {newYearHolidayMessage && (
              <Box w="full" textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="blue.600">
                  {newYearHolidayMessage}
                </Text>
              </Box>
            )}

            <Divider />

            {/* 戻るボタン */}
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => navigate("/")}
              mt={6}
              _hover={{ bg: "teal.400", transform: "scale(1.05)" }}
              transition="all 0.3s ease"
            >
              戻る
            </Button>

            {/* 企業推薦ボタン */}
            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleFilterng}
              mt={6}
              _hover={{ bg: "teal.400", transform: "scale(1.05)" }}
              transition="all 0.3s ease"
            >
              おすすめ企業

            </Button>
          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Output;
