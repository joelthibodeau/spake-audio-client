'use strict'

// const getFormFields = require('../../../lib/get-form-fields.js')
// const addNestedValue = require('../../../lib/add-nested-value.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const sessionsApi = require('../sessions/api.js')
const sessionsUi = require('../sessions/ui.js')
const store = require('../store.js')

store.projectId = null

const onCreateProject = event => {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('onCreateProject ran.')
  api.createProject(data)
  // refreshes user projects
    .then(() => projectSuccess(event))
    .catch(ui.createProjectFailure)
}

// OLD UPDATE PROJECT
// const onUpdateProject = event => {
//   // console.log('got into update-project...about to prevent default')
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   // console.log(data)
//   // console.log('onUpdateProject ran.')
//   // console.log('my project id is ', data.project.id)
//   // console.log('my project id name ', data.project.name)
//   // console.log('my project id description ', data.project.description)
//   api.updateProject(data)
//     .then(function (response) {
//       ui.updateProjectSuccess(response)
//     })
//     .catch(ui.updateProjectFailure)
// }

// const onDeleteProject = event => {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   // const data = $('#delete-input').val()
//   // console.log('delete project')
//   // console.log(data)
//   // take this data and send it to our server
//   // using an HTTP request (POST)
//   // console.log('onDeleteProject ran.')
//   api.deleteProject(data)
//     .then(ui.deleteProjectSuccess) // if your request was succesful
//     .catch(ui.deleteProjectFailure) // if your request failed
// }

// NEW UPDATE SESSION
const onUpdateProject = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const projectId = $(event.target).closest('tr').data('id')
  // console.log(projectId)
  api.updateProject(data)
    .then(() => projectSuccess(event))
    .catch(ui.failure)
}

// refactored onDeleteProject for handlebars
const onDeleteProject = (event) => {
  event.preventDefault()
  const projectId = $(event.target).closest('tr').data('id')
  // console.log(projectId)
  api.deleteProject(projectId)
    .then(() => projectSuccess(event))
    .catch(ui.failure)
}
//
//
// const onGetProjects = event => {
//   event.preventDefault()
//   // console.log('onGetProjects ran.')
//   api.getAllProjects()
//     .then((result) => {
//       document.getElementById('projects-info').innerHTML = ''
//       // console.log(result)
//       // code inspired by tic tac toe
//       // 1. create new div
//       // 2. add id to newly created div
//       // 3. add class to newly created div
//       // 4. make newly created div the child of #projects-info div
//       // 5. add projects result to the newly created div for specific game
//       for (let i = 0; i < result.projects.length; i++) {
//         const elementProjectEntry = document.createElement('div') // 1.
//         elementProjectEntry.setAttribute('id', 'project-entry-' + i) // 2.
//         // elementProjectEntry.setAttribute('class', 'project-entry-element') // 3.
//         document.getElementById('projects-info').appendChild(elementProjectEntry) // 4.
//         // removed result.projects[i].notes from concatenation
//         document.getElementById('project-entry-' + i).innerHTML = 'project ID: ' + result.projects[i].id + ' .' + '.' + '.' + '.' + '.' + '.' + '. ' + result.projects[i].name + ' .' + '.' + '.' + '.' + '. ' + result.projects[i].description// 5.
//       }
//     })
//     // change 'error =>' to '() =>' to prevent linter error
//     .catch(() => {
//       // console.log(error)
//     })
// }

// new function to get Projects for handlebars
const projectSuccess = function (event) {
  event.preventDefault()
  console.log('hi')
  api.getAllProjects()
    .then(ui.getProjectsSuccess)
    .catch(ui.getProjectsFailure)
}

const onOpenProject = function (event) {
  event.preventDefault()
  store.projectId = $(event.target).data('id')
  // console.log(`the project id at open is ${store.projectId}`)
  // console.log('inside onOpenProject', event.target)
  sessionsApi.getAllProjectSessions(store.projectId)
    .then(sessionsUi.getSessionsSuccess)
    .then(() => $('#sessionEntriesModal').modal('show'))
    .catch(sessionsUi.getSessionsFailure)
  // return store.projectId
}

const addProjectHandlers = () => {
  $('#create-project').on('submit', onCreateProject)
  $('#update-project').on('submit', onUpdateProject)
  // $('#delete-project').on('submit', onDeleteProject)
  $('#projects-info').on('click', '.delete-project', onDeleteProject)
  $('#projects-info').on('click', '.open-project-button', onOpenProject)
  $('#entries-button').on('click', projectSuccess)
}

// NEED TO CREATE NEW FUNCTION FOR CREATING NEW AUTH HANDLERS

module.exports = {
  addProjectHandlers,
  projectSuccess,
  onOpenProject
}
