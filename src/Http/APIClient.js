var APIStatus = {
    PROCESSING : 0,
    ERROR : 1,
    SUCCESS : 2
  }
  
  export default function APIClient(method, baseUrl, requestParam, parser) {
      var myInit = {
        method: method,
        cache: 'default'
      };
  
      var myRequest = new Request(baseUrl, myInit);
      return fetch(myRequest)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }  
          return response;
        })
        .then((response) => response.json())
        .then((items) => {
          let data = parser(items);
            return data;
        })
        .catch((error) => {
            return error;
         
        });
  }
  