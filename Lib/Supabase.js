"use server"

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const isSurveyInProgress = async (email) => {
  const { data, error } = await supabase
    .from('temporary_questionnaire')
    .select()
    .eq("email", email)

  if (error || !data || data.length === 0) {
    return { data: null, result: false }
  }
  return { data: data[0], result: true }
}

export async function startSurvey(email) {
  try {
    const { data, error } = await supabase
      .from('temporary_questionnaire')
      .select()
      .eq("email", email)

    if (!error && data && data.length > 0) {
      if (data[0].status === "completed") {
        return ({ status: 409, message: "Survey already completed" })
      }
      return ({ status: 202, step1: data[0]?.progress?.step1, step2: data[0]?.progress?.step2 });
    }
    else {
      const { error } = await supabase
        .from('temporary_questionnaire')
        .insert({
          email: email,
          progress: {},
          status: "in-progress"
        })
      if (error) throw error
      return ({ status: 201, message: "starting new survey" })
    }

  } catch (e) {
    return ({ status: 500, message: "Error Occured" })
  }

}

export async function choice(email, shoes) {
  try {

    const { data, result } = await isSurveyInProgress(email)
    if (!result) {
      return ({ status: 404, message: "survey not started" })
    }
    else {
      const updatedData = { ...data.progress,step1: shoes  }
      const { error } = await supabase
        .from('temporary_questionnaire')
        .update({
          progress: updatedData
        })
        .eq('email', email)
      if (error) throw error
      return ({ status: 200, message: "saved the choice" })
    }

  } catch (e) {
    return ({ status: 500, message: "Error Occured" })
  }
}

export async function score(email, comfort, looks, price) {
  try {

    const { data, result } = await isSurveyInProgress(email)
    if (!result) {
      return ({ status: 404, message: "survey not started" })
    }
    else {
      if (!data?.progress?.step1) {
        return ({ status: 400, message: "step 1 is not completed" })
      }
      const updatedData = { ...data.progress,step2: { comfort, looks, price } }
      console.log({updatedData})
      const { error } = await supabase
        .from('temporary_questionnaire')
        .update({
          progress: updatedData,
          status: "completed"
        })
        .eq('email', email)
      if (error) throw error
      return ({ status: 200, message: "Scores Saved" })
    }

  } catch (e) {
    return ({ status: 500, message: "Error Occured" })
  }
}



