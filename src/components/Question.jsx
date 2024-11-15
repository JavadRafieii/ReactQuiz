import { useMemo, useState } from "react";

import QuizTimeout from "./QuizTimeout"
import QUESTIONS from "../questions";

function Question({ index, onSelectAnswer }) {
    const [selectedAnswer, setSelectedAnswer] = useState({
        isSelected: null,
        answer: null,
    });
    const { question, answers } = QUESTIONS[index];
    const correctAnswer = answers[0];
    const shuffledAnswers = useMemo(() => [...answers].sort(() => Math.random() - 0.5), [index]);
    let timeout = 15000;

    function handleSelectAnswer(selectedAnswer) {
        if (!selectedAnswer) {
            onSelectAnswer(selectedAnswer);
        } else {
            setSelectedAnswer({
                isSelected: "selected",
                answer: selectedAnswer
            });

            setTimeout(() => {
                if (selectedAnswer === correctAnswer) {
                    setSelectedAnswer({
                        isSelected: "correct",
                        answer: selectedAnswer
                    });
                } else {
                    setSelectedAnswer({
                        isSelected: "wrong",
                        answer: selectedAnswer
                    });
                }
            }, 1000);

            setTimeout(() => {
                onSelectAnswer(selectedAnswer);
                setSelectedAnswer({
                    isSelected: null,
                    answer: null,
                });
            }, 2000);
        }
    }

    if (selectedAnswer.isSelected) {
        timeout = 2000;
    }

    return (
        <div className="w-50 mx-auto border p-4">
            <QuizTimeout
                key={timeout}
                timeout={timeout}
                onTimeout={() => !selectedAnswer.isSelected ? handleSelectAnswer(null) : null}
            />
            <h5 className="h5 text-center my-4">{question}</h5>
            <ul className="list-group">
                {shuffledAnswers.map((answer, index) => {
                    let buttonClasses = "w-100 p-2 border-0";
                    if (selectedAnswer.answer === answer) {
                        buttonClasses +=
                            (selectedAnswer.isSelected === "selected"
                                ? " bg-warning"
                                : selectedAnswer.isSelected === "correct"
                                    ? " bg-success"
                                    : " bg-danger");
                    }
                    return (
                        <li key={index} className="list-group-item p-0">
                            <button
                                onClick={() => handleSelectAnswer(answer)}
                                className={buttonClasses}
                                disabled={selectedAnswer.isSelected}
                            >
                                {answer}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Question;