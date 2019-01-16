'use strict'

const store = require('../store.js')

const emptyMessage = () => {
  setTimeout(function () {
    $('.message').text('')
  }, 3000)
}

const signUpSuccess = data => {
  // clears form text and password ellipses on sign up success.
  $('#sign-up').find('input:text, input:password').val('')
  // close modal on sign up success
  $('#signUpModal').modal('hide')
  $('.message').text('signed up successfully')
  $('.message').attr('class', 'message') // removes all classes except the default class of 'message'
  $('.message').addClass('success')
  console.log('signUpSucces ran. Data is:', data)
  emptyMessage()
}

// change 'error =>' to '() =>' to prevent linter error
const signUpFailure = error => {
  $('.message').text('error on sign up')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  console.error('signUpFailure ran. Error is :', error)
  emptyMessage()
}

const signInSuccess = data => {
  // console.log(data.user.token)
  store.user = data.user
  $('#signed-out').hide()
  $('#signed-in').show()
  // clears form text and password ellipses on sign in success.
  $('#sign-in').find('input:text, input:password').val('')
  // $('#email').val('')
  // $('#password').val('')
  // close modal on sign in success
  $('#signInModal').modal('hide')
  $('.message').text('signed in successfully')
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  console.log('signInSuccess ran. Data is:', data)
  emptyMessage()
}

// change 'error =>' to '() =>' to prevent linter error
const signInFailure = () => {
  $('.message').text('error on sign in')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  // console.error('signInFailure ran. Error is :', error)
  emptyMessage()
}

const changePasswordSuccess = data => {
  // console.log('changedPasswordSuccess ran. Data is:', data)
  // console.log below was causing user facing error message, despite 204
  // console.log(data.user.token)
  // clears form text and password ellipses on sign in success.
  $('#change-password').find('input:password').val('')
  // close modal on change password success
  $('#changePasswordModal').modal('hide')
  $('.message').text('changed password successfully')
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  console.log('changedPasswordSuccess ran. Data is:', data)
  emptyMessage()
}

// change 'error =>' to '() =>' to prevent linter error
const changePasswordFailure = error => {
  $('.message').text('error changing password')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  console.error('changedPasswordFailure ran. Error is :', error)
  emptyMessage()
}

const signOutSuccess = data => {
  $('#signed-in').hide()
  $('#signed-out').show()
  $('.message').text('signed out successfully')
  // close modal on sign out success
  $('#signOutModal').modal('hide')
  store.user = {} // or = null
  $('.message').attr('class', 'message')
  $('.message').addClass('success')
  console.log('signOutSuccess ran. Data is:', data)
  emptyMessage()
}

// change 'error =>' to '() =>' to prevent linter error
const signOutFailure = error => {
  $('.message').text('error on sign out')
  $('.message').attr('class', 'message')
  $('.message').addClass('failure')
  console.error('signOutFailure ran. Error is :', error)
  emptyMessage()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
  // createDialogSuccess,
  // createDialogFailure
}
