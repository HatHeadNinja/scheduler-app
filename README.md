# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Requirements
[x] Interviews can be booked between Monday and Friday.  
[x] A user can switch between weekdays.  
[x] A user can book an interview in an empty appointment slot.  
[x] Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.  
[x] A user can cancel an existing interview.  
[x] A user can edit the details of an existing interview.  
[x] The list of days informs the user how many slots are available for each day.  
[x] The expected day updates the number of spots available when an interview is booked or canceled.  
[x] A user is presented with a confirmation when they attempt to cancel an interview.  
[x] A user is shown an error if an interview cannot be saved or deleted.  
[x] A user is shown a status indicator while asynchronous operations are in progress.  
[x] When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).  
[x] The application makes API requests to load and persist data. We do not lose data after a browser refresh.  

## Day List View
![Day list view](https://github.com/HatHeadNinja/scheduler-app/blob/master/docs/day-list-example.png)

## Create / Edit View
![Create/edit an interview](https://github.com/HatHeadNinja/scheduler-app/blob/master/docs/create-edit-example.png?raw=true)

## Cancel Interview Confirmation Example
![Cancel interview confirmation](https://github.com/HatHeadNinja/scheduler-app/blob/master/docs/cancel-meeting-confirmation-example.png?raw=true)