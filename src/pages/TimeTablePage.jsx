// src/pages/TimeTablePage.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { timetables } from '../data/timetables';

const TimeTablePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { grade, faculty, department } = location.state || {};
  
  const [timetable, setTimetable] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const periods = [1, 2, 3, 4, 5, 6, 7];
  const days = ['月', '火', '水', '木', '金', '土'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // データキーを生成
        const dataKey = `${faculty}-${department}-${grade}`;
        
        // 該当データ取得（実際はAPI呼び出しに置き換える）
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const selectedData = timetables[dataKey] || timetables.default;

        setTimetable(selectedData.timetable);
        setComments(selectedData.comments);
        
      } catch {
        setError('データの取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    if (!grade || !faculty || !department) {
      navigate('/selection');
      return;
    }
    
    fetchData();
  }, [grade, faculty, department, navigate]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/selection')}>← 戻る</BackButton>
        <Title>{grade}年 {faculty} {department} の時間割例</Title>
      </Header>
      
      <TimeTableContainer>
        <Table>
          <thead>
            <tr>
              <Th></Th>
              {days.map(day => (
                <Th key={day}>{day}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map(period => (
              <tr key={period}>
                <Th>{period}</Th>
                {days.map((day, index) => (
                  <Td key={`${period}-${day}`}>
                    {timetable[period-1][index]?.name || ""}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TimeTableContainer>
      
      <CommentsSection>
        <SectionTitle>先輩からのコメント</SectionTitle>
        {comments.length > 0 ? (
          <CommentsList>
            {comments.map((comment, index) => (
              <CommentItem key={index}>
                <CommentAuthor>{comment.author}:</CommentAuthor>
                <CommentText>{comment.text}</CommentText>
              </CommentItem>
            ))}
          </CommentsList>
        ) : (
          <NoComments>コメントはまだありません</NoComments>
        )}
      </CommentsSection>
    </Container>
  );
};

// スタイル定義
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
    @media (max-width: 480px) {
        padding: 0.5rem;
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
    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
    @media (max-width: 480px) {
        font-size: 1.3rem;
    }
`;

const TimeTableContainer = styled.div`
  margin: 2rem 0;
  overflow-x: auto;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
    @media (max-width: 480px) {
        margin: 0.5rem 0;
    }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const Th = styled.th`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  text-align: center;
  min-width: 80px;
  border: 1px solid #ddd;

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
    @media (max-width: 480px) {
        padding: 0.3rem;
        font-size: 0.8rem;
    }
`;

const Td = styled.td`
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: top;
  min-width: 120px;
  height: 60px;
  background: white;

  &:hover {
    background: #f8f9fa;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const CommentsSection = styled.section`
  margin-top: 3rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const CommentsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const CommentItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  color: #003f87;
  margin-right: 0.5rem;
`;

const CommentText = styled.span`
  color: #444;
`;

const NoComments = styled.div`
  text-align: center;
  color: #666;
  padding: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorContainer = styled.div`
  color: #dc3545;
  text-align: center;
  padding: 2rem;
`;

export default TimeTablePage;