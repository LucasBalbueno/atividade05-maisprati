import { useState } from 'react';
import { Container, Title, Question, OptionButton, Score } from './style'
import { questions } from '../../../utils/quizQuestions';

const QuizApp = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ error, setError ] = useState();

  const handleAnswer = (answer) => {
    try {
      if (answer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }

      setCurrentQuestion(currentQuestion + 1);

      if (currentQuestion > questions.length) {
        setError('Não há mais respostas para processar!')
      }
    } catch (error) {
      console.error('Ocorreu um erro no processo:', error);
      setError('Ocorreu um erro ao processar sua resposta!');
    }
  };

  error && alert(error);

  return (
    <Container>
      <Title>Quiz App</Title>
      {currentQuestion < questions.length ? (
        <div>
          <Question>{questions[currentQuestion].question}</Question>
          {questions[currentQuestion].options.map((option) => (
            <OptionButton key={option} onClick={() => handleAnswer(option)}>{option}</OptionButton>
          ))}
        </div>
      ) : (
        <Score>Your score: {score}</Score>
      )}
    </Container>
  );
};

export default QuizApp;