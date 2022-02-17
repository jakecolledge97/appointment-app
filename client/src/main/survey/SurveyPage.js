import './survey.css';
import 'survey-react/modern.min.css';
import { StylesManager, Model, Survey } from 'survey-react';
import { useCallback } from 'react';
const surveyJson = {
    elements: [{
        name: "username",
        title: "Enter your Username",
        type: "text"
    }, ]
};

const SurveyPage = () => {
    const survey = new Model(surveyJson);
    const alertResults = useCallback((sender) => {
        const results = JSON.stringify(sender.data);
        alert(results);
    }, []);

    survey.onComplete.add(alertResults);
    return (
        <>
            <Survey model={survey} />

        </>
    );
}

export default SurveyPage;