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
  console.log('got into updateSession in api.js and data is', data)
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

const deleteSession = data => {
  // get id out of data
  const id = data.session.id
  // delete id from data before sending it
  delete data.session.id
  return $.ajax({
    url: config.apiUrl + `/sessions/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {}
  })
}

const getAllSessions = () => {
  return $.ajax({
    url: config.apiUrl + '/sessions',
    method: 'GET',
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
