import axios from 'axios';

const API_URL = 'http://localhost:3900/api';

// auth.service.ts
export const signIn = async (email: string, password: string) => {
  try {
    console.log(`email: ${email} password: ${password}`);
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    console.log(`response data: ${JSON.stringify(response.data)}`);
    return response.data; // 이 부분에서 응답 데이터를 반환합니다.
  } catch (error) {
    console.error('로그인 중 에러 발생:', error);
    throw error;
  }
};

export const signUp = async (username: string, email: string, password: string, gender: string, birthDate: string) => {
  try {
    const gender = "Male";
    const birthDate = '1';
    const response = await axios.post(`${API_URL}/user/register`, { username, email, password, gender, birthDate});
    return response.data;
  } catch (error) {
    console.error('가입 중 에러 발생:', error);
    throw error;
  }
};
