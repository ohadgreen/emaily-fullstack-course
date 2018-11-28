// shows survery form and survery view components
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyReview from './SurveyFormReview';
import SurveyForm from './SurveyForm';

class SurveyNew extends Component {
    /* constructor(props) {
        super(props);
        this.state = { showFormReview: false}
    } */
    // with create-react-app we can use equivalent:
    state = { showFormReview: false };

    renderContent() {
        return ((this.state.showFormReview) ? 
            <SurveyReview 
                msg="surveyNew"
                onCancel={() => this.setState({ showFormReview: false })}
            /> : 
            <SurveyForm 
                onSurveySubmit={() => this.setState({ showFormReview: true })}
                />)
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'mySurveyForm' // going to update state in redux store and clean the form values if they were filled
}
) (SurveyNew);