const FETCH_USERS = 'FETCH_USERS'
const UPDATE_USERS = 'UPDATE_USERS'

export function updateUsers (users) {
  return {
    type: UPDATE_USERS,
    users
  }
}

export function fetchUsers (params) {
  return fetch(`https://api.github.com/users?page=${params.pageNo}&per_page=${params.pageSize}`)
    .then(response => {
      return {
        type: FETCH_USERS,
        payload: response.json()
      }
    })
}