// App.js
import React, { useState } from "react";
import {Box,Button,Heading,Radio,RadioGroup,Stack,VStack,Text,Select,Progress,useToast,Icon,} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Routes, Route, useNavigate } from "react-router-dom";
import Output from "./output";
import Filtering from "./filtering";
import Outdoor from "./outdoor";
import Indoor from "./indoor";
const App = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const totalSteps = 22; 

  const [outdoor, setOutdoor] = useState(0);  // outdoor フラグ
  const [indoor, setIndoor] = useState(0);    // indoor フラグ
  const bunki_question = 8; //分岐間での質問の数

  const [answers, setAnswers] = useState({
    remoteWork: "",
    industry: "",
    salary: "",
    newYearHoliday: "",
    comunication: "",
    office: "",
    teamwork: "",
    PC: "",
    known: "",
    transfer: "",
    income: "",
    home: "",
    flex: "",
    overtime: "",
    weekend: "",
    longvacation: "",
    workingplace: "",
    English: "",
    team: "",
    leadership: "",
    bodymoving: "",   //ここまでが分岐前
    //outdoorworking: "", //アウトドアの分岐始まり
    //creative: "",        // インドアの分岐始まり
    bunki1: ""          //分岐質問1


  });

  const handleChange = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.values(answers).some((value) => value === "")) {
      toast({
        title: "全ての質問に回答してください。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    navigate("/output", { state: answers });
  };

  const handleFilterng = () => {
alert("フィルタリング画面に遷移します。");
    
    navigate("/filtering");
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, teal.300, blue.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={12}
      px={6}
    >
      <Box
        bg="white"
        p={8}
        maxW="lg"
        borderRadius="lg"
        boxShadow="2xl"
        w="full"
      >
        <VStack spacing={6} align="stretch">
          <VStack spacing={2} align="center">
            <Icon as={CheckCircleIcon} w={10} h={10} color="teal.500" />
            <Heading as="h1" size="lg" color="teal.500">
              就職アンケート
              <Button
                onClick={handleFilterng}
                colorScheme="teal"

                leftIcon={<CheckCircleIcon />}
              >
                フィルターページ
              </Button>
            </Heading>
            <Progress
              value={(step / totalSteps) * 100}
              size="sm"
              colorScheme="teal"
              w="full"
              borderRadius="md"
            />
            <Text fontSize="sm" color="gray.600">
              ステップ {step} / {totalSteps}
            </Text>
          </VStack>

          {/* 質問コンテンツ */}
          {step === 1 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
                リモートワーク制度があれば積極的に利用したいですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("remoteWork", value)}
                value={answers.remoteWork}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="あり" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="なし" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 2 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
                興味のある業界はありますか？
              </Text>
              <Select
                placeholder="業界を選択してください"
                value={answers.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                size="lg"
                bg="gray.50"
              >
                <option value="IT業界">IT業界</option>
                <option value="金融業界">金融業界</option>
                <option value="医療業界">医療業界</option>
                <option value="教育業界">教育業界</option>
                <option value="その他">その他</option>
              </Select>
            </Box>
          )}

          {step === 3 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
                希望の初任給はいくらですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("salary", value)}
                value={answers.salary}
              >
                <Stack direction="column" spacing={4}>
                  <Radio value="15万円未満" colorScheme="teal">
                    15万円未満
                  </Radio>
                  <Radio value="15～20万円" colorScheme="teal">
                    15～20万円
                  </Radio>
                  <Radio value="20～25万円" colorScheme="teal">
                    20～25万円
                  </Radio>
                  <Radio value="25～30万円" colorScheme="teal">
                    25～30万円
                  </Radio>
                  <Radio value="30万円以上" colorScheme="teal">
                    30万円以上
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 4 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
                年末年始は必ず休みたいですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("newYearHoliday", value)}
                value={answers.newYearHoliday}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 5 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              人とのコミュニケーションは得意ですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("comunication", value)}
                value={answers.comunication}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 6 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              同じオフィスで毎日働くことに抵抗はありますか？？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("office", value)}
                value={answers.office}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 7 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              チームワークは得意ですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("teamwork", value)}
                value={answers.teamwork}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 8 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              PCを使った作業は得意ですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("PC", value)}
                value={answers.PC}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 9 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              知名度の高い企業で働きたいですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("known", value)}
                value={answers.known}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                  <Radio value="どちらでもいい" colorScheme="teal">
                  どちらでもいい
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 10 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              将来転職を考えていますか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("transfer", value)}
                value={answers.transfer}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 11 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              希望の平均年収はいくらですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("income", value)}
                value={answers.income}
              >
                <Stack direction="column" spacing={4}>
                  <Radio value="500万円未満" colorScheme="teal">
                    500万円未満
                  </Radio>
                  <Radio value="500～600万円" colorScheme="teal">
                    500～600万円
                  </Radio>
                  <Radio value="600～700万円" colorScheme="teal">
                  600～700万円
                  </Radio>
                  <Radio value="700～800万円" colorScheme="teal">
                  700～800万円
                  </Radio>
                  <Radio value="800万円以上" colorScheme="teal">
                  800万円以上
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 12 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              就職後は実家と一人暮らし、どちらを想定していますか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("home", value)}
                value={answers.home}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="実家" colorScheme="teal">
                    実家
                  </Radio>
                  <Radio value="一人暮らし" colorScheme="teal">
                    一人暮らし
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 13 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              フレックスタイム制度を積極的に利用したいですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("flex", value)}
                value={answers.flex}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 14 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              9時に出社したとして、遅くとも何時までには退勤したいですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("overtime", value)}
                value={answers.overtime}
              >
                <Stack direction="column" spacing={4}>
                  <Radio value="17時(定時)" colorScheme="teal">
                  17時(定時)
                  </Radio>
                  <Radio value="17時～18時" colorScheme="teal">
                  17時～18時
                  </Radio>
                  <Radio value="18時～19時" colorScheme="teal">
                  18時～19時
                  </Radio>
                  <Radio value="19時～20時" colorScheme="teal">
                  19時～20時
                  </Radio>
                  <Radio value="20時以降" colorScheme="teal">
                  20時以降
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 15 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              土日は必ず休みたいですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("weekend", value)}
                value={answers.weekend}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 16 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              長期休暇(7日以上)は必ず欲しいですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("longvacation", value)}
                value={answers.longvacation}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 17 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              希望の勤務地はありますか？
              </Text>
              <Select
                placeholder="希望の勤務地を選択してください"
                value={answers.workingplace}
                onChange={(e) => handleChange("workingplace", e.target.value)}
                size="lg"
                bg="gray.50"
              >
                <option value="北海道">北海道</option>
                <option value="東京">東京</option>
                <option value="大阪">大阪</option>
                <option value="海外">海外</option>
                <option value="どこでもよい">どこでもよい</option>
              </Select>
            </Box>
          )}

          {step === 18 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              英語などの外国語を積極的に使う仕事に興味はありますか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("English", value)}
                value={answers.English}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 19 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              チームで働くことが好きですか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("team", value)}
                value={answers.team}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 20 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              リーダーシップを発揮するポジションに興味はありますか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("leadership", value)}
                value={answers.leadership}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 21 && (
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              体を動かす事が多い仕事をしたいですか？
              </Text>
              <RadioGroup
                onChange={(value) => {
                  handleChange("bodymoving", value);
                  // 「はい」か「いいえ」によって次の質問を表示
                  if (value === "はい") {
                    setOutdoor(1);  // 「屋外での作業が多い仕事に興味はありますか？」へ
                    setIndoor(0);    // クリエイティブな仕事の質問を非表示に
                    <Output outdoor={outdoor} indoor={indoor} />    //outputファイルに変数を渡す
                  } else if (value === "いいえ") {
                    setOutdoor(0);  // 屋外作業の質問を非表示に
                    setIndoor(1);   // 「クリエイティブな仕事に興味はありますか？」へ
                    <Output outdoor={outdoor} indoor={indoor} />    //outputファイルに変数を渡す
                  }
                }}
                value={answers.bodymoving}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 22 && outdoor === 1 && (   //分岐先その1
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              屋外での作業が多い仕事に興味はありますか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("bunki1", value)}
                value={answers.bunki1}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {step === 22 && indoor === 1 && (   //分岐先その2
            <Box>
              <Text fontSize="lg" mb={4} fontWeight="bold" color="teal.600">
              クリエイティブな仕事（デザインやコンテンツ制作など）に興味はありますか？
              </Text>
              <RadioGroup
                onChange={(value) => handleChange("bunki1", value)}
                value={answers.bunki1}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="はい" colorScheme="teal">
                    はい
                  </Radio>
                  <Radio value="いいえ" colorScheme="teal">
                    いいえ
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}

          {/* ナビゲーションボタン */}
          <Stack direction="row" spacing={4} justify="space-between">
            {step > 1 && (
              <Button
                onClick={handlePrev}
                colorScheme="gray"
                variant="outline"
              >
                戻る
              </Button>
            )}
            {step < totalSteps && (
              <Button
                onClick={handleNext}
                colorScheme="teal"
                disabled={
                  (step === 1 && answers.remoteWork === "") ||
                  (step === 2 && answers.industry === "") ||
                  (step === 3 && answers.salary === "") ||
                  (step === 4 && answers.newYearHoliday === "")||
                  (step === 5 && answers.comunication === "") ||
                  (step === 6 && answers.office === "") ||
                  (step === 7 && answers.teamwork === "") ||
                  (step === 8 && answers.PC === "")||
                  (step === 9 && answers.known === "") ||
                  (step === 10 && answers.transfer === "") ||
                  (step === 11 && answers.income === "") ||
                  (step === 12 && answers.home === "")||
                  (step === 13 && answers.flex === "") ||
                  (step === 14 && answers.overtime === "") ||
                  (step === 15 && answers.weekend === "") ||
                  (step === 16 && answers.longvacation === "")||
                  (step === 17 && answers.workingplace === "")||
                  (step === 18 && answers.English === "") ||
                  (step === 19 && answers.team === "") ||
                  (step === 20 && answers.leadership === "")||
                  (step === 21 && answers.bodymoving === "")||
                  (step === 22 && answers.bunki1 === "")

                }
              >
                次へ
              </Button>
            )}
            {step === totalSteps && (
              <Button
                onClick={handleSubmit}
                colorScheme="teal"
                disabled={
                  !answers.remoteWork ||
                  !answers.industry ||
                  !answers.salary ||
                  !answers.newYearHoliday ||
                  !answers.comunication ||
                  !answers.office ||
                  !answers.teamwork ||
                  !answers.PC ||
                  !answers.known ||
                  !answers.transfer ||
                  !answers.income ||
                  !answers.home ||
                  !answers.flex ||
                  !answers.overtime ||
                  !answers.weekend ||
                  !answers.longvacation ||
                  !answers.workingplace ||
                  !answers.English ||
                  !answers.team ||
                  !answers.leadership ||
                  !answers.bodymoving ||
                  !answers.bunki1

                }
                leftIcon={<CheckCircleIcon />}
              >
                完了
              </Button>
            )}
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
};

// ルーティング設定
const AppWrapper = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/output" element={<Output />} />
    <Route path="/filtering" element={<Filtering />} />

    
  </Routes>
);
// <Route path="/Outdoor" element={<Outdoor />} />
// <Route path="/Indoor" element={<Indoor />} />
export default AppWrapper;
