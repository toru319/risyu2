// src/pages/EasyCoursesPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EasyCoursesPage = () => {
  const navigate = useNavigate();
  const [easyCourses, setEasyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEasyCourses = async () => {
      try {
        // データ取得のシミュレーション
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // サンプルデータ（修正箇所）
        const mockEasyCourses = [
          {
            id: 1,
            name: "現代社会と法",
            evaluationMethod: "レポート提出のみ",
            description: "基本的な法律の知識を学べる授業。出席とレポート提出だけで単位が取れる。"
          },
          {
            id: 2,
            name: "国際関係論入門",
            evaluationMethod: "出席と小テスト",
            description: "国際関係の基礎を学ぶ授業。小テストは教科書の内容からの出題で比較的簡単。"
          }
        ];

        setEasyCourses(mockEasyCourses);
        setLoading(false);
      } catch  {
        setError('データの取得に失敗しました。');
        setLoading(false);
      }
    };
    
    fetchEasyCourses();
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>← 戻る</BackButton>
        <MainTitle>楽単科目一覧</MainTitle>
      </Header>

      {loading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>{error}</ErrorContainer>
      ) : (
        <CourseList>
          {easyCourses.map(course => (
            <CourseCard key={course.id}>
              <CourseHeader>
                <CourseTitle>{course.name}</CourseTitle>
                <EvaluationMethod>
                  評価方法: {course.evaluationMethod}
                </EvaluationMethod>
              </CourseHeader>
              <CourseDescription>{course.description}</CourseDescription>
            </CourseCard>
          ))}
        </CourseList>
      )}
    </Container>
  );
};

// スタイル定義（修正箇所）
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const MainTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const CourseList = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const CourseCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const CourseTitle = styled.h3`
  color: #003f87;
  font-size: 1.2rem;
  margin: 0;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const EvaluationMethod = styled.span`
  background: #e3f2fd;
  color: #003f87;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }   
`;

const CourseDescription = styled.p`
  color: #444;
  line-height: 1.6;
  margin: 0;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

    @media (max-width: 768px) { 
        padding: 1rem;
    }
`;

const ErrorContainer = styled.div`
  color: #dc3545;
  padding: 1rem;
  text-align: center;
  background: #f8d7da;
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;


export default EasyCoursesPage;