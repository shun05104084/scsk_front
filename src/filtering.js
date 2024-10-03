import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack, Text, Icon, Flex, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import App from "./App";

const Filtering = () => {
  // 前の画面から渡された状態を取得
  const location = useLocation();
  // 前の画面の情報を代入する 
  const answers = location.state || {};

  const [csvData, setCsvData] = useState('');
  const [data, setData] = useState([]);
  
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
          ((answers.remoteWork === "" || row["リモートワーク"] === answers.remoteWork) && 
            (answers.industry === "" || row["業界"] === answers.industry) &&
            ( answers.place === "" || row["勤務地"] === answers.place) && 
            (answers.salary === "" || row["平均年収"] === answers.salary))

          // (answers.remoteWork === "" || row["リモートワーク"] === answers.remoteWork) &&
          // (answers.industry === "" || row["業界"] === answers.industry) &&
          // (answers.salary === "" || row["平均年収"] === answers.salary)
        );
      });
    };

    // フィルタリングされたデータから企業名を抽出
    const filteredCompanyNames = filterData().map((row) => row["企業名"]);


   // デバッグ用: フィルタリング結果をコンソールに出力
   console.log("Answer: ", answers.remoteWork);
   console.log("Filtered Companies: ", filteredCompanyNames);
    
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
 <p>こんにちわ</p>
 <h3>フィルタリングされた結果:</h3>
      <ul>
        {/* {filterData.map((row, index) => (
          <li key={index}>{row["企業名"]}</li>
        ))} */}
        { filteredCompanyNames.map((name, index) => (
          <li key={index}>{name}</li>
        )) }

      </ul>



          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
};


export default Filtering;
