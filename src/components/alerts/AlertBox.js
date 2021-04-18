import React, { useState } from 'react';
import { Alert, Spinner} from 'reactstrap';
import * as alertMessage from './AlertMessages';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from './ProgressProvider';
function AlertBox(props){
  	const percentage = 0;
	const onDismiss = () => props.closeAlert();
	const parseColor=()=>{
		switch (props.type) {
	        case alertMessage.SUCCESS:
	           return "success";
	        case alertMessage.ERROR:
	            return "danger";
	        case alertMessage.INFO:
	            return "info";
	        case alertMessage.WARNING:
	            return "warning";
	        default: return "info";
	      }
	}

	return (
        <Alert color={parseColor()} isOpen={props.showAlert} toggle={onDismiss} >
           <ProgressProvider values={[0, 20, 40, 60, 80, 100]}>
		        {percentage => (
		          <CircularProgressbar
		            value={percentage}
		            styles={buildStyles({
		              pathTransitionDuration: 0.15
		            })}
		          />
		        )}
		     </ProgressProvider>
	      <strong>{props.message}</strong> 
	    </Alert>
    );

}

export default AlertBox;