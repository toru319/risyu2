// src/pages/SelectionPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { faculties } from '../data/faculties';

const SelectionPage = () => {
  const navigate = useNavigate();
  const [grade, setGrade] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  const grades = [1, 2, 3, 4];
  const selectedFaculty = faculties.find(f => f.name === faculty);

  const handleSubmit = () => {
    if (!grade || !faculty || !department) {
      setError('すべての項目を選択してください');
      return;
    }
    navigate('/timetable', { 
      state: { grade, faculty, department } 
    });
  };

  return (
    <Container>
      <Title>学年・学部の選択</Title>
      <SelectionContainer>
        <SelectionGroup>
          <Label>学年</Label>
          <Select 
            value={grade} 
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">選択してください</option>
            {grades.map(g => (
              <option key={g} value={g}>{g}年</option>
            ))}
          </Select>
        </SelectionGroup>

        <SelectionGroup>
          <Label>学部</Label>
          <Select 
            value={faculty} 
            onChange={(e) => {
              setFaculty(e.target.value);
              setDepartment('');
            }}
          >
            <option value="">選択してください</option>
            {faculties.map(f => (
              <option key={f.id} value={f.name}>{f.name}</option>
            ))}
          </Select>
        </SelectionGroup>

        <SelectionGroup>
          <Label>学科</Label>
          <Select 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
            disabled={!faculty}
          >
            <option value="">選択してください</option>
            {selectedFaculty?.departments.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </Select>
        </SelectionGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonContainer>
          <BackButton onClick={() => navigate('/')}>戻る</BackButton>
          <SubmitButton onClick={handleSubmit}>決定</SubmitButton>
        </ButtonContainer>
      </SelectionContainer>
    </Container>
  );
};

// スタイル定義
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SelectionContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SelectionGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  appearance: none;
  background: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003f87'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e") no-repeat right 0.8rem center/12px auto;
  background-color: white;

  &:disabled {
    background-color: #f5f5f5;
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin: 1rem 0;
  padding: 0.5rem;
  background: #f8d7da;
  border-radius: 4px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
`;

const ButtonBase = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const BackButton = styled(ButtonBase)`
  background: #f0f0f0;
  color: #666;

  &:hover {
    background: #e0e0e0;
  }
`;

const SubmitButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background: #002a5c;
  }
`;

export default SelectionPage;