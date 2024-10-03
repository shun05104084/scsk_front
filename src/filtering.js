import React, { useState } from 'react';
import { Box, Button, VStack, Input, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import dotenv from 'dotenv';
dotenv.config();

const Filtering = () => {
  const [userInput, setUserInput] = useState('');
  const [responseOutput, setResponseOutput] = useState(''); // APIからの応答を保存する状態

  // キー設定
  //const apiKey = process.env.REACT_APP_API_KEY;
  const apiKey = 'APIKEY';



  // APIにPOSTリクエストを送信する関数
  const callChatGPT = async (prompt) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",  // 使用するモデル名
        messages: [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": prompt}
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  };

  // フォームが送信されたときの処理
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
