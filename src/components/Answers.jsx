import QUESTIONS from "../questions";

function Answers({ userAnswers }) {

    const totalQuestions = QUESTIONS.length;
    const correctAnswersCount = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]).length;
    const incorrectAnswersCount = userAnswers.filter((answer, index) => answer !== QUESTIONS[index].answers[0] && answer !== null).length;
    const skippedAnswersCount = userAnswers.filter(answer => answer === null).length;

    const correctPercentage = ((correctAnswersCount / totalQuestions) * 100).toFixed(2);
    const incorrectPercentage = ((incorrectAnswersCount / totalQuestions) * 100).toFixed(2);

    return (
        <div className="w-50 mx-auto border p-4">
            <h4>Answer Summary</h4>
            <p>Correct Answers: {correctAnswersCount} ({correctPercentage}%)</p>
            <p>Incorrect Answers: {incorrectAnswersCount} ({incorrectPercentage}%)</p>
            <p>Skipped Questions: {skippedAnswersCount}</p>
            <ul>
                {userAnswers.map((answer, index) => {
                    let cssClasses;
                    if (answer === QUESTIONS[index].answers[0]) {
                        cssClasses += " text-success";
                    } else {
                        cssClasses += " text-danger";
                    }
                    return (
                        <li key={index}>
                            <h5 className="h5 my-4">{QUESTIONS[index].question}</h5>
                            <p className="m-0">Your answer:
                                <span className={cssClasses}> {answer === null ? "Skipped" : answer}</span>
                            </p>
                            {!(answer === QUESTIONS[index].answers[0])
                                && (
                                    <p>Correct answer:
                                        <span className="text-info m-0"> {QUESTIONS[index].answers[0]}</span>
                                    </p>)
                            }
                        </li>
                    );
                })}

            </ul>
        </div>
    );
}

export default Answers;