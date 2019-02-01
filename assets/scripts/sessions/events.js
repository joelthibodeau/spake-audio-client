'use strict'

// const getFormFields = require('../../../lib/get-form-fields.js')
// const addNestedValue = require('../../../lib/add-nested-value.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onCreateSession = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('onCreateSession ran.')
  api.createSession(data)
    .then(ui.createSessionSuccess)
    .catch(ui.createSessionFailure)
}

const onUpdateSession = event => {
  // console.log('got into update-session...about to prevent default')
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log(data)
  // console.log('onUpdateSession ran.')
  // console.log('my session id is ', data.session.id)
  // console.log('my session date ', data.session.date)
  // console.log('my session hours worked ', data.session.hours_worked)
  // console.log('my session id hours recorded ', data.session.hours_recorded)
  // console.log('my session notes ', data.session.notes)
  api.updateSession(data)
    .then(function (response) {
      ui.updateSessionSuccess(response)
    })
    .catch(ui.updateSessionFailure)
}

// ORIGINAL onDeleteSession
// const onDeleteSession = event => {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   // const data = $('#delete-input').val()
//   // console.log('delete session')
//   // console.log(data)
//   // take this data and send it to our server
//   // using an HTTP request (POST)
//   // console.log('onDeleteSession ran.')
//   api.deleteSession(data)
//     .then(ui.deleteSessionSuccess) // if your request was succesful
//     .catch(ui.deleteSessionFailure) // if your request failed
// }

// refactored onDeleteSession for handlebars
const onDeleteSession = (event) => {
  event.preventDefault()
  const sessionId = $(event.target).closest('tr').data('id')
  console.log(sessionId)
  api.deleteSession(sessionId)
    .then(() => sessionSuccess(event))
    .catch(ui.failure)
}

// ORIGINAL GET ACTION
// const onGetSessions = event => {
//   event.preventDefault()
//   // console.log('onGetSessions ran.')
//   api.getAllSessions()
//     .then((result) => {
//       document.getElementById('sessions-info').innerHTML = ''
//       // console.log(result)
//       // code inspired by tic tac toe
//       // 1. create new div
//       // 2. add id to newly created div
//       // 3. add class to newly created div
//       // 4. make newly created div the child of #sessions-info div
//       // 5. add projects result to the newly created div for specific game
//       for (let i = 0; i < result.sessions.length; i++) {
//         const elementSessionEntry = document.createElement('div') // 1.
//         elementSessionEntry.setAttribute('id', 'session-entry-' + i) // 2.
//         // elementSessionEntry.setAttribute('class', 'session-entry-element') // 3.
//         document.getElementById('sessions-info').appendChild(elementSessionEntry) // 4.
//         // removed result.sessions[i].notes from concatenation
//         document.getElementById('session-entry-' + i).innerHTML = 'session ID: ' + result.sessions[i].id + ' .' + '.' + '.' + '.' + '.' + '.' + '. ' + 'project ID: ' + result.sessions[i].project_id + ' .' + '.' + '.' + '.' + '.' + '.' + '. ' + result.sessions[i].date + ' .' + '.' + '.' + '.' + '. ' + 'hrs worked: ' + result.sessions[i].hours_worked_readable + ' .' + '.' + '.' + '.' + '. ' + 'hrs recorded: ' + result.sessions[i].hours_recorded_readable + ' .' + '.' + '.' + '.' + '. ' + result.sessions[i].notes// 5.
//       }
//     })
//     // change 'error =>' to '() =>' to prevent linter error
//     .catch(() => {
//       // console.log(error)
//     })
// }

// new function to get Sessions for handlebars
const sessionSuccess = function (event) {
  event.preventDefault()
  console.log('hi')
  api.getAllSessions()
    .then(ui.getSessionsSuccess)
    .catch(ui.getSessionsFailure)
}

const addSessionHandlers = () => {
  $('#create-session').on('submit', onCreateSession)
  $('#update-session').on('submit', onUpdateSession)
  // $('#delete-session').on('submit', onDeleteSession)
  // for ORIGINAL GET SESSIONS
  // $('#session-entries-button').on('click', onGetSessions)
  $('#sessions-info').on('click', '.delete-session', onDeleteSession)
  $('#entries-button').on('click', sessionSuccess)
  // $('#projects-info').on('click', '.open-project-button', sessionSuccess)
}

// NEED TO CREATE NEW FUNCTION FOR CREATING NEW AUTH HANDLERS

module.exports = {
  addSessionHandlers
}
