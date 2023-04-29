const Question = require('../models/questions.model.js');


exports.createQuestion = (req, res) => {
    console.log("Controller: Question: createQuestion: Invoked!");
    const question = new Question({
        email: req.session.user,
        questionText: req.body.question
    })
    Question.createQuestion(question, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Question: createQuestion: Error occured in creating question."
            });
        }

        else {
            console.log("Controller: Question: createQuestion: Question posted Successfully!");
            req.session.alertData = {"message": "Question posted successfully", "alertType": "success"};
            res.redirect('/home');
        }
    });
}

exports.postAnswer = (req, res) => {
    console.log("Controller: Question: postAnswer: Invoked!");
    const answer = {
        email: "custRep1@buyme.com",
        answerText: req.body.answer,
        questionId: req.params.questionId
    }
    Question.postAnswer(answer, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Controller: Question: postAnswer: Error occured in posting answer."
            });
        }

        else {
            console.log("Controller: Question:  postAnswer: Answer posted Successfully!");
            req.session.alertData = {"message": "Posted answer!", "alertType": "success"};
			res.redirect("/custRepHome");
        }
    });
}

exports.myQuestions = (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    }
    else{
        Question.myQuestions(req.session.user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Controller: Questions: myQuestions: Some error occured"
                });
            else{
                console.log("Controller: Questions: myQuestions: Fetched My Questions");
                questionIds = new Set();
                answers = {};
                questions = [];
                for (let i = 0; i < data.length; i++) {
                    if(data[i].answer_text == null){
                        answers[data[i].question_id] = []
                    }
                    else{
                        if (data[i].question_id in answers) {
                            answers[data[i].question_id].push(data[i].answer_text);
                        } else {
                            answers[data[i].question_id] = [data[i].answer_text];
                        };
                    };
                };

                for (let i = 0; i < data.length; i++) {
                    if (questionIds.has(data[i].question_id)) {
                        continue
                    } else {
                        questions.push({
                            "questionId": data[i].question_id,
                            "questionText": data[i].question_text,
                            "answers": answers[data[i].question_id]
                        });
        
                        questionIds.add(data[i].question_id);
                    };
                };
                res.render('pages/helpRequest', { "status": 200, "data": {"questions": questions, "user": req.session.user}});
            };
        });
    };
};

exports.allQuestions = (req, res) => {
    if (req.session.loggedIn != true){
        res.redirect("/");
    }
    else{
        Question.allQuestions((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Controller: Questions: allQuestions: Some error occured"
                });
            else{
                console.log("Controller: Questions: allQuestions: Fetched All Questions");
                questionIds = new Set();
                answers = {};
                questions = [];
                for (let i = 0; i < data.length; i++) {
                    if(data[i].answer_text == null){
                        answers[data[i].question_id] = []
                    }
                    else{
                        if (data[i].question_id in answers) {
                            answers[data[i].question_id].push(data[i].answer_text);
                        } else {
                            answers[data[i].question_id] = [data[i].answer_text];
                        };
                    };
                };

                for (let i = 0; i < data.length; i++) {
                    if (questionIds.has(data[i].question_id)) {
                        continue
                    } else {
                        questions.push({
                            "questionId": data[i].question_id,
                            "questionText": data[i].question_text,
                            "answers": answers[data[i].question_id]
                        });
        
                        questionIds.add(data[i].question_id);
                    };
                };
                if (req.session.alertData){
                    allData = {"user": req.session.user, "questions": questions, data: {"user": req.session.user, "alertData": req.session.alertData}};
                    delete req.session.alertData;
                }else{
                    allData = {"user": req.session.user, "questions": questions};
                };
                
                res.render('pages/customerRepInbox', allData);
            };
        });
    };
};
