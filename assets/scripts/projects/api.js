'use strict'

const config = require('../config.js')
const store = require('../store.js')

const createProject = data => {
  return $.ajax({
    url: config.apiUrl + '/projects',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const updateProject = data => {
  // get id out of data
  const id = data.project.id
  // delete id from data before sending it
  delete data.project.id

  return $.ajax({
    url: config.apiUrl + `/projects/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const deleteProject = data => {
  // get id out of data
  const id = data.project.id
  // delete id from data before sending it
  delete data.project.id
  return $.ajax({
    url: config.apiUrl + `/projects/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {}
  })
}

const getAllProjects = () => {
  return $.ajax({
    url: config.apiUrl + '/projects',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects
}
