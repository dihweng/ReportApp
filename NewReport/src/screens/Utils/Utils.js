const Baseurl = 'https://courtofappealreportsnigeria.com/';
import { AsyncStorage } from 'react-native';
const LoginEndpoint = `${Baseurl}api/login`,
  RegisterEndpoint = `${Baseurl}api/users`,
  ProfileEndpoint = `${Baseurl}api/users/me`,
  UpdateProfileEndoint = `${Baseurl}profile`,
  VerificationEndpoint = `${Baseurl}api/users/`,
  CreateInvestment = `${Baseurl}api/investments`,
  UpdateUserEndpoint = `${Baseurl}api/users`,
  getAllReport = `${Baseurl}api/reports`,
  WithdrawInvestment = `${Baseurl}api/investments/`,
  WithdrawReferal = `${Baseurl}api/users/`,
  CreateSupport = `${Baseurl}api/support`,
  AllListofSupport = `${Baseurl}api/users`,
  TicketMessageEndpoint = `${Baseurl}api/support/`,
  GetAllMessageEndPoint = `${Baseurl}api/support`,
  ChangePassword = `${Baseurl}api/users/`,
  ForgotPassword = `${Baseurl}api/users/password/forgot`,
  PlanEndpoint = `${Baseurl}api/plans`,
  AddFavoriteEndPoint = `${Baseurl}api/reports/`,
  AddReadLaterEndPoint = `${Baseurl}api/reports/`,
  GetFavoriteEndpoint = `${Baseurl}api/reports/favorite`,
  GetReadLaterEndpoint = `${Baseurl}api/reports/future`,
  DeleteFavoriteEndpoint = `${Baseurl}api/reports/`,
  DeleteReadLaterEndpoint = `${Baseurl}api/reports/`,
  GetCategoryEndpoint = `${Baseurl}api/categories/`,
  GetDivisionEndpoint = `${Baseurl}api/divisions/`,
  GetAllSubscription = `${Baseurl}api/users/`,
  GetReportEndpoint = `${Baseurl}api/reports/`,
  UserLogoutEndpoint = `${Baseurl}api/logout`;
  
export {
  LoginEndpoint,
  RegisterEndpoint,
  ProfileEndpoint,
  UpdateProfileEndoint,
  VerificationEndpoint,
  CreateInvestment,
  UpdateUserEndpoint,
  getAllReport,
  WithdrawInvestment,
  WithdrawReferal,
  CreateSupport,
  AllListofSupport,
  TicketMessageEndpoint,
  GetAllMessageEndPoint,
  ChangePassword,
  ForgotPassword,
  PlanEndpoint,
  AddFavoriteEndPoint,
  AddReadLaterEndPoint,
  GetFavoriteEndpoint,
  GetReadLaterEndpoint,
  DeleteFavoriteEndpoint,
  DeleteReadLaterEndpoint,
  GetCategoryEndpoint,
  GetDivisionEndpoint,
  GetAllSubscription,
  GetReportEndpoint,
  UserLogoutEndpoint,
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
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
     body : JSON.stringify(body),
    })
    .then((res) => {
      return res;
    })
    .then((res) => {
      return res.json();
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
  body : JSON.stringify(body),
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

export const getRoute = (endpoint) => {
  return fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error
  });
}

export const getRouteToken = (endpoint, token) => {
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
      return error
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

export const saveProfile = async( access_token) => {
  let profile = {
    'access_token' : access_token,
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

export const subscription = async(status) => {
  await AsyncStorage.removeItem('subscription');
  return await AsyncStorage.setItem('subscription', status)
}

export const getSubscription = async()=> {
  return await AsyncStorage.getItem('subscription')
    .then((value) => {
      if (value == 'active') {
        return true
      } else {
        return false;
      }
  });
}

export const getUserDetails = async() => {
  return await AsyncStorage.getItem('details')
    .then((value) => {
      if (value) {
        return JSON.parse(value);
      } else {
        return false;
      }
  });
}

export const updateUserDetails = async(data, token)=> {
  let details = {
    'data' : data,
    'token' : token,
  };

  await AsyncStorage.removeItem('details');
  return await AsyncStorage.setItem('details', JSON.stringify(details))
}