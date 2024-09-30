import axios from 'axios';

const URL = 'http://localhost:3000';

//Events
export async function getEvents() {
  //"http://localhost:3000/events"
  const response = await axios.get(`${URL}/events`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
export async function getEvent(id) {
  //"http://localhost:3000/events/12345"
  const response = await axios.get(`${URL}/events/${id}`);

  const event = response.data;
  const data = await getImage(event.imageId);
  event.image = data;
  return event;
}
export async function createEvent(event) {
  const data = await createImage(event.file);
  const imageId = event.file.name;

  event.imageId = imageId;

  //"http://localhost:3000/events"
  const response = await axios.post(`${URL}/events`, event);
  return response;
}
export async function updateEvent(id, event) {
  //"http://localhost:3000/events/12345"
  const response = await axios.put(`${URL}/events/${id}`, event);
  return response;
}
export async function deleteEvent(id) {
  //"http://localhost:3000/events/12345"
  const response = await axios.delete(`${URL}/events/${id}`);
  return response;
}

//Products
export async function getProducts() {
  //"http://localhost:3000/products"
  const response = await axios.get(`${URL}/products`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
export async function getProduct(id) {
  //"http://localhost:3000/products/12345"
  const response = await axios.get(`${URL}/products/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
export async function createProduct(product) {
  //"http://localhost:3000/products"
  const response = await axios.post(`${URL}/products`, product);
  return response;
}
export async function updateProduct(id, product) {
  //"http://localhost:3000/products/12345"
  const response = await axios.put(`${URL}/products/${id}`, product);
  return response;
}
export async function deleteProduct(id) {
  //"http://localhost:3000/products/12345"
  const response = await axios.delete(`${URL}/products/${id}`);
  return response;
}

//Users
export async function getUser(id) {
  //"http://localhost:3000/users/12345"
  const response = await axios.get(`${URL}/users/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
export async function createUser(user) {
  //"http://localhost:3000/users"
  const response = await axios.post(`${URL}/users`, user);
  return response;
}
export async function updateUser(id, user) {
  //"http://localhost:3000/users/12345"
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user);

  if (response.data.success) {
    return response.data.token;
  } else {
    return;
  }
}

//Images
export async function createImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${URL}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function getImage(id) {
  const response = await axios.get(`${URL}/images/${id}`);
  return response;
}
