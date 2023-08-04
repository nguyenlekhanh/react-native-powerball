import { get_answer, serverUrl, submit_feedback_url, test_answer_2008 } from "./variables";

async function fetchData(url, data, type="POST") {
  const token = "Bearer " + data?.token?? '';
  
  let options = {
    method: type,
    headers: {
      Authorization: token,
      "Content-type": "application/json"
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // You can handle errors here
    console.error('Error fetching data:', error);
    throw error;
  }
}

const updateAnswer = async (data) => {
  const url = serverUrl + test_answer_2008;

  fetchData(url, data)
    .then((response) => {
      //console.log(response);
      // Process the fetched data here
    })
    .catch((error) => {
      // Handle errors if necessary
    });
}

const getUserScore = async (data) => {
  const url = serverUrl + get_answer;
  let responseData = '';
  return fetchData(url, data);
    // .then((response) => {
    //   //console.log(typeof response);
    //   if(response.result) {
    //     //console.log(response.result);
    //     responseData = response.result;
    //   }
    //   // Process the fetched data here
    // })
    // .catch((error) => {
    //   // Handle errors if necessary
    // });
}

const submitFeedback = (data) => {
  const url = serverUrl + submit_feedback_url;
  let responseData = '';
  return fetchData(url, data);
}

export { 
  updateAnswer, fetchData, getUserScore, submitFeedback
};