import axios from "axios";

const API_URL = 'http://localhost:4000/';

export const SendMessageToAI = async (content: string) => {
  try {
    const response = await axios.post(API_URL + "generate-message", { content }); // 요청 본문을 객체 형태로 보냅니다.

    if (!response.data) { // response.data를 확인하여 데이터가 없을 때 오류를 throw합니다.
      throw new Error('No data in response');
    }

    return response.data; // response.data를 반환합니다.
  } catch (error) {
    console.error('Error Sending Message To Chat GPT:', error);
    throw error;
  }
};
