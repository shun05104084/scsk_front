import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack, Text, Icon, Flex, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { motion, transform } from "framer-motion";

const Output = () => {
  const location = useLocation(); // 前の画面から渡された状態を取得
  const navigate = useNavigate(); // 戻るボタン用

  // location.state から渡されたデータを展開
  const { remoteWork, industry, salary, newYearHoliday, communication, office, teamwork, PC, known, transfer, income, home, flex, overtime, weekend, longvacation, workingplace } = location.state || {};

  // リモートワークのメッセージとスタイル設定
  const remoteWorkMessage = remoteWork === "はい"
    ? { message: "リモートワークを積極的に利用したいです", icon: CheckCircleIcon, color: "green.500" }
    : { message: "リモートワークを積極的に利用したくないです", icon: WarningIcon, color: "red.500" };

  // 年末年始休暇に関するメッセージ
  const newYearHolidayMessage = newYearHoliday === "はい"
    ? "年末年始休暇制度のある企業を希望します"
    : null; // 「いいえ」の場合は何も出力しない

  // コミュニケーションの得意不得意のメッセージとスタイル設定
  const communicationMessage = communication === "はい"
    ? { message: "他人とコミュニケーションを取るのは得意です", icon: CheckCircleIcon, color: "green.500" }
    : { message: "他人とコミュニケーションを取るのは苦手です", icon: WarningIcon, color: "red.500" };
  
  // オフィス
  const officeMessage = office === "はい"
    ? { message: "同じオフィスで毎日働くことに抵抗はあります", icon: CheckCircleIcon, color: "green.500" }
    : { message: "同じオフィスで毎日働くことに抵抗はないです", icon: WarningIcon, color: "red.500" };

  // チームワーク
  const teamworkMessage = teamwork === "はい"
    ? { message: "チームワークは得意です", icon: CheckCircleIcon, color: "green.500" }
    : { message: "チームワークは苦手です", icon: WarningIcon, color: "red.500" };

  // PC
  const PCMessage = PC === "はい"
    ? { message: "PCを使った作業は得意です", icon: CheckCircleIcon, color: "green.500" }
    : { message: "PCを使った作業は苦手です", icon: WarningIcon, color: "red.500" };

  // 実家か一人暮らし
  const homeMessage = home === "実家暮らし"
    ? { message: "就職後は実家暮らしを想定しています。", icon: CheckCircleIcon, color: "green.500" }
    : { message: "就職後は一人暮らしを想定しています。", icon: WarningIcon, color: "red.500" };

  // 知名度のある企業メッセージ
  const knownMessage = known === "はい"
    ? "知名度の高い企業で働きたいです"
    : known === "いいえ"
    ? "知名度の高い企業で働きたくないです"
    : null; // 「どちらでもいい」の場合は何も出力しない

  // 転勤
  const transferMessage = transfer === "はい"
    ? { message: "将来、転職を考えています", icon: CheckCircleIcon, color: "green.500" }
    : { message: "将来、転職を考えていません", icon: WarningIcon, color: "red.500" };

 // フレックス制度に関するメッセージ
  const flexMessage = flex === "はい"
    ? "フレックスタイム制度がある会社を希望します"
    : null; // 「いいえ」の場合は何も出力しない

 // 土日に関するメッセージ
  const weekendMessage = weekend === "はい"
    ? "完全週休二日制の企業を希望します"
    : null; // 「いいえ」の場合は何も出力しない

 // 長期休暇制度に関するメッセージ
  const longvacationMessage = longvacation === "はい"
    ? "長期休暇制度のある企業を希望します"
    : null; // 「いいえ」の場合は何も出力しない

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
                  {salary ? `${salary}程度` : "選択されていません"}
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

            {/* コミュニケーションに関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={communicationMessage.color}>
              <Icon as={communicationMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {communicationMessage.message}
              </Text>
            </Flex>

            {/* オフィスに関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={officeMessage.color}>
              <Icon as={officeMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {officeMessage.message}
              </Text>
            </Flex>

            {/* チームワークに関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={teamworkMessage.color}>
              <Icon as={teamworkMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {teamworkMessage.message}
              </Text>
            </Flex>

            {/* PCに関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={PCMessage.color}>
              <Icon as={PCMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {PCMessage.message}
              </Text>
            </Flex>

            {/* 知名度の高い企業に関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={knownMessage.color}>
              <Icon as={knownMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {knownMessage.message}
              </Text>
            </Flex>

            {/* 転勤に関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={transferMessage.color}>
              <Icon as={transferMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {transferMessage.message}
              </Text>
            </Flex>

            {/* 希望の平均年収の結果表示 */}
            <Box w="full" textAlign="center">
              <Text fontSize="lg" color="gray.700">
                希望の平均年収は{" "}
                <Text as="span" fontWeight="bold" color="teal.600">
                  {income ? `${income}程度` : "選択されていません"}
                </Text>{" "}
                です。
              </Text>
            </Box>

            {/* 実家か一人暮らしに関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={homeMessage.color}>
              <Icon as={homeMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {homeMessage.message}
              </Text>
            </Flex>

            {/* フレックス制度に関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={flexMessage.color}>
              <Icon as={flexMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {flexMessage.message}
              </Text>
            </Flex>

            {/* 希望の残業時間の結果表示 */}
            <Box w="full" textAlign="center">
              <Text fontSize="lg" color="gray.700">
              月平均の残業時間は{" "}
                <Text as="span" fontWeight="bold" color="teal.600">
                  {overtime ? `${overtime}時間以内を希望します。` : "選択されていません"}
                </Text>{" "}
                です。
              </Text>
            </Box>

            {/* 土日休暇に関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={weekendMessage.color}>
              <Icon as={weekendMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {weekendMessage.message}
              </Text>
            </Flex>

            {/* 長期休暇に関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={longvacationMessage.color}>
              <Icon as={longvacationMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {longvacationMessage.message}
              </Text>
            </Flex>

            {/* 希望の勤務地の結果表示 */}
            <Box w="full" textAlign="center">
              <Text fontSize="lg" color="gray.700">
                希望の勤務地は{" "}
                <Text as="span" fontWeight="bold" color="teal.600">
                  {workingplace || "選択されていません"}
                  です
                </Text>{" "}
                です。
              </Text>
            </Box>

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
          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Output;

