import Axios from 'axios'

const RESOURCE_NAME = '/books'

export default {
  getAll () {
    return Axios.get(RESOURCE_NAME)
  },

  get (id) { return Axios.get(`${RESOURCE_NAME}/${id}`) },
  create (data) { return Axios.post(RESOURCE_NAME, data) }
}
