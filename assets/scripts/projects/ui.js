'use strict'

// const store = require('../store.js')

const showProjectsTemplate = require('../templates/project-listing.handlebars')

const emptyMessage = () => {
  setTimeout(function () {
    $('.message').text('')
  }, 3000)
}

const getProjectsSuccess = (data) => {
  console.log('in UI')
  console.log(data)
  const showProjectsHtml = showProjectsTemplate({ projects: data.projects })
  $('#projects-info').html(showProjectsHtml)
}

const createProjectSuccess = data => {
  // clears modal form fields.
  $('#create-project').trigger('reset')
  // close modal on create project success
  $('#newProjectModal').modal('hide')
  $('.message').text('created project successfully')
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  // console.log('createProjectSuccess ran. Data is:', data)
  emptyMessage()
}

// change 'error =>' to 'function ()' to prevent linter error
const createProjectFailure = function () {
  $('.message').text('error on create project')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  // console.error('createProjectFailure ran. Error is :', error)
  emptyMessage()
}

const updateProjectSuccess = data => {
  $('#update-project').trigger('reset')
  // close modal on update project success
  $('#updateProjectModal').modal('hide')
  $('.message').text('updated project successfully')
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  console.log('updateProjectSuccess ran. Data is:', data)
  emptyMessage()
}

// change 'error =>' to '() =>' to prevent linter error
const updateProjectFailure = function () {
  $('.message').text('error on update project')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  // console.error('updateProjectFailure ran. Error is :', error)
  emptyMessage()
}

const deleteProjectSuccess = data => {
  $('#delete-project').trigger('reset')
  // close modal on delete project success
  $('#deleteProjectModal').modal('hide')
  $('.message').text('delete project successfully')
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  console.log('deleteProjectSuccess ran.')
  emptyMessage()
}

// change 'error =>' to '() =>' to prevent linter error
const deleteProjectFailure = function () {
  $('.message').text('error on delete project')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  // console.error('deleteProjectFailure ran. Error is :', error)
  emptyMessage()
}

module.exports = {
  getProjectsSuccess,
  createProjectSuccess,
  createProjectFailure,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProjectSuccess,
  deleteProjectFailure
}
