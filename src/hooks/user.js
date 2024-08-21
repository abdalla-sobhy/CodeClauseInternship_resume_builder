import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, login, saveTempData, getAllTemplates, getTemplate, deleteResume, editResume } from "../utils/user/api";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigateTo = useNavigate();

  const handleUseLogin = async (data) => {
    try {
      setLoading(true);
      setError(null);

      await login(data);

      setSuccess(true);
      navigateTo("/home");
    } catch (err) {
      setSuccess(false);

      if (err.username || err.password) {
        setError({ username: err.username, password: err.password });
      } else if (err.message) {
        setError({ message: err.message });
      } else {
        setError({ message: "An unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      console.log("Login was successful");
    }
    if (error) {
      //   console.log("Error occurred during login:", error);
    }
  }, [success, error]);

  return { loading, error, success, handleUseLogin };
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigateTo = useNavigate();

  const handleUseRegister = async (data) => {
    try {
      setLoading(true);
      setError(null);

      await registerUser(data);

      setSuccess(true);
      navigateTo("/home");
    } catch (err) {
      setSuccess(false);

      if (err.username || err.password) {
        setError({ username: err.username, password: err.password });
      } else if (err.message) {
        setError({ message: err.message });
      } else {
        setError({ message: "An unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleUseRegister };
}


export function useTempData(){
  const [loading ,setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleUseTempData = async (tempData) => {
    try {
      setLoading(true)
      setError(null)
      await saveTempData(tempData)
      setSuccess(true)
    } catch (error) {
      setSuccess(false)
      setError({error : error})
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
return { loading, error, success, handleUseTempData}
}

export function useGetAllTemplates(){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const handleUseGetAllTemplates = async () => {
    let resultData
    try {
      setLoading(true)
      setError(null)
      resultData = await getAllTemplates()
      setSuccess(true)
    } catch (error) {
      setSuccess(false)
      setError({error : error})
      console.log(error)
    }finally{
      setLoading(false)
    }
    return {resultData}
  }
  return { loading, error, success, handleUseGetAllTemplates }
}

export function useGetTemplate(){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleUseGetTemplate = async (id) => {
    let resultData
    try {
      setLoading(true)
      setError(null)
      resultData = await getTemplate(id)
      setSuccess(true)
    } catch (error) {
      setSuccess(false)
      setError({error : error})
      console.log(error)
    }finally{
      setLoading(false)
    }
    return {resultData}
  }
  return { loading, error, success, handleUseGetTemplate }
}

export function useDeleteResume(){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleUseDeleteResume = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await deleteResume(id)
      setSuccess(true)
    } catch (error) {
      setSuccess(false)
      setError({error : error})
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return { loading, error, success, handleUseDeleteResume };
}

export function useEditResume(){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleUseEditResume = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await editResume(id)
      setSuccess(true)
    } catch (error) {
      setSuccess(false)
      setError({error : error})
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return { loading, error, success, handleUseEditResume };
}