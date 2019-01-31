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

// ORIGINAL DELETE PROJECT
// const deleteProject = data => {
//   // get id out of data
//   const id = data
//   // delete id from data before sending it
//   // delete data.project.id
//   return $.ajax({
//     url: config.apiUrl + `/projects/${id}`,
//     method: 'DELETE',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

// NEW DELETE BOOK FOR HANDLEBARS
const deleteProject = (projectId) => {
  return $.ajax({
    url: config.apiUrl + '/projects/' + projectId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getAllProjects = () => {
  console.log('getting all')
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
