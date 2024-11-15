import { useEffect, useState } from "react";

function QuizTimeout({ timeout, onTimeout }) {
    const [progressValue, setProgressValue] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => clearTimeout(timer);
    }, [onTimeout, timeout])

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressValue(prevState => prevState - 10);
        }, 10);
        return () => clearInterval(interval);
    }, [])

    return <progress className="w-100" value={progressValue} max={timeout} />
}

export default QuizTimeout;