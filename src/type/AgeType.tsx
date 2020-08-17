export default interface results {
  gender: string;
  name: name;
  location: location;
  email: string;
  login: login;
  dob: dob;
  registered: dob;
  phone: string;
  cell: string;
  id: id;
  picture: picture;
  nat: string;
}

interface id {
  name: string;
  value: string;
}

interface dob {
  date: string;
  age: number;
}

interface login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}
interface name {
  title: string;
  first: string;
  last: string;
}

interface location {
  // street: {
  //   number: number;
  //   name: string;
  // };
  street: string;
  city: string;
  state: string;
  postcode: string;
  coordinates?: coordinates;
  timezone?: timezone;
}

interface timezone {
  offset: string;
  description: string;
}

interface coordinates {
  latitude: string;
  longitude: string;
}

interface picture {
  large: string;
  medium: string;
  thumbnail: string;
}
