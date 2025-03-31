// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>IVUSA履修登録サポート（神大）</Title>
      <ButtonContainer>
        <Button onClick={() => navigate('/selection')}>
          学年・学部から探す
        </Button>
        <Button onClick={() => navigate('/easy-courses')}>
          楽単を探す
        </Button>
      </ButtonContainer>
    </Container>
  );
};

// スタイル定義
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  color: #003f87; /* 神奈川大学のブルー */
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const Button = styled.button`
  background-color: #003f87;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #002a5c;
  }
`;

export default HomePage;