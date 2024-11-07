const mongoose = require('mongoose')
const { Schema } = mongoose;

const SecondQuestionSchema = new Schema({
    comfort:{ type:Number,require:true},
    looks:{ type:Number,require:true},
    price:{ type:Number,require:true}
})

const QuestionnaireSchema = new Schema({

  email:{
    type:String,
    require:true,
    unique: true
  },
  firstQuestion:{
    type:String,
    require:true
  },
  secondQuestion: SecondQuestionSchema
});
const Questionnaire = mongoose.model('questionnaire', QuestionnaireSchema)
module.exports = Questionnaire