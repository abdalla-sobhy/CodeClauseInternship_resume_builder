import Template1CSS from '/public/styles/template1.module.css'
import phoneIcon from '/public/assets/phone.png'
import emailIcon from '/public/assets/341245.png'
import locationIcon from '/public/assets/kindpng_6175540.png'
import { useTempData, useDeleteResume, useEditResume } from "/src/hooks/user.js";
import { useForm } from "react-hook-form"
import { userSchema } from '/src/validations/tempValidation.js'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Template1(props) {

    const navigateTo = useNavigate();

    const [form, setForm] = useState({
        experience_company: "",
        experience_details: '',
        experience_position:'',
        language_1:'',
        language_2:'',
        language_3:'',
        language_4:'',
        language_5:'',
        profile_details:'',
        refrence:'',
        refrence_email:'',
        refrence_number:'',
        refrence_position:'',
        skill_1:'',
        skill_2:'',
        skill_3:'',
        skill_4:'',
        skill_5:'',
        templateId:'',
        university_name:'',
        user_degree:'',
        user_email:'',
        user_job_title:'',
        user_location:'',
        user_name:'',
        user_number:'',
        resumeId : ''
    });
    if(props.resumeId){
        React.useEffect(function(){
            setForm(oldData => {
                return{
                    ...oldData,
                    experience_company: props.experience_company,
                    experience_details: props.experience_details,
                    experience_position: props.experience_position,
                    language_1: props.languages[0],
                    language_2: props.languages[1],
                    language_3: props.languages[2],
                    language_4: props.languages[3],
                    language_5: props.languages[4],
                    profile_details: props.profile_details,
                    refrence: props.refrence,
                    refrence_email: props.refrence_email,
                    refrence_number: props.refrence_number,
                    refrence_position: props.refrence_position,
                    skill_1: props.skills[0],
                    skill_2: props.skills[1],
                    skill_3: props.skills[2],
                    skill_4: props.skills[3],
                    skill_5: props.skills[4],
                    university_name: props.university_name,
                    user_degree: props.user_degree,
                    user_email: props.user_email,
                    user_job_title: props.user_job_title,
                    user_location: props.user_location,
                    user_name: props.useername,
                    user_number: props.user_number,
                    templateId : props.id,
                    resumeId : props.resumeId
                }
            })
        },[])
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevValues) => ({
        ...prevValues,
        [name] : value,
        }));
    };
    
    const {register, handleSubmit} = useForm();

    const {
        loading : useTempDataLodaing,
        error : useTempDataErrors,
        handleUseTempData,
    } = useTempData();

    const {
        loading : useDeleteResumeLodaing,
        error : useDeleteResumeErrors,
        handleUseDeleteResume,
    } = useDeleteResume();

    const {
        loading : useEditResumeLodaing,
        error : useEditResumeErrors,
        handleUseEditResume,
    } = useEditResume();
    

    async function onSubmit(data) {
        data['templateId'] = props.id
        try {
            const isValid = await userSchema.validate(data)
            await handleUseTempData(data)
        navigateTo('/HOME')
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelteResume = async (event) => {
        event.preventDefault();
        
        try {
            await handleUseDeleteResume(props.resumeId);
            navigateTo("/home");
        } catch (error) {
            console.error("Delete catch error:", error);  
        }
    }

    const handleEditResume = async (event) => {
        event.preventDefault();
        try {
            await handleUseEditResume(form);
        } catch (error) {
            console.error("Edit catch error:", error);  
        }
    }

    return(
            <div className={Template1CSS.template}>
                <div className={Template1CSS.template_contents}>
                    <form className={Template1CSS.form} onSubmit={handleSubmit(onSubmit)}>

                        <div className={Template1CSS.insideForm}>

                        <div className={Template1CSS.leftBar}>

                            <div className={Template1CSS.section}>
                                <h1>CONTACT</h1> <br /><hr /><br />
                                <div className={Template1CSS.info}>

                                    <div className={Template1CSS.phone}>
                                        <img src={phoneIcon} alt='cant find image'></img>
                                        <input type='text' {...register('user_number')} className={Template1CSS.left_input_field} value={form.user_number} onChange={handleChange} placeholder='+123-456-7890' ></input>
                                    </div>

                                    <div className={Template1CSS.phone}>
                                        <img src={emailIcon} alt='cant find image' className={Template1CSS.emailIcon}></img>
                                        <input type='email' {...register('user_email')} className={Template1CSS.left_input_field} value={form.user_email} onChange={handleChange} placeholder='hello@reallygreatsite.com' ></input>
                                    </div>

                                    <div className={Template1CSS.phone}>
                                        <img src={locationIcon} alt='cant find image' ></img>
                                        <input type='text' {...register('user_location')} className={Template1CSS.left_input_field} value={form.user_location} onChange={handleChange} placeholder='123 Anywhere St., Any City' ></input>
                                    </div>

                                </div>
                            </div>


                            <div className={Template1CSS.section}>
                                <h1>EDUCATION</h1> <br /><hr /><br />
                                <div className={Template1CSS.info}>

                                    <div className={Template1CSS.education}>
                                        <div className={Template1CSS.phone}>
                                            <input type='text' {...register('university_name')} className={Template1CSS.left_input_field_education} value={form.university_name} onChange={handleChange} placeholder='university name' ></input>
                                        </div>

                                        <div className={Template1CSS.phone}>
                                            <input type='text' {...register('user_degree')} className={Template1CSS.left_input_field} value={form.user_degree} onChange={handleChange} placeholder='degree' ></input>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className={Template1CSS.section}>
                                <h1>SKILLS</h1> <br /><hr /><br />
                                <div className={Template1CSS.skills_info}>

                                    <ul>
                                        <li><input type='text' {...register('skill_1')} className={Template1CSS.left_input_field} value={form.skill_1} onChange={handleChange} placeholder='skill 1' ></input></li>
                                        <li><input type='text' {...register('skill_2')} className={Template1CSS.left_input_field} value={form.skill_2} onChange={handleChange} placeholder='skill 2' ></input></li>
                                        <li><input type='text' {...register('skill_3')} className={Template1CSS.left_input_field} value={form.skill_3} onChange={handleChange} placeholder='skill 3' ></input></li>
                                        <li><input type='text' {...register('skill_4')} className={Template1CSS.left_input_field} value={form.skill_4} onChange={handleChange} placeholder='skill 4' ></input></li>
                                        <li><input type='text' {...register('skill_5')} className={Template1CSS.left_input_field} value={form.skill_5} onChange={handleChange} placeholder='skill 5' ></input></li>
                                    </ul>

                                </div>
                            </div>


                            <div className={Template1CSS.section}>
                                <h1>LANGUAGES</h1> <br /><hr /><br />
                                <div className={Template1CSS.skills_info}>

                                    <ul>
                                        <li><input type='text' {...register('language_1')} className={Template1CSS.left_input_field} value={form.language_1} onChange={handleChange} placeholder='language 1' ></input></li>
                                        <li><input type='text' {...register('language_2')} className={Template1CSS.left_input_field} value={form.language_2} onChange={handleChange} placeholder='language 2' ></input></li>
                                        <li><input type='text' {...register('language_3')} className={Template1CSS.left_input_field} value={form.language_3} onChange={handleChange} placeholder='language 3' ></input></li>
                                        <li><input type='text' {...register('language_4')} className={Template1CSS.left_input_field} value={form.language_4} onChange={handleChange} placeholder='language 4' ></input></li>
                                        <li><input type='text' {...register('language_5')} className={Template1CSS.left_input_field} value={form.language_5} onChange={handleChange} placeholder='language 5' ></input></li>
                                    </ul>

                                </div>
                            </div>

                        </div>

                        <div className={Template1CSS.rightPart}>
                            <div className={Template1CSS.rightPart_contents}>


                                <div className={Template1CSS.nameAndJob}>
                                    <input type='text' {...register('user_name')} className={Template1CSS.name_input_field} value={form.user_name} onChange={handleChange} placeholder='Enter your name here' ></input>
                                    <input type='text' {...register('user_job_title')} className={Template1CSS.jobTitle_input_field} value={form.user_job_title} onChange={handleChange} placeholder='Enter your job here' ></input>
                                </div>


                                <div className={Template1CSS.section}>
                                    <h1>PROFILE</h1> <br /><hr /><br />
                                    <div className={Template1CSS.info}>

                                        <textarea {...register('profile_details')} placeholder='enter your profile details here' value={form.profile_details} onChange={handleChange} className={Template1CSS.profile} rows={7} />

                                    </div>
                                </div>


                                <div className={Template1CSS.section}>
                                    <h1>WORK EXPERIENCE</h1> <br /><hr /><br />
                                    <div className={Template1CSS.info}>

                                    <input type='text' {...register('experience_company')} className={Template1CSS.company_input_field} value={form.experience_company} onChange={handleChange} placeholder='Company name' ></input>
                                    <input type='text' {...register('experience_position')} className={Template1CSS.position_input_field} value={form.experience_position} onChange={handleChange} placeholder='your position' ></input>


                                        <textarea {...register('experience_details')} placeholder='details about your work experience' value={form.experience_details} onChange={handleChange} className={Template1CSS.profile} rows={7} />

                                    </div>
                                </div>


                                <div className={Template1CSS.last_right_section}>
                                    <h1>REFERENCE</h1> <br /><hr /><br />
                                    <div className={Template1CSS.info}>

                                    <input type='text' {...register('refrence')} className={Template1CSS.company_input_field} value={form.refrence} onChange={handleChange} placeholder='Estelle Darcy' ></input>
                                    <input type='text' {...register('refrence_position')} className={Template1CSS.position_input_field} value={form.refrence_position} onChange={handleChange} placeholder='Wardiere Inc. / CTO' ></input>

                                    <div className={Template1CSS.refrence_number}>phone : 
                                    <input type='text' {...register('refrence_number')} className={Template1CSS.refrence_number_input_field} value={form.refrence_number} onChange={handleChange} placeholder='123-456-7890' ></input>
                                    </div>

                                    <div className={Template1CSS.refrence_number}>Email : 
                                    <input type='email' {...register('refrence_email')} className={Template1CSS.refrence_number_input_field} value={form.refrence_email} onChange={handleChange} placeholder='hello@reallygreatsite.com' ></input>
                                    </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        </div>

                        { window.location.href.includes('NEW') && <button name="submit" type='submit' className={Template1CSS.submitButton} disabled={useTempDataLodaing} >submit</button>}

                        <div className={Template1CSS.deleteAndEditDiv}>
                            { window.location.href.includes('SHOW') && <button name="delete" type='button' className={Template1CSS.submitButton} disabled={useTempDataLodaing} onClick={handleDelteResume} >delete</button>}
                            { window.location.href.includes('SHOW') && <button name="edit" type='button' className={Template1CSS.submitButton} disabled={useTempDataLodaing} onClick={handleEditResume} >edit</button>}
                        </div>

                    </form> 
                </div>
            </div>
    )

}