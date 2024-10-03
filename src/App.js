// App.js
import React, { useState } from "react";
import {Box,Button,Heading,Radio,RadioGroup,Stack,VStack,Text,Select,Progress,useToast,Icon,} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Routes, Route, useNavigate } from "react-router-dom";
import Output from "./output";
import Filtering from "./filtering";
const App = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [answers, setAnswers] = useState({
    remoteWork: "",
    industry: "IT",
    salary: "500万",
    place: "東京",

    // remoteWork: "",
    // industry: "",
    // salary: "",
    // newYearHoliday: "",
  });
  answers.remoteWork = "あり";
  console.log("Answer: ", answers.remoteWork);

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
              <Filtering answers={setAnswers} /> {/* 値受け渡し*/}
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
                  (step === 4 && answers.newYearHoliday === "")
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
                  !answers.newYearHoliday
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

export default AppWrapper;
