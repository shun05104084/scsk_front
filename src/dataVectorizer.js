// データのベクトル化
import Papa from 'papaparse';

// One-Hotエンコーディング
const oneHotEncode = (value, options) => {
    return options.map(option => (option === value ? 1 : 0));
};

// CSVデータから動的なカテゴリリストを生成（One-Hotエンコーディング）
const generateUniqueList = (data, column) => {
    return [...new Set(data.map(row => row[column]))]; // ユニークなカテゴリを抽出
};
  
// ラベルエンコーディング
const labelEncode = (value, labels) => {
    return labels.indexOf(value); // ラベルのインデックスを返す
};

const vectorizeRow = (row, industries, locations) => {
    const remoteOptions = ["あり", "なし"]; // リモートワーク
    const flexOptions = ["あり", "なし"]; // フレックス制度
    const popularityLabels = ["低", "中", "高"]; // 知名度のラベル（低、中、高）

    const industryVector = oneHotEncode(row["業界"], industries);
    const locationVector = oneHotEncode(row["勤務地"], locations);
    const remoteVector = oneHotEncode(row["リモートワーク"], remoteOptions);
    const flexVector = oneHotEncode(row["フレックス制度"], flexOptions);
    const popularityVector = labelEncode(row["知名度"], popularityLabels); // ラベルエンコーディング

    return [...industryVector, ...locationVector, ...remoteVector, ...flexVector, popularityVector];
};

// CSVデータを読み込み、ベクトル化して返す
export const loadAndVectorizeCSV = () => {
    return new Promise((resolve, reject) => {
        fetch("/companies.csv")
        .then(response => response.text())
        .then(csvData => {
          Papa.parse(csvData, {
            header: true,
            complete: (results) => {
              const industries = generateUniqueList(results.data, "業界");
              const locations = generateUniqueList(results.data, "勤務地");
             // ベクトル化を行う
              const vectorizedData = results.data.map(row => ({
                id: row["企業名"], // 一意のID
                values: vectorizeRow(row, industries, locations) // 生成されたリストを使用
            }));
              resolve(vectorizedData); // ベクトル化したデータを返す
            },
            error: (error) => {
              reject(error); // エラー時に処理を中断
            }
          });
        })
        .catch(error => reject(error));
    });
  };

