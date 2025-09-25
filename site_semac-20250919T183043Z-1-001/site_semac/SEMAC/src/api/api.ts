import axios from "axios";

const cadastro_inscrito = await axios.post('http://localhost/inscrito', {
    firstName: 'Santos',
    lastName: 'Dumont',
    orders: [1, 2, 3],
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)
