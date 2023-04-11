const sql = require("./db.js");

const Question = function(question){
    this.questionText = question.questionText,
    this.email = question.email
};

Question.createQuestion = (question, result) => {
    console.log("Model: createQuestion: Invoked!");
    sqlQuery = "INSERT INTO question(email, question_text) VALUES(?,?)";

    sql.query(sqlQuery, [question.email, question.questionText], (err, res) => {
        if (err) {
            console.log("Model: Question: createQuestion: Some Error occured: ", err)
            result({ "message": err }, null);
        };
        result(null, { id: res.insertId });
    });
};

Question.postAnswer = (answer, result) => {
    console.log("Model: postAnswer: Invoked!");
    sqlQuery = "INSERT INTO answer(email, answer_text, question_id) VALUES(?,?,?)";

    sql.query(sqlQuery, [answer.email, answer.answerText, answer.questionId], (err, res) => {
        if (err) {
            console.log("Model: Question: postAnswer: Some Error occured: ", err)
            result({ "message": err }, null);
        } else{
            result(null, { id: res.insertId });
        };
    });
};

Question.myQuestions = (email, result) => {
    console.log("Model: myQuestions: Invoked!");
    sqlQuery = "SELECT * from question JOIN answer USING(question_id) where question.email = " + sql.escape(email);
    sql.query(sqlQuery, (err, res) => {
        if (err) {
            console.log("Model: Question: myQuestions: Some Error occured: ", err)
            result({ "message": err }, null);
        } else{
            result(null, res);
        }
    });
};

Question.allQuestions = (result) => {
    console.log("Model: allQuestions: Invoked!");
    sqlQuery = "select question_id, question.email as user_email, question_text, answer_id, answer_text, answer.email as cust_rep_email from question join answer using(question_id);"
    sql.query(sqlQuery, (err, res) => {
        if (err) {
            console.log("Model: Question: allQuestions: Some Error occured: ", err)
            result({ "message": err }, null);
        } else{
            result(null, res);
        }
    });
}










module.exports = Question;
