import {React,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack, Text, Icon, Flex, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { motion, transform } from "framer-motion";

const Output = () => {
  const location = useLocation(); // 前の画面から渡された状態を取得
  const navigate = useNavigate(); // 戻るボタン用
  const initialAnswers = location.state || {};

  const [answers, setAnswers] = useState(initialAnswers);
  const [userInput, setUserInput] = useState('');
  const [responseOutput, setResponseOutput] = useState('');
  const handleFilterng = () => {
    // alert("フィルタリング画面に遷移します。");
      navigate("/filtering", { state: answers});
  };
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const callChatGPT = async (prompt) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",  // Use the GPT model you want
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
          ],
          max_tokens: 150,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.choices[0]?.message.content || 'No response from ChatGPT';
    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
      throw new Error('Failed to fetch ChatGPT response');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // フォームのデフォルト送信動作を防止
    setResponseOutput('応答を待っています...'); // 応答待ちのメッセージ

    const personalityPrompt = `
      ${answers.syahuu}
      以下の性格特性のうち、2つを選んでください：
      外向型・自問型
      論理重視・想い重視
      共感型・主観型
      協調型・競争型
      冷静型・情熱型
      楽観型・慎重型
      自己評価・他己評価
      理念重視・ビジネス重視
      過程重視・結果重視
      専門追求型・組織貢献型
      着実志向・挑戦志向
      仕事重視・プライベート重視
      給与重視・仕事内容重視
      私仕混同・私仕分離
      解答は各単語のみでお願いします。`;

    try {
      const response = await callChatGPT(personalityPrompt); // ChatGPTからの応答
      setResponseOutput(response); // 応答を表示
      setAnswers(prev => ({ ...prev, syahuu: response })); // answers.syahuuを更新
    } catch (error) {
      console.error('Error:', error);
      setResponseOutput('エラーが発生しました。'); // エラーメッセージを設定
    }
  };
  // location.state から渡されたデータを展開
  const { outdoor, indoor, step, remoteWork, industry, salary, newYearHoliday, communication, office, teamwork, PC, known, transfer, income, home, flex, overtime, weekend, longvacation, workingplace, English, team, leadership, bodymoving, bunki1 } = location.state || {};

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
    : ""; // 「いいえ」の場合は何も出力しない

 // 長期休暇制度に関するメッセージ
  const longvacationMessage = longvacation === "はい"
    ? "長期休暇制度のある企業を希望します"
    : ""; // 「いいえ」の場合は何も出力しない

  // 英語
  const EnglishMessage = English === "はい"
    ? { message: "積極的に英語を使いたい", icon: CheckCircleIcon, color: "green.500" }
    : { message: "積極的に英語を使いたくない", icon: WarningIcon, color: "red.500" };

  // チーム
  const teamMessage = team === "はい"
    ? { message: "チームで働くことは好きである", icon: CheckCircleIcon, color: "green.500" }
    : { message: "チームで働くことは好きではない", icon: WarningIcon, color: "red.500" };

  // リーダーシップ
  const leadershipMessage = leadership === "はい"
    ? { message: "リーダーとして活躍したい", icon: CheckCircleIcon, color: "green.500" }
    : { message: "リーダーとして活躍したくない", icon: WarningIcon, color: "red.500" };

  // 肉体労働(ここで分岐)
  const bodymovingMessage = bodymoving === "はい"
    ? { message: "体を動かす仕事をしたい", icon: CheckCircleIcon, color: "green.500" }
    : { message: "体を動かす仕事をしたくない", icon: WarningIcon, color: "red.500" };

let bunki1Message = { message: "該当するメッセージがありません", icon: WarningIcon, color: "gray.500" };  // デフォルト値を設定
  // アウトドア分岐
  if(outdoor ===1){
    bunki1Message = bunki1 === "はい"
    ? { message: "屋外での作業を積極的にしてみたい", icon: CheckCircleIcon, color: "green.500" }
    : { message: "屋外での作業はしたくない", icon: WarningIcon, color: "red.500" };
  }else if(indoor === 1){
    bunki1Message = bunki1 === "はい"
    ? { message: "クリエイティブな分野でアイデアを形にする仕事をしてみたい", icon: CheckCircleIcon, color: "green.500" }
    : { message: "デザインやコンテンツ制作などのクリエイティブな仕事にはあまり興味がない", icon: WarningIcon, color: "red.500" };
  }
  //console.log("outdoor:", outdoor);
  //console.log("indoor:", indoor);
  //console.log("bunki1:", bunki1);
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
            <div>
            {/* knownMessage が空でない場合のみ表示 */}
              {knownMessage && <span>{knownMessage}</span>}
            </div>

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
            <div>
            {/* weekendMessage が空でない場合のみ表示 */}
              {flexMessage && <span>{flexMessage}</span>}
            </div>

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
            <div>
            {/* weekendMessage が空でない場合のみ表示 */}
              {weekendMessage && <span>{weekendMessage}</span>}
            </div>

            {/* 長期休暇に関する結果表示 */}
            <div>
            {/* longvacationMessage が空でない場合のみ表示 */}
              {longvacationMessage && <span>{longvacationMessage}</span>}
            </div>

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

            {/* 英語に関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={EnglishMessage.color}>
              <Icon as={EnglishMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {EnglishMessage.message}
              </Text>
            </Flex>

            {/* チーム活動に関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={teamMessage.color}>
              <Icon as={teamMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {teamMessage.message}
              </Text>
            </Flex>

            {/* リーダーシップに関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={leadershipMessage.color}>
              <Icon as={leadershipMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {leadershipMessage.message}
              </Text>
            </Flex>

            {/* 肉体労働に関する結果表示(ここで分岐) */}
            <Flex alignItems="center" justifyContent="center" color={bodymovingMessage.color}>
              <Icon as={bodymovingMessage.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {bodymovingMessage.message}
              </Text>
            </Flex>

            {/* 分岐質問1に関する結果表示 */}
            <Flex alignItems="center" justifyContent="center" color={bunki1Message.color}>
              <Icon as={bunki1Message.icon} w={8} h={8} mr={2} />
              <Text fontSize="lg" fontWeight="bold">
                {bunki1Message.message}
              </Text>
            </Flex>

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
            {/* 企業推薦に遷移 */}
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
            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleSubmit}
              mt={6}
              _hover={{ bg: "teal.400", transform: "scale(1.05)" }}
              transition="all 0.3s ease"
            >
              ChatGPTへ送信
            </Button>
          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Output;

