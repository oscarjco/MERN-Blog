export const useAjax = async (url, method = "GET", requestBody = {}, files = false) => {
  let options = { method: method };

  switch (method) {
    case "GET":
    case "DELETE":
      break;
    case "POST":
    case "PUT":
      options = files ? {
        ...options,
        body: requestBody
      } : {
        ...options,
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
      break;

    default:
      console.log(`Unsupported operation: ${method}`);
      break;
  }

  const response = await fetch(url, options);
  const {status, message, data} = await response.json();

  return {
    status, message, data
  };
};
