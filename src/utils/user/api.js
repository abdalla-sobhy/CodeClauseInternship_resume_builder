export async function login(formData) {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      let errorMessage = { message: "Unexpected Error Occurred" };
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.errors || { message: errorData.message } || errorMessage;
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
      }
      throw errorMessage;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export const registerUser = async (data) => {
  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = { message: "Unexpected Error Occurred" };
      try {
        const errorData = await response.json();
        console.log(errorData)
        errorMessage =
          errorData.errors || { message: errorData.message } || errorMessage;
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
      }
      throw errorMessage;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export async function saveTempData(tempData) {
  try {
    const response = await fetch("/api/resume/add-resume", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({data: tempData}),
    });

    if (!response.ok) {
      let errorMessage = { message: "Unexpected Error Occurred" };
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.errors || { message: errorData.message } || errorMessage;
      } catch (jsonError) {
        console.log(jsonError);
      }
      throw errorMessage;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//  the data is sent like this -->  data:{ experience_company, experience_details, experience_position, language_1, language_2, language_3
// language_4, language_5, profile_details, refrence, refrence_email, refrence_number, refrence_position, skill_1, skill_2, skill_3, skill_4
// skill_5, university_name, user_degree, user_email, user_job_title, user_location, user_name, user_number }

export async function getAllTemplates() {
  try {
    const response = await fetch('/api/resume/get-resumes', {
      method : 'GET',
      "Content-Type": "application/json",
    })
    if (!response.ok){
      let errorMessage = { message : 'Unexpected Error Occurred'}
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.errors || { message: errorData.message } || errorMessage;
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
      }
      throw errorMessage;
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
  }
}

export async function getTemplate(id){
  try {
    const response = await fetch(`/api/resume/get-resume/${id}`, {
      method : 'GET',
      "Content-Type": "application/json",
    })
    if(!response.ok){
      let errorMessage = {message : 'Unexpected Error Occurred'}
      try {
        const errorData = await response.json();
        errorMessage = errorData.errors || {message : errorData.message} || errorMessage
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError)
      }
      throw errorMessage;
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
  }
}

export async function deleteResume(id){
  try {
    console.log(id)
    const response = await fetch(`/api/resume/delete-resume/${id}`, {
      method : 'DELETE',
      "content-type": "application/json",
    })
    if(!response.ok){
      let errorMessage = {message : 'Unexpected Error Occurred'}
      try {
        const errorData = await response.json()
        errorMessage = errorData.errors || {message : errorData.message} || errorMessage
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError)
      }
      throw errorMessage
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
  }
}

export async function editResume(form) {
  try {
    const response = await fetch(`/api/resume/edit-resume/${form.resumeId}`, {
      method : 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
    if(!response.ok){
      let errorMessage = {message : 'Unexpected Error Occurred'}
      try {
        const errorData = await response.json()
        errorMessage = errorData.errors || {message : errorData.message} || errorMessage
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError)
      }
      throw errorMessage
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
  }
}