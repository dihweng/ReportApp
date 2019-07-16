const Baseurl = 'http://seth-env.nbqe8b452a.us-east-1.elasticbeanstalk.com/';
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
const LoginEndpoint = `${Baseurl}oauth/token`,
  RegisterEndpoint = `${Baseurl}api/users`,
  ProfileEndpoint = `${Baseurl}api/users/me`,
  UpdateProfileEndoint = `${Baseurl}profile`,
  VerificationEndpoint = `${Baseurl}api/users/`,
  CreateInvestment = `${Baseurl}api/investments`,
  UpdateBankDetails = `${Baseurl}api/users`,
  AllInvestmentEndpoint = `${Baseurl}api/users/`,
  WithdrawInvestment = `${Baseurl}api/investments/`,
  WithdrawReferal = `${Baseurl}api/users/`,
  CreateSupport = `${Baseurl}api/support`,
  AllListofSupport = `${Baseurl}api/users`,
  TicketMessageEndpoint = `${Baseurl}api/support/`,
  GetAllMessageEndPoint = `${Baseurl}api/support`,
  ChangePassword = `${Baseurl}api/users/`,
  ForgotPassword = `${Baseurl}api/users/password/forgot`;
export {
  LoginEndpoint,
  RegisterEndpoint,
  ProfileEndpoint,
  UpdateProfileEndoint,
  VerificationEndpoint,
  CreateInvestment,
  UpdateBankDetails,
  AllInvestmentEndpoint,
  WithdrawInvestment,
  WithdrawReferal,
  CreateSupport,
  AllListofSupport,
  TicketMessageEndpoint,
  GetAllMessageEndPoint,
  ChangePassword,
  ForgotPassword,
}


export const isEmailValid = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const isPhoneValid = (phone) => {
  if (phone.length == 14) {
    return true;
  } else {
    return false;
  }
}


export const postRoute = (endpoint, body) => {
  console.log({dataggggg: body})
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      return error;
  });
}

export const postWithToken = (endpoint, body, token) => {
  console.log({endpoint : endpoint,
    body : body,
    token : token,
  })
  return fetch(endpoint, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: body
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error;
  });
}
export const postToken = (endpoint, token) => {
  console.log({endpointsssss : endpoint,
    tokensssss : token,
  })
  return fetch(endpoint, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify('')

  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error;
  });
}

export const getRoute = (endpoint, token) => {
  console.log({endpoint: endpoint , token: token});
  return fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return Alert.alert(error.toString())
  });

}

export const putRoute = (endpoint, body, token) => {
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'    
    },
    body: body
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((error) => {
    return error;
  });
}

export const saveProfile = async( access_token, expires, rememberME ) => {
  let profile = {
    'access_token' : access_token,
    'expires' : expires,
    'rememberMe' : rememberME
  };
  return await AsyncStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfile = async() => {
  return await AsyncStorage.getItem('profile')
    .then((value) => {
      if (value) {
        return JSON.parse(value);
      } else {
        return false;
      }
    });
}

export const saveUserDetail = async( data, token,  ) => {
  let details = {
    'data' : data,
    'token' : token,
  };
  return await AsyncStorage.setItem('details', JSON.stringify(details))
}
export const getUserDatials = async() => {
  return await AsyncStorage.getItem('details')
    .then((value) => {
      if (value) {
        return JSON.parse(value);
      } else {
        return false;
      }
  });
}