import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack, Text, Icon, Flex, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Filtering = () => {
    const [csvData, setCsvData] = useState('');
  
    useEffect(() => {
      // CSVファイルをfetchで取得
      fetch('/companies.csv')
        .then(response => response.text())
        .then(data => {
          setCsvData(data); // CSVデータをstateにセット
          console.log(data); // コンソールに表示
        })
        .catch(error => console.error('エラー:', error));
    }, []);
  

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

 {csvData} /* CSVデータを表示 */

          </VStack>
        </Box>
      </motion.div>
    </Box>
  );
};


export default Filtering;
