'use strict'

// const store = require('../store.js')

const showSessionsTemplate = require('../templates/session-listing.handlebars')

const emptyMessage = () => {
  setTimeout(function () {
    $('.message').text('')
  }, 3000)
}

const getSessionsSuccess = (data) => {
  // console.log('%c The data:', 'font-size: 40px; background: #00ff00; color: #000000')
  // console.log(data)
  const showSessionsHtml = showSessionsTemplate({ sessions: data.sessions })
  $('#sessions-info').html(showSessionsHtml)
}

const createSessionSuccess = data => {
  // console.log('%c The code runs!', 'font-size: 40px; background: #00ff00; color: #000000')
  // clears modal form fields.
  $('#create-session').trigger('reset')
  // close modal on create session success
  $('#newSessionModal').modal('hide')
  $('.message').text('created session successfully')
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  // console.log('createSessionSuccess ran. Data is:', data)
  emptyMessage()
}

// change 'error =>' to 'function' to prevent linter error
const createSessionFailure = function () {
  $('.message').text('error on create project')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  // console.error('createSessionFailure ran. Error is :', error)
  emptyMessage()
}

const updateSessionSuccess = data => {
  $('#update-session').trigger('reset')
  // close modal on update session success
  $('#updateSessionModal').modal('hide')
  $('.message').text('updated session successfully')
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  // console.log('updateSessionSuccess ran. Data is:', data)
  emptyMessage()
}

// change 'error =>' to 'function ()' to prevent linter error
const updateSessionFailure = function () {
  $('.message').text('error on update session')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  // console.error('updateSessionFailure ran. Error is :', error)
  emptyMessage()
}

const deleteSessionSuccess = data => {
  $('#delete-session').trigger('reset')
  // close modal on delete session success
  $('#deleteSessionModal').modal('hide')
  $('.message').text('delete session successfully')
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  // console.log('deleteSessionSuccess ran.')
  emptyMessage()
}

// change 'error =>' to 'function ()' to prevent linter error
const deleteSessionFailure = function () {
  $('.message').text('error on delete session')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  // console.error('deleteSessionFailure ran. Error is :', error)
  emptyMessage()
}

module.exports = {
  getSessionsSuccess,
  createSessionSuccess,
  createSessionFailure,
  updateSessionSuccess,
  updateSessionFailure,
  deleteSessionSuccess,
  deleteSessionFailure
}
