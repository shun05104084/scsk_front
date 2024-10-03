//csvファイル内の、平均残業時間と年収を数値データへ変換する
 
const convertToNumber = (amount) => {
    if (!amount) {
        // amount が undefined または null の場合、適切に処理
        return 0; // もしくは適切なデフォルト値を返す
    }
    if (amount.includes("万")) {
        return parseFloat(amount.replace('万', '')) * 10000;
    }
    return parseFloat(amount);
};

export const convertSalaryInData = (data) => {
    return data.map(row => {
      return {
        ...row,
        "平均年収": convertToNumber(row["平均年収"]) // '平均年収'カラムを数値に変換
      };
    });
};

const convertToHour = (amount) => {
    if (!amount) {
        // amount が undefined または null の場合、適切に処理
        return 0; // もしくは適切なデフォルト値を返す
      }
    if (amount.includes("時間")) {
        return parseFloat(amount.replace('時間', ''));
    }
    return parseFloat(amount);
    };

export const convertHourInData = (data) => {
    return data.map(row => {
      return {
        ...row,
        "残業時間（月平均）": convertToHour(row["残業時間（月平均）"]) // '残業時間（月平均）'カラムを数値に変換
      };
    });
};