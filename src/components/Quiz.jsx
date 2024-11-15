import { useCallback, useState } from "react";

import Question from "./Question";
import Answers from "./Answers";

function Quiz() {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const currentIndexQuestion = selectedAnswers.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setSelectedAnswers(prevSelectedAnswers => [...prevSelectedAnswers, selectedAnswer]);
    }, []);

    if (selectedAnswers.length - 1 === 3) {
        return <Answers userAnswers={selectedAnswers} />
    }

    return (
        <Question
            key={currentIndexQuestion}
            index={currentIndexQuestion}
            onSelectAnswer={handleSelectAnswer}
        />
    );
}

export default Quiz;