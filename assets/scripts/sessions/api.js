'use strict'

const config = require('../config.js')
const store = require('../store.js')

const createSession = data => {
  return $.ajax({
    url: config.apiUrl + '/sessions',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const updateSession = data => {
  // get id out of data
  // console.log('got into updateSession in api.js and data is', data)
  const id = data.session.id
  // delete id from data before sending it
  delete data.session.id

  return $.ajax({
    url: config.apiUrl + `/sessions/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

// ORIGINAL DELETE SESSION
// const deleteSession = data => {
//   // get id out of data
//   const id = data.session.id
//   // delete id from data before sending it
//   delete data.session.id
//   return $.ajax({
//     url: config.apiUrl + `/sessions/${id}`,
//     method: 'DELETE',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     },
//     data: {}
//   })
// }

// NEW DELETE Session FOR HANDLEBARS
const deleteSession = (sessionId) => {
  return $.ajax({
    url: config.apiUrl + '/sessions/' + sessionId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getAllSessions = (projectId) => {
  console.log('inside getAllSessions projectId is', projectId)
  return $.ajax({
    url: config.apiUrl + '/sessions',
    method: 'GET',
    data: { project_id: projectId },
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createSession,
  updateSession,
  deleteSession,
  getAllSessions
}
