import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Input, VStack, Text, Icon, Flex, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import Output from "./output";

const Filtering = () => {
  // 前の画面から渡された状態を取得
  const location = useLocation();
  // 前の画面の情報を代入する 
  const answers = location.state || {};
  const navigate = useNavigate(); // 戻るボタン用


  const [csvData, setCsvData] = useState('');
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [responseOutput, setResponseOutput] = useState('');
  useEffect(() => {
    // CSVファイルを読み込む
    const fetchData = async () => {
      const response = await fetch("/companies.csv"); // public/A.csvを読み込み
      const reader = response.body.getReader();
      const result = await reader.read(); // rawデータを取得
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value); // CSVデータを文字列に変換

      // PapaParseでCSVをパース
      Papa.parse(csvData, {
        header: true, // 1行目をヘッダーとして使用
        complete: (results) => {
          setData(results.data); // CSVデータをステートに格納
          console.log(results.data);
        },
      });
    };
    fetchData();
  }, []);

    // useEffect(() => {
    //   // CSVファイルをfetchで取得
    //   fetch('/companies.csv')
    //     .then(response => response.text())
    //     .then(data => {
    //       setCsvData(data); // CSVデータをstateにセット
    //        console.log(data); // コンソールに表示
    //     })
    //     .catch(error => console.error('エラー:', error));
    // }, []);
  
    // フィルタリング関数
    const filterData = () => {
      return data.filter((row) => {
        return (
          //console.log(results.data),
          ((answers.remoteWork === "" || row["リモートワーク"] === answers.remoteWork) )
        );
      });
    };
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    //console.log('API Key :', apiKey)
    //const apiKey = 'APIKEY';
  
  
  
    // APIにPOSTリクエストを送信する関数
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
      try {
        const response = await callChatGPT(userInput); // ChatGPTからの応答
        setResponseOutput(response); // 応答を状態に保存
      } catch (error) {
        console.error('Error:', error);
        setResponseOutput('エラーが発生しました。'); // エラーメッセージを設定
      }
    };
    // フィルタリングされたデータから企業名を抽出
    const filteredCompanyNames = filterData().map((row) => row["企業名"]);


   // デバッグ用: フィルタリング結果をコンソールに出力
   console.log("remotework: ", answers.remoteWork);
   console.log("industry: ", answers.industry);
   console.log("salary: ", answers.salary);
   console.log("newyearholiday: ", answers.newYearHoliday);
   //console.log("Filtered Companies: ", filteredCompanyNames);
    
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
          <h1>あなたにマッチする会社</h1>
          <ul>
            {filteredCompanyNames.length > 0 ? (
              console.log(filteredCompanyNames.length),
              filteredCompanyNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))
            ) : (
              console.log(filteredCompanyNames.length),
              <li>条件に合う会社が見つかりませんでした。</li>
            )}
          </ul>
          {/* 戻るボタン */}
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => navigate("/output")}
            mt={6}
            _hover={{ bg: "teal.400", transform: "scale(1.05)" }}
            transition="all 0.3s ease"
          >
            戻る
          </Button>

          </VStack>
          <VStack spacing={6} align="center">
            <Text fontSize="xl">こんにちわ</Text>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="質問を入力してください"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                size="lg"
                mb={4}
                required
              />
              <Button colorScheme="teal" type="submit">
                送信
              </Button>
            </form>
            <Text fontSize="lg" fontWeight="bold">ChatGPTの応答:</Text>
            <Text>{responseOutput}</Text> {/* APIからの応答を表示 */}
          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
};


export default Filtering;