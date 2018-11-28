// show users the form info for review
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

function SurveyReview({ onCancel, formValues, submitSurvey, history }) {
    // console.log(props.msg);
    const reviewFields = _.map(formFields, field => {
        return (
        <div key={field.name}>
            <label>{field.label}</label>
            <div>{formValues[field.name]}</div>
        </div>);
    }
    );
// with () => the action is waiting until the button is actually clicked, without it, it will fire right away
    return (
        <div>
            <h5>Confirm form entries</h5>            
               {reviewFields}            
            <button className="teal btn-flat white-text" onClick={onCancel}>
                Back
            </button>            
            <button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues, history)}> 
                Send Survey
                <i className="material-icons right">email</i>
            </button>               
        </div>
    )
}

function mapStateToProps(state) {    
    return {
        formValues: state.form.mySurveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));