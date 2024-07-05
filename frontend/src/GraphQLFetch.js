const IssueDateRegx = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
function jsonDataReviver(key, value) {
  if (IssueDateRegx.test(value)) return new Date(value);
  return value;
}

export const graphQLFetch = async (query, variables = {}) => {
    try {
      const response = await fetch(window.ENV.URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDataReviver);
      if (result.error) {
        const error = result.errors[0];
        console.log(error.extensions.code);
        if (error.extensions.code == "BAD_USER_INPUT") {
          const details = error.extensions.exception.errors.join("\n");
          alert(`${error.message} \n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      } 
        return result.data;
      
    } catch (error) {
      alert(`Error in sending data :${error.message}`);
    }
  };
  