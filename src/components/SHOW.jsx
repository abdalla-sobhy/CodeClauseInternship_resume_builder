import showcss from '/public/styles/Show.module.css'
import NavBar from "./NavBar.jsx";
import React, { useState } from 'react';
import { useGetTemplate } from "/src/hooks/user.js";
import Template1 from './templates/Template1.jsx'
export default function SHOW() {

    const [TempData, setTempData] = useState();

    const {
        loading : useGetTemplateLodaing,
        error : useGetTemplateErrors,
        handleUseGetTemplate,
    } = useGetTemplate();

    React.useEffect(function(){
        async function getAllTemplates() {
          const resultData = await handleUseGetTemplate(window.location.href.split("id=")[1])
          setTempData(resultData)
        }
        getAllTemplates()
      }, [])

    return(
        <div className={showcss.page}>
            <NavBar />
            
            { TempData && TempData.resultData && <Template1 
            id = {TempData.resultData.templateId}
            useername = {TempData.resultData.user_name}
            experience_company = {TempData.resultData.experience_company}
            experience_details = {TempData.resultData.experience_details}
            experience_position = {TempData.resultData.experience_position}
            languages = {
              [TempData.resultData.language_1,
              TempData.resultData.language_2,
              TempData.resultData.language_3,
              TempData.resultData.language_4,
              TempData.resultData.language_5]
            }
            profile_details = {TempData.resultData.profile_details}
            refrence = {TempData.resultData.refrence}
            refrence_email = {TempData.resultData.refrence_email}
            refrence_number = {TempData.resultData.refrence_number}
            refrence_position = {TempData.resultData.refrence_position}
            skills = {
              [TempData.resultData.skill_1,
              TempData.resultData.skill_2,
              TempData.resultData.skill_3,
              TempData.resultData.skill_4,
              TempData.resultData.skill_5]
            }
            university_name = {TempData.resultData.university_name}
            userId = {TempData.resultData.userId}
            user_degree = {TempData.resultData.user_degree}
            user_email = {TempData.resultData.user_email}
            user_job_title = {TempData.resultData.user_job_title}
            user_location = {TempData.resultData.user_location}
            user_number = {TempData.resultData.user_number}
            __v = {TempData.resultData.__v}
            resumeId = {TempData.resultData._id}
            />}
        </div>
    )
}